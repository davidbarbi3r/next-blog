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
