const { i18n } = require("./next-i18next.config");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // Optional configurations for MDX can go here
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  pageExtensions: ["js", "jsx", "md", "mdx"],
};

// Apply the withMDX configuration
module.exports = withMDX(nextConfig);
