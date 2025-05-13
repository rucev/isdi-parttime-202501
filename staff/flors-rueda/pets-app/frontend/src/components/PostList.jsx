import Post from "./Post"

const PostList = ({ posts, setRefreshPosts, isMyPostsPage }) => {

    return <div className="flex flex-col justify-center items-center gap-8 w-full">
        {
            (posts && posts.length > 0) && posts.map((post, index) => {
                return <Post key={index} postData={post} setRefreshPosts={setRefreshPosts} isMyPostsPage={isMyPostsPage} />
            })
        }
        {
            !posts || posts.length === 0 && <p>no posts</p>
        }
    </div>
}

export default PostList