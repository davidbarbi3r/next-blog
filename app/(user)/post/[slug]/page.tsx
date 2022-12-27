// The posts are server rendered, so we need to fetch the data from the database to display it when user open

import { groq } from "next-sanity";
import { client } from "../../../../lib/sanity.client";
import urlFor from "../../../../lib/urlFor";
import Post from "../../../../types/Post";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import RichTextComponents from "../../../../components/RichTextComponents";


interface Props {
  params: {
    slug: string;
  };
}

// This function gets called at build time it makes a request to the Sanity API to get all the slugs
// so that the blog pages can be generated during build time
// no delay for the user
// in other hand it doesn't work when we publish a new post or update an existing one (app already built)
// we need to rebuild the app to get the new post
// that's why we need to use the revalidate option 

export const revalidate = 120; // 2 minutes, revalidate the page every 2 minutes

export async function generateStaticParams() {
    const query = groq`
        *[_type=='post'] {
            slug
        }
    `;
    
    const slugs: Post[] = await client.fetch(query);
    const slugRoutes = slugs.map(slug => slug.slug.current);

    return slugRoutes.map(slug => ({
        slug: slug
    }))
}

async function Post({ params: { slug } }: Props) {
  const query = groq`
        *[_type=='post' && slug.current == $slug][0]
        {
            ...,
            author->,
            categories[]->
        }
    `;

  const post: Post = await client.fetch(query, { slug: slug });
  console.log(post);

  return (
    <article className="px-10 pb-28">
        <section className="space-y-2 border border-[#f7ab0a] text-white" >
            <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
                <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
                    <Image
                        src={urlFor(post.mainImage).url()}
                        alt={post.author.name}
                        className="object-cover object-center mx-auto"
                        fill
                    />
                </div>

                <section className="p-5 bg-[#F7AB0A] w-full">
                    <div className="flex flex-col md:flex-row justify-between gap-y-5">
                        <div>
                            <h1 className="text-4xl font-extrabold">
                                {post.title}
                            </h1>
                            <p>
                                {new Date(post._createdAt).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                })}
                            </p>
                        </div>
                        <div>
                            <Image
                                className="rounded-full"
                                src={urlFor(post.author.image).url()}
                                alt={post.author.name}
                                height={40}
                                width={40}
                            />
                            <div className="w-64">
                                <h3 className="text-lg font-bold">{post.author.name}</h3>
                                <div >
                                    {/* {post.author.bio} */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="italic pt-10">{post.description}</h2>
                        <div className="flex items-center justify-end mt-auto space-x-2">
                            {post.categories?.map((cat) => (
                            <p key={cat?._id} className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4">
                                {cat?.title}
                            </p>
                        ))}</div>
                    </div>
                </section>
            </div>
        </section>
        <PortableText
            value={post.body}
            components={RichTextComponents}
        />
    </article>
    );
}

export default Post;
