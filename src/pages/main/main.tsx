import React from 'react'
import { getFirestore, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../config/firebase';
import Post from './post';

export type TypePostList = {
  id: string,
  title: string,
  description: string,
  username: string,
  userId: string
}

const Main = () => {
  const [user] = useAuthState(auth);

  const postsRef = collection(db, "posts");
  const [postList, setPostList] = React.useState<TypePostList[] | null>(null)
  const [value, loading, error] = useCollection(
    postsRef,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    })

  React.useEffect(() => {
    setPostList(value?.docs.map(doc => ({ ...doc.data(), id: doc.id })) as TypePostList[])

  }, [value])

  return (
    <div className='bg-slate-100 mx-auto h-[88vh] overflow-auto flex flex-col items-center  gap-2 w-3/5'>
      <>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value && (
          <>
            {postList?.map((post) => (
              <React.Fragment key={post.id}>
                <Post post={post} />
              </React.Fragment>

            ))}
          </>
        )}
      </>
    </div>
  )
}

export default Main