import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

interface CreateFromData {
    title: string,
    description: string,
}


const CreateForm = () => {
    const schema = Yup.object().shape({
        title: Yup.string().required("You must add a title"),
        description: Yup.string().required("You must add a description"),
    })
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<CreateFromData>({
        resolver: yupResolver(schema)
    })
    const postsRef = collection(db, "posts");

    const onCreatePost = async (data: CreateFromData) => {
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid
        })
        navigate('/')
    }
    return (
        <form className='justify-center flex flex-col border-2 p-10 border-violet-300 mx-auto rounded' onSubmit={handleSubmit(onCreatePost)}>
            <input
                className='p-2.5 rounded-lg border-2 m-2 border-violet-600 placeholder:capitalize'
                type="text"
                placeholder='title'
                id='title'
                {...register("title")}
            />
            {errors.title?.message && <p className='text-red-600 font-semibold'>*{errors.title?.message}</p>}
            <textarea
                className='p-10 rounded-lg border-2 m-2 border-violet-600 placeholder:capitalize'
                placeholder='description'
                id='description'
                {...register("description")}
            >

            </textarea>
            {errors.description?.message && <p className='text-red-600 font-semibold'>*{errors.description?.message}</p>}
            <button
                className='font-semibold w-full  self-center bg-violet-600 from-violet-900 hover:bg-violet-700 hover:cursor-pointer text-white capitalize'
                type="submit"

            >
                create post
            </button>
        </form>
    )
}

export default CreateForm