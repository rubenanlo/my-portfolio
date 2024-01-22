import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { Container } from "components/Container";
import { Button } from "components/Button";
import Loading from "components/modals/Loading";
import { getText, getUniqueSlugs } from "helpers/getTextForSlug";
import { useRouter } from "next/router";
import { useState } from "react";

const Posts = ({ content }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // ? router.back failed because of scroll issues before navigating to the previous page. Thus, the following approach was taken.
  const handleBack = () => {
    setIsLoading(true);
    router.back();
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Container className="my-24 mx-auto z-10">
      <Button
        variant="primary"
        onClick={handleBack}
        className="mb-10 mx-5 cursor-pointer w-fit"
      >
        Back
      </Button>
      <Container className="prose prose-md prose-slate dark:prose-invert mx-auto max-w-xs lg:max-w-3xl xl:max-w-4xl px-5">
        <MDXRemote {...content} />
      </Container>
    </Container>
  );
};

export default Posts;

export const getStaticPaths = async () => {
  let paths = [];
  try {
    const slugs = getUniqueSlugs();
    paths = slugs.map((item) => {
      const slug = typeof item === "object" && item !== null ? item.slug : item;
      return { params: { slug } };
    });
  } catch (error) {
    console.error("Error generating static paths:", error);
  }
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const textResult = getText(params.slug);
  const [{ data: post, content }] = textResult;
  const mdxSource = await serialize(content);
  return {
    props: {
      slug: params.slug,
      post,
      content: mdxSource,
    },
  };
};
