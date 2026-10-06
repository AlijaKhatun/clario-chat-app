import React, { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';


// import img
import logo from '../assets/logo.png';
import { MdErrorOutline } from 'react-icons/md';
//import element
import Img from '../component/elements/Img';
import Flex from '../component/styles/Flex';
import HeadLine from '../component/elements/HeadLine';
import SubHeadline from '../component/elements/SubHeadline';
import Form from '../component/elements/Form';
import Input from '../component/elements/Input';
import Or from '../component/elements/Or';
import GoogleLink from '../component/elements/GoogleLink';
import PasswordInput from '../component/elements/PasswordInput';
const LoginPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();
    const[loader,setLoader]= useState(false)
  
  //print input handle hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // error input handle hook
 const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  

  const handleClick = () => {
   
    // email logic
    if (!email) {
      setEmailError("enter your email")
    } 
    //password logic
    if (!password) {
      setPasswordError('enter your password')
    } 
   

    //firebase login successfully
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
          setLoader(true)
          if (userCredential.user.emailVerified) {
            setTimeout(() => {
              navigate('/home');
              setLoader(false);
            }, 2000);
          } else {
            setEmailError("verify your email , please")
          }
          
        })
        .catch(error => {
          const errorCode = error.code;
          
          console.log(errorCode)
          if (errorCode.includes('auth/invalid-credential')) {
            setPasswordError("invalid password")
          } else if (errorCode.includes("auth/invalid-email")) {
            setEmailError("invalid email")
          }
        });
    }

  }
  
    const printEmail = e => {
      setEmail(e.target.value);
      setEmailError("");
    };
 
    const printPassword = (e) => {
      setPassword(e.target.value);
      setPasswordError('')
    }
    
  
  const handleGoogle = async ()=> {
      const provider = new GoogleAuthProvider();
    
      try { 
        const result = await signInWithPopup(auth, provider);
        console.log(result.user)
        navigate("/home")
        
      } catch (error) {
          console.log(error)
        }
    }
  
  
  return (
    <>
      <Flex style="bg-hero w-dvw h-screen  justify-center items-center">
        <div className=" w-11/12  md:w-5/12   items-center mx-auto justify-center bg-white rounded-lg shadow-2xl py-5">
          <Form style="w-10/12 mx-auto">
            <Img src={logo} alt="logo-img" style="w-1/7 mx-auto" />
            <HeadLine text="Welcome Back" style="text-center" />
            <SubHeadline
              text="Login to continue your account"
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
            {/* password input */}
            <PasswordInput labelText="Password:" onChange={printPassword} />
            {passwordError && (
              <Flex style="items-center justify-end gap-1">
                <MdErrorOutline className="text-red-600" />
                <p className="text-red-600 text-sm">{passwordError}</p>
              </Flex>
            )}
            <Flex style='justify-end items-center font-DMSans'>
              <Link to="/resetPassword" className=" cursor-pointer">
                forget password
              </Link>
            </Flex>

            <Or />
            <GoogleLink onClick={handleGoogle}/>

            <Flex style="justify-center items-center">
               {loader ? (
                              <Link className="py-2 my-2 md:my-5  w-full  md:w-1/2 text-center bg-ct-green rounded-lg flex justify-center items-center">
                                <Oval
                                  visible={true}
                                  height="25"
                                  width="25"
                                  color="#ffffff"
                                  ariaLabel="oval-loading"
                                  wrapperStyle={{}}
                                  wrapperClass=""
                                />
                              </Link>
                            ) : (
                              <Link
                                onClick={handleClick}
                                className="py-2 my-2 md:my-5  w-full  md:w-1/2 text-center bg-ct-green text-white rounded-lg cursor-pointer"
                              >
                                login
                              </Link>
                            )}
            </Flex>
            <p className="text-center">
              Don't have account ?
              <Link
                to="/signup"
                className="text-ct-green font-bold cursor-pointer"
              >
                Sign Up
              </Link>
            </p>
          </Form>
        </div>
      </Flex>
    </>
  );
}

export default LoginPage