import { useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Container } from "components/Container";
import Toolbar from "components/Toolbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "Start typing here..." }],
  },
];

const Cms = () => {
  const [editor] = useState(() => withReact(createEditor()));
  // Render the Slate context.
  return (
    <>
      <Container>
        <Toolbar />
        <Container
          className={{
            dimensions:
              "mt-10 mx-10 p-5 h-[60vh] bg-zinc-300 overflow-y-auto scrollbar",
            typograhpy: "text-gray-800",
            border: "border rounded-md",
          }}
        >
          <Slate editor={editor} initialValue={initialValue}>
            <Editable />
          </Slate>
        </Container>
      </Container>
    </>
  );
};

export default Cms;

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["navLinks"])),
    },
  };
};
