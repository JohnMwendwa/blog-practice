import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { connectToDatabase, closeConnection } from "./db/db";
import Post from "./db/models/post";
import User from "./db/models/user";

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
    new Date(postA.date) > new Date(postB.date) ? -1 : 1
  );

  return sortedPosts;
};

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}

export async function getPosts() {
  try {
    await connectToDatabase();

    const posts = await Post.find({})
      .select([
        "title",
        "description",
        "author",
        "category",
        "slug",
        "date_uploaded",
      ])
      .populate("author", "firstName lastName", User);

    await closeConnection();
    return JSON.stringify(posts);
  } catch (e) {
    console.log(e);
  }
}
export async function getPostDetails(slug) {
  try {
    await connectToDatabase();

    const posts = await Post.findOne({ slug })
      .select([
        "title",
        "description",
        "author",
        "category",
        "markdown",
        "date_uploaded",
      ])
      .populate("author", "firstName lastName", User);

    await closeConnection();
    return JSON.stringify(posts);
  } catch (e) {
    console.log(e);
  }
}
export async function getPostSlugs() {
  try {
    await connectToDatabase();

    const slugs = await Post.find().select(["-_id", "slug"]);

    await closeConnection();
    return JSON.stringify(slugs);
  } catch (e) {
    console.log(e);
  }
}
