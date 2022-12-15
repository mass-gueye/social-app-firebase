import { collection, addDoc, query, where, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React from 'react'
import { ThumbsUp } from 'react-feather'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../../config/firebase'
import { TypePostList } from './main'

interface IPost {
    post: TypePostList
}
interface ILikePost {
    id: string,
    postId: string,
    userId: string
}

const Post: React.FC<IPost> = ({ post }) => {
    const [likes, setLikes] = React.useState<ILikePost[] | null>(null)
    const likesRef = collection(db, "likes");
    const [user] = useAuthState(auth)

    const likesDoc = query(likesRef, where('postId', '==', post.id))

    const [value, loading, error] = useCollection(
        likesDoc,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        })

    const onLikePost = async () => {
        await addDoc(likesRef, {
            userId: user?.uid,
            postId: post.id

        })
    }
    const onUnLikePost = async () => {
        try {
            const likeToDeleteQuery = query(likesRef, where('postId', '==', post.id), where('userId', '==', user?.uid))
            const likeTodeleteData = await getDocs(likeToDeleteQuery)
            const likeTodelete = await doc(db, 'likes', likeTodeleteData.docs[0].id)
            await deleteDoc(likeTodelete)
        } catch (error) {
            console.error(error)
        }
    }

    const hasUserLike = likes?.find(like => like.userId === user?.uid)

    React.useEffect(() => {
        setLikes(value?.docs.map(doc => ({ ...doc.data(), id: doc.id })) as ILikePost[])
    }, [value])
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
                    onClick={hasUserLike ? onUnLikePost : onLikePost}
                    size={30}
                    className={` hover:cursor-pointer rounded-full p-1.5 ${hasUserLike ? 'bg-violet-700 text-white' : 'text-violet-700 border-2 border-violet-300'}`}
                />
                {likes && <p>Likes: {likes?.length}</p>}
            </div>
        </div>
    )
}

export default Post