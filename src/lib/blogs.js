import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read all JSON files from the blogs folder
const blogsDirectory = path.join(__dirname, "blogs");
const blogFiles = fs.existsSync(blogsDirectory)
  ? fs.readdirSync(blogsDirectory).filter((file) => file.endsWith(".json"))
  : [];

// Load all blog JSON files
const blogs = blogFiles
  .map((file) => {
    try {
      const filePath = path.join(blogsDirectory, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error loading blog file ${file}:`, error);
      return null;
    }
  })
  .filter((blog) => blog !== null)
  .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first

export { blogs };

export function getBlogs() {
  return blogs;
}

export function getBlogBySlug(slug) {
  return blogs.find((post) => post.slug === slug);
}

