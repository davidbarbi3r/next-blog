import { Block, Image, Slug } from "sanity";
import Author from "./Author";
import Base from "./Base";
import Category from "./Category";

export default interface Post extends Base {
    author: Author
    body: Block[]
    categories: Category[]
    mainImage: Image
    slug: Slug
    title: string
    description: string
}