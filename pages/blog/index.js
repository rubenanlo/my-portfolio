import { Container } from "components/Container";
import { getAllText } from "helpers/getTextForSlug";
import { Carousel } from "components/Articles";

const Blog = ({ articles }) => (
  <Container.Columns
    className={{
      grid: "grid-cols-1 lg:grid-cols-[1fr,2fr,3rem]",
      dimension: "h-full border",
    }}
  >
    <Container className="mt-10 lg:mt-20">Stats</Container>
    <Container
      className={{
        dimension: "mt-10 lg:mt-20 mr-2",
        otherStyles: "snap-mandatory snap-x overflow-x-auto scrollbar-hide",
      }}
    >
      <Carousel articles={articles} blogPath />
    </Container>
    <Container className="border" />
  </Container.Columns>
);

export default Blog;

export const getStaticProps = async () => {
  const text = await getAllText();
  const articles = text.map(({ data }) => data);
  if (!articles.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: { articles },
  };
};
