import React from 'react'
import { auth } from '../config/firebase'
const useProfile = () => {

    return {
        user: auth.currentUser
    }


}

export default useProfile