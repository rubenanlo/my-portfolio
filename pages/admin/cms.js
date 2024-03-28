import { useCallback, useState } from "react";
import { Editor, Element, Transforms, createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Container } from "components/Container";
import Toolbar from "components/Toolbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "Write your own ideas, start here" }],
  },
];

const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Cms = () => {
  const [editor] = useState(() => withReact(createEditor()));
  // Render the Slate context.

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  console.log("🚀 ~ renderElement ~ renderElement:", renderElement);
  return (
    <Container>
      <Toolbar />
      <Container
        className={{
          dimensions: "mt-10 mx-10 p-5 h-[60vh] overflow-y-auto scrollbar",
          typography: "text-gray-800 dark:text-gray-400",
          border: "border rounded-md border-gray-400/30",
        }}
      >
        <Slate editor={editor} initialValue={initialValue}>
          <Editable
            renderElement={renderElement}
            onKeyDown={(event) => {
              if (event.key === "`" && event.ctrlKey) {
                event.preventDefault();
                // Determine whether any of the currently selected blocks are code blocks.
                const [match] = Editor.nodes(editor, {
                  match: (n) => n.type === "code",
                });
                console.log("🚀 ~ Cms ~ match:", match);
                // Toggle the block type depending on whether there's already a match.
                Transforms.setNodes(
                  editor,
                  { type: match ? "paragraph" : "code" },
                  {
                    match: (n) =>
                      Element.isElement(n) && Editor.isBlock(editor, n),
                  }
                );
              }
            }}
          />
        </Slate>
      </Container>
    </Container>
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
