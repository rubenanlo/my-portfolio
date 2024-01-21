import { Container } from "components/Container";
import Hero from "components/Hero";
import Articles from "components/Posts";
import Contact from "components/Contact";
import Resume from "components/Resume";
import { getAllText } from "helpers/getTextForSlug";

const Index = ({ articles }) => (
  <Container className={{ dimension: "max-w-xl lg:max-w-4xl w-full mx-auto" }}>
    <Hero />
    <Container.Section>
      <Container.Columns
        className={{
          grid: "grid-cols-1 lg:grid-cols-2 gap-y-20 gap-x-32",
        }}
      >
        <Articles articles={articles} />
        <Container className="place-items-start space-y-10">
          <Contact />
          <Resume />
        </Container>
      </Container.Columns>
    </Container.Section>
  </Container>
);

export default Index;

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
