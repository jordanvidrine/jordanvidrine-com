const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const moment = require("moment");

const now = String(Date.now());

module.exports = function (eleventyConfig) {
  // Copy `assets/` to `_site/assets`
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addShortcode("version", function () {
    return now;
  });

  eleventyConfig.addFilter("dateIso", date => {
    return moment(date).utc().format("LL"); // May 31, 2019
  });

  // excerpt parsing
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: "<!--more-->"
  });

  eleventyConfig.addShortcode("listFunction", function (list) {
    return list
      .map(item => {
        return `<span class="text-sm mr-2 mb-2 inline-block text-gray-800 bg-gray-900 bg-opacity-10 rounded px-2">${item}</span>`;
      })
      .join(" ");
  });

  //syntax highlight
  eleventyConfig.addPlugin(syntaxHighlight);

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  });
  eleventyConfig.setLibrary("md", markdownLibrary);
};
