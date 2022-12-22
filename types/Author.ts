import { Block, Image, Slug } from "sanity";
import Base from "./Base";

export default interface Author extends Base {
    bio: Block[]
    image: Image
    name: string
    slug: Slug
}