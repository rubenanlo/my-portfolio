import { Container } from "components/Container";
import Hero from "components/Hero";
import Articles from "components/Articles";
import Contact from "components/Contact";
import Resume from "components/Resume";
import { getAllText } from "helpers/getText";
import { setOrder } from "helpers/manipulateText";

const Index = ({ articles }) => {
  const orderedArticles = setOrder(articles);
  return (
    <Container
      className={{ dimension: "max-w-xl lg:max-w-4xl w-full mx-auto" }}
    >
      <Hero />
      <Container.Section>
        <Container.Columns
          className={{
            grid: "grid-cols-1 lg:grid-cols-2 gap-y-20 gap-x-32",
          }}
        >
          <Articles articles={orderedArticles} />
          <Container className="place-items-start space-y-10">
            <Contact />
            <Resume />
          </Container>
        </Container.Columns>
      </Container.Section>
    </Container>
  );
};

export default Index;

export const getStaticProps = async () => {
  const text = await getAllText({ page: "blog" });
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
