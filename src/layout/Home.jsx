import React from 'react'
import { getAuth } from 'firebase/auth';
import Img from '../component/elements/Img';
import logo from '../assets/logo.png'

const Home = () => {
   const auth = getAuth();
   const curUser = auth.currentUser;
  return (
    <div className="text-center mt-3 md:mt-5">
      <Img src={logo} alt="logo" style="max-w-30 mx-auto" />
      <h1 className="my-3 md:my-5 text-xl md:text-2xl">{`hi, ${curUser.displayName}`}</h1>
      <h3 className="my-3 md:my-5 text-lg md:text-xl">
        this is your home page.
      </h3>
    </div>
  );
}

export default Home