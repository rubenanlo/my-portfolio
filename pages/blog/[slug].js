import { serialize } from "next-mdx-remote/serialize";
import { createGetStaticPaths } from "helpers/createGetStaticPaths";
import { getText } from "../../helpers/getTextForSlug";

const Posts = ({ mdxSource }) => {
  console.log("🚀 ~ Posts ~ mdxSource :", mdxSource);
  return <div>[slug]</div>;
};

export default Posts;

const component = Posts.name;

export const getStaticPaths = createGetStaticPaths(component);

export const getStaticProps = async ({ params }) => {
  //The function below yields an array of objects. Each object include text
  //(data and non-serlized content) for a intermediary site
  const text = getText(params.slug, component);

  // Since the content we obtain from the function above is not serialized, we
  // loop through the text array and serialize all the content. Note that some
  // elements of the array does not have content. Even though mdx can still
  // serialize md files with no content, we applied this condition, so that we
  // do not render an empty serialized object.

  // Also, note that the serialization below yields an array of serliazed
  // content for those cases where there is content only. For those section
  // where there is no content, we are not returning any property with empty
  // content. That's why we added the filter method to carve out any undefined
  // from the resulting array.
  const mdxSource = (
    await Promise.all(
      text.map(
        async ({ content, id }) =>
          content && {
            id,
            paragraphs: await serialize(content),
          }
      )
    )
  ).filter((mdxSource) => mdxSource);

  return {
    mdxSource,
    slug: params.slug,
  };
};
