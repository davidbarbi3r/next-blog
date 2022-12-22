import Post from "../types/Post"

interface Props {
    posts: Post[]
}

function BlogList({posts}: Props) {
  return (
    <div>BlogList</div>
  )
}

export default BlogList