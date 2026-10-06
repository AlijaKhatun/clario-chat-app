import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail, updatePassword } from 'firebase/auth';
// import img
import logo from '../assets/logo.png';
import { MdErrorOutline } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
//import element
import HeadLine from '../component/elements/HeadLine';
import SubHeadline from '../component/elements/SubHeadline';
import Input from '../component/elements/Input';
import Img from '../component/elements/Img';
import Flex from '../component/styles/Flex';
import Form from '../component/elements/Form';
const ForgetPasswordPage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [email, setEmail] = useState('');
  const[chckEmail,setCheckEmail]=useState(false)
  const [emailError, setEmailError] = useState('');

  //email  rejex for test
  const emailRejex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleReset = async() => {
   
    // email logic
    if (!email) {
      setEmailError('enter your email');
    } else {
      if (!emailRejex.test(email)) {
        setEmailError('please, enter valid email');
      } else {
        
        try { 
          const resetPassword = await sendPasswordResetEmail(auth, email);
          setCheckEmail(true)
          console.log(resetPassword);
          const updatedPassword = await updatePassword(user, resetPassword);
          console.log(updatedPassword)
          if (updatedPassword) {
            setCheckEmail(false);
          }

        } catch (error) {
       setEmailError(error.code)
     }
      }
    }


  };

  const printEmail = e => {
    setEmail(e.target.value);
    setEmailError('');
  };
  

  return (
    <Flex style="bg-hero w-dvw h-screen justify-center items-center">
      <div className=" w-11/12  md:w-5/12   items-center mx-auto justify-center bg-white rounded-lg shadow-2xl py-5 relative">
        {/* cancel icon */}
        <Link to="/login" className="absolute -top-8 right-1">
          <RxCross2 className="text-xl md:text-2xl text-white opacity-0 hover:opacity-100 duration-700" />
        </Link>

        <Form style="w-10/12 mx-auto">
          <Img src={logo} alt="logo-img" style="w-1/7 mx-auto" />
          <HeadLine text="Forget Password" style="text-center" />
          <SubHeadline
            text="No worries! Just enter your email and we’ll send you login instructions."
            style="text-center mb-1 md:md-2"
          />
          {/* email input */}
          <Input
            label="Email:"
            type="email"
            placeholder="Enter Your Email"
            required={true}
            onChange={printEmail}
          />
          {emailError && (
            <Flex style="items-center justify-end gap-1">
              <MdErrorOutline className="text-red-600" />
              <p className="text-red-600 text-sm">{emailError}</p>
            </Flex>
          )}

          <Flex style="justify-center">
            {chckEmail ? (
              <Link
                onClick={handleReset}
                className="py-2 my-2 md:my-5  w-full  md:w-2/3 text-center bg-ct-green text-white rounded-lg cursor-pointer"
              >
                check your email for reset
              </Link>
            ) : (
              <Link
                onClick={handleReset}
                className="py-2 my-2 md:my-5  w-full  md:w-1/2 text-center bg-ct-green text-white rounded-lg cursor-pointer"
              >
                send reset email
              </Link>
            )}
          </Flex>
        </Form>
      </div>
    </Flex>
  );
};

export default ForgetPasswordPage;
