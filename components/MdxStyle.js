import Image from "next/image";
import { MDXProvider } from "@mdx-js/react";

// Custom elements with CSS
const image = (props) => (
  // Account for different size of images based on if it is a profile picture
  <span className={!props.src.includes("/bio") && "flex justify-center"}>
    <Image
      height={250}
      width={250}
      className={`rounded-sm shadow-lg object-fit mb-5 ${
        props.src.includes("/bio")
          ? "w-1/4"
          : props.src.includes("/news")
          ? "w-auto"
          : "w-1/2"
      }`}
      alt={props.alt}
      {...props}
    />
  </span>
);
const paragraph = (props) => (
  <p className="mb-4 text-left text-gray-600" {...props} />
);

const list = (props) => (
  <li className="mb-4 text-left text-gray-600" {...props} />
);
const anchor = (props) => (
  <a target="_blank" className="text-neutral-dark" {...props} />
);

const header1 = (props) => (
  <h2 className="mt-6 mb-2 text-left text-gray-700 font-bold" {...props} />
);

const header2 = (props) => (
  <h3 className="mt-6 mb-2 text-left italic text-gray-500" {...props} />
);

// Match custom element with HTML tag
const components = {
  img: image,
  p: paragraph,
  a: anchor,
  h2: header1,
  h3: header2,
  li: list,
};

// The MDXProvider is used to customize the style of the markdown passed to the page
const MdxStyle = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);

export default MdxStyle;
