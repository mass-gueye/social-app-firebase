import React from 'react'
import CreateForm from './create-form'

const CreatePost = () => {

    return (
        <div className='h-[88vh] flex flex-col justify-center gap-4'>
            <h1 className='text-center font-medium font-serif italic'>New Post</h1>
            <CreateForm />
        </div>
    )
}

export default CreatePost