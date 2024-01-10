import { getAllText, getUniqueSlugs } from "helpers/getTextForSlug";

export const createGetStaticPaths = (component) => async () => {
  // We first render the component to get all the slugs from getAllText
  // function. if this function returns a falsy value, then we use the
  // getUniqueSlugs, which will be the case for the intermediary sites.
  const text = getUniqueSlugs(component) || getAllText(component);

  //   We further map the slugs to create the paths object that will be passed to
  //   the component as props. Note that depending on the component, the returned
  //   slug could be an object or a string. Thus, we use a ternary operator to get
  //   the right slug. For the intermediary sites, we use the slug as is. For the
  //   rest of the components, we use the slug property of the object.
  const paths = text.map((item) => {
    const slug = typeof item === "object" && item !== null ? item.slug : item;
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
};
