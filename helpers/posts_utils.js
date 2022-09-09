import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export const getPostFiles = () => fs.readdirSync(postsDirectory);

export const getPostData = (fileName) => {
  const slug = fileName.replace(/\.md$/, "");

  const filePath = path.join(postsDirectory, `${slug}.md`);

  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(fileContent);

  return {
    slug,
    ...data,
    content,
  };
};

export const getAllPosts = () => {
  const postFiles = getPostFiles();
  const allPosts = postFiles.map((post) => getPostData(post));

  //   sort posts by date
  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
};

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => {
    post.isFeatured;
  });

  return featuredPosts;
}
