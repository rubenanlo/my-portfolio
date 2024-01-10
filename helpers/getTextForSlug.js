import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";
import _ from "lodash";

const DIRECTORY = {
  Blog: path.join("pages", "blog", "posts"),
};

// function to get all the files from the folder depending on the slug
const getFiles = (component) => readdirSync(DIRECTORY[component]);

// the createFileNameSlug function creates a list of the slugs by looking at
// the file name and replacing the .md extension by nothing. If the slug is the
// intermediary site, we grab the first characters before the character "-".
// This function does not create unique values. Thus, you will get a list of
// duplicated slugs for the intermediary sites. The getUniqueSlugs function
// returns a unique array of slugs for the intermediary sites.

export const createFileNameSlug = (input, component) =>
  // We return the slug name based on the component we are in. For the
  // intermediary sites, we return the first part of the file name. For the
  // news, we carve out the date from the file name. For the rest,
  // we return all the file name except the ".md" extension.
  component === "Intermediary"
    ? input.replace(".md", "").split("-")[0]
    : ["Post", "Report"].includes(component)
    ? input.slice(11, input.length).replace(".md", "")
    : input.replace(".md", "");

export const getAllText = (
  component,
  withSummarizedContent,
  withSummarizedContentHomepage
) =>
  // We first return a list of all files through the function getFiles that are
  // applicable to a specific slug component (e.g., intermediary, case studies)
  // We further manipulate the file names in order to create a list of the slugs
  // for the slug component.
  getFiles(component).map((fileName) => {
    const slug = fileName.replace(".md", "");
    const fileContents = readFileSync(
      `${DIRECTORY[component]}/${slug}.md`,
      "utf8"
    );
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
    if (withSummarizedContentHomepage) {
      const { content } = matter(fileContents);
      // To remove image tag completely, we go through this surgical operation to...
      // ... create an array out of content
      let testArr = content.split("");
      // Based if in an array of single elements, the chars "!" and "[" in succession appear,
      // Cut everything until the ")" char.
      testArr[testArr.indexOf("!") + 1].includes("[")
        ? testArr.splice(testArr.indexOf("!"), testArr.indexOf(")"))
        : null;
      // We limit the content that we return, since the file size would be
      // too big otherwise.
      summary = _.truncate(
        String(testArr.join("")).replace(
          /(?:__|[*#])|\[(.*?)\]\(.*?\)/gm,
          "$1"
        ),
        {
          // If post contains image: Keep at 900
          // If no image: increase length to 1500-2000
          length: 2000,
          omission: "...",
          separator: " ",
        }
      );
    }
    return {
      // Create slug to use in dynamic routes
      slug: createFileNameSlug(slug, component),
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
export const getUniqueSlugs = (component) =>
  _.uniq([...getAllText(component).map(({ slug }) => slug)]);

export const getText = (slug, component, withFormattedSlug) =>
  // We first return a list of files applicable to the slug component
  // We then filter the files based on the slug. We use filter method and not
  // find method, because for certain slug components (e.g., intermediary sites)
  // we have multiple md files which requires us to return an array of files for
  // each specific slug.
  // We then return the metadata and content of the md files. We use map method,
  // since the filter method returns an array of files.
  getFiles(component)
    .filter((fileName) => createFileNameSlug(fileName, component) === slug)
    .map((file) => {
      const { data, content } = matter(
        readFileSync(`${DIRECTORY[component]}/${file}`, "utf8")
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
