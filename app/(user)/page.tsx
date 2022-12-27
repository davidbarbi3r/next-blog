import { previewData } from "next/headers"
import { groq } from "next-sanity"
import { client } from "../../lib/sanity.client"
import PreviewSuspense from "../../components/PreviewSuspense"
import PreviewBlogList from "../../components/PreviewBlogList"
import BlogList from "../../components/BlogList"

//get all posts, get all attributes and add author and categories[] order by descendent order
//the -> is like a "populate" to expand the data and not getting just the author id for example
const query = groq`
  *[_type=='post'] {
    ...,
    author->,
    categories[]->
  } | order(_createdAt desc)
`

export const revalidate = 120; // 2 minutes, revalidate the page every 2 minutes

export default async function HomePage () {

  if(previewData()){
    return <PreviewSuspense fallback={
    (<div role="status">
      <p className="text-center text-lg animate-pulse text-[#F7AB0A]">
        Loading Preview Data...
      </p>
    </div>)
    }>
      <PreviewBlogList query={query}/>
  </PreviewSuspense>
  }
  
  const posts = await client.fetch(query);
  console.log(posts)
  return <BlogList posts={posts}/>
}