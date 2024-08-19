import React from 'react'
import { useFirebase } from '../context/Firebase'

const Home = () => {

  const firebase = useFirebase();

  console.log(firebase.isLoggedIn);
  return (
    <div>Home</div>
  )
}

export default Home