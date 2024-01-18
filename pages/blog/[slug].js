import { serialize } from "next-mdx-remote/serialize";
import { getText, getUniqueSlugs } from "helpers/getTextForSlug";

const Posts = (props) => {
  console.log("🚀 ~ Posts ~ mdxSource :", props.content);
  return <div>[slug]</div>;
};

export default Posts;

export const getStaticPaths = async () => {
  const slugs = getUniqueSlugs();

  //   We further map the slugs to create the paths object that will be passed to
  //   the component as props. Note that depending on the component, the returned
  //   slug could be an object or a string. Thus, we use a ternary operator to get
  //   the right slug. For the intermediary sites, we use the slug as is. For the
  //   rest of the components, we use the slug property of the object.
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
