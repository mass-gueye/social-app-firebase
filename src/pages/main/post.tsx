import React from 'react'
import { ThumbsUp } from 'react-feather'
import { TypePostList } from './main'

interface IPost {
    post: TypePostList
}
const Post: React.FC<IPost> = ({ post }) => {
    const [liked, setLiked] = React.useState(false)
    const toggleLike = () => setLiked(prev => !prev)
    return (
        <div className='border-b-2 p-5'>
            <div className="">
                <h1>{post.title}</h1>
            </div>
            <div className="">
                <p>{post.description}</p>
            </div>
            <div className="flex gap-4 items-center">
                <p>@{post.username}</p>
                <ThumbsUp
                    onClick={toggleLike}
                    size={30}
                    className={` hover:cursor-pointer rounded-full p-1.5 ${liked ? 'bg-violet-700 text-white' : 'text-violet-700 border-2 border-violet-300'}`}
                />
            </div>
        </div>
    )
}

export default Post