import { readdirSync, readFileSync } from "fs";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import _ from "lodash";

const DIRECTORY = {
  blog: path.join("pages", "blog", "posts"),
  about: path.join("pages", "about", "text"),
};

// function to get all the files from the folder depending on the slug
const getFiles = (page) => readdirSync(DIRECTORY[page]);

export const createFileNameSlug = (input) => input.replace(/\.mdx?$/, "");

export const getAllText = ({ withSummarizedContent, page, mdxContent }) =>
  getFiles(page).map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, "");
    const mdPath = path.join(DIRECTORY[page], `${slug}.md`);
    const mdxPath = path.join(DIRECTORY[page], `${slug}.mdx`);

    let fileContents;
    if (fs.existsSync(mdPath)) {
      fileContents = fs.readFileSync(mdPath, "utf8");
    } else if (fs.existsSync(mdxPath)) {
      fileContents = fs.readFileSync(mdxPath, "utf8");
    } else {
      throw new Error(`No .md or .mdx file found for slug ${slug}`);
    }
    // the code below only yields the metadata from all the md files
    const { data } = matter(fileContents);
    data["slug"] = createFileNameSlug(slug);

    // the code below yields the summary of the content for all posts whenever
    // we pass the withSummary argument as true. This is the case for the blog post
    // site. We limit the content that we return, since the file size would be
    // too big otherwise.
    let summary;
    if (withSummarizedContent) {
      const { content } = matter(fileContents);
      summary = _.truncate(content.slice(content.search("##") + 2), {
        // If post contains image: Keep at 900
        // If no image: increase length to 1500-2000
        length: 2000,
        omission: "...",
        separator: " ",
      });
    }

    let content;
    if (mdxContent) {
      const { content: mdxContent } = matter(fileContents);
      content = mdxContent;
    }
    return {
      // Create slug to use in dynamic routes
      data,
      ...(summary && { summary }),
      ...(content && { content }),
      // the expression above means that  when summary is truthy (it has a
      // value), the ...(summary && { summary }) expression will include the
      // summary property in the returned object. When summary is falsy, it will
      // not include the summary property. This way we avoid situations where
      // there is no summary needed to be returned (e.g., case studies).
    };
  });

// Since the createFileNameSlug function does not provide a unique list of
// slugs, the getUniqueSlugs function DOES provide a unique list of slugs,
// thanks to the use of the uniq lodash method. This is further applied to the
// slug for the intermediary sites
export const getUniqueSlugs = ({ page }) =>
  _.uniq([...getAllText({ page }).map(({ data: { slug } }) => slug)]);

export const getText = ({ slug, withFormattedSlug, page }) => {
  try {
    // We first return a list of files applicable to the slug component
    // We then filter the files based on the slug. We use filter method and not
    // find method, because for certain slug components (e.g., intermediary sites)
    // we have multiple md files which requires us to return an array of files for
    // each specific slug.
    // We then return the metadata and content of the md files. We use map method,
    // since the filter method returns an array of files.
    return getFiles(page)
      .filter((fileName) => createFileNameSlug(fileName) === slug)
      .map((file) => {
        const { data, content } = matter(
          readFileSync(`${DIRECTORY[page]}/${file}`, "utf8")
        );
        const id = file.match(/\d-(.*)\.md$/)?.[1] || null;
        const formattedSlug = withFormattedSlug && file.replace(/\.mdx?$/, "");
        return {
          ...(id && { id }),
          data,
          ...(content && { content }),
          ...(formattedSlug && { formattedSlug }),
        };
        // we return the id, formattedSlug and content only if it exists. We
        // applied this approach to these properties, since we initally included
        // the id property for the intermediary sites, the formattedSlug to yield
        // rankings, and the content for any slug.
      });
  } catch (error) {
    console.error("Error getting text:", error);
  }
};
