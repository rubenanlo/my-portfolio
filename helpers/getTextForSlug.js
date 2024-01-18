import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";
import _ from "lodash";

const DIRECTORY = path.join("pages", "blog", "posts");

// function to get all the files from the folder depending on the slug
const getFiles = () => readdirSync(DIRECTORY);

export const createFileNameSlug = (input) => input.replace(".md", "");

export const getAllText = (withSummarizedContent) =>
  getFiles().map((fileName) => {
    const slug = fileName.replace(".md", "");
    const fileContents = readFileSync(`${DIRECTORY}/${slug}.md`, "utf8");
    // the code below only yields the metadata from all the md files
    const { data } = matter(fileContents);

    // the code below yields the summary of the content for all posts whenever
    // we pass the withSummary argument as true. This is the case for the media
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
    return {
      // Create slug to use in dynamic routes
      slug: createFileNameSlug(slug),
      data,
      ...(summary && { summary }),
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
export const getUniqueSlugs = () =>
  _.uniq([...getAllText().map(({ slug }) => slug)]);

export const getText = (slug, withFormattedSlug) =>
  // We first return a list of files applicable to the slug component
  // We then filter the files based on the slug. We use filter method and not
  // find method, because for certain slug components (e.g., intermediary sites)
  // we have multiple md files which requires us to return an array of files for
  // each specific slug.
  // We then return the metadata and content of the md files. We use map method,
  // since the filter method returns an array of files.
  getFiles()
    .filter((fileName) => createFileNameSlug(fileName) === slug)
    .map((file) => {
      const { data, content } = matter(
        readFileSync(`${DIRECTORY}/${file}`, "utf8")
      );
      const id = file.match(/\d-(.*)\.md$/)?.[1] || null;
      const formattedSlug = withFormattedSlug && file.replace(".md", "");
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
