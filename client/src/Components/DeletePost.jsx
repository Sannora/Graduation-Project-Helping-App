import { useContext, useEffect } from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const DeletePost = () => {

    const navigate = useNavigate();

    const {currentUser} = useContext(UserContext)
    const token = currentUser?.token;

    //redirect to login who is not logged in
    useEffect(() =>{
        if(!token) {
            navigate('/login')
        }
    }, [])

  return (
    <div>DeletePost</div>
  )
}

export default DeletePost