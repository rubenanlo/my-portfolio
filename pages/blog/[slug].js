import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { Container } from "components/Container";
import { getText, getUniqueSlugs } from "helpers/getTextForSlug";

const Posts = ({ content }) => (
  <Container className="prose prose-md prose-slate dark:prose-invert mx-auto my-24 px-5 max-w-xs lg:max-w-3xl xl:max-w-4xl">
    <MDXRemote {...content} />
  </Container>
);

export default Posts;

export const getStaticPaths = async () => {
  const slugs = getUniqueSlugs();

  const paths = slugs.map((item) => {
    const slug = typeof item === "object" && item !== null ? item.slug : item;
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const [{ data: post, content }] = getText(params.slug);

  const mdxSource = await serialize(content);
  return {
    props: {
      slug: params.slug,
      post,
      content: mdxSource,
    },
  };
};