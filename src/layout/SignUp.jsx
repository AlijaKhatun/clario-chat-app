import React, { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  reload,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
// import img
import { MdErrorOutline } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

//import element
import Flex from '../component/styles/Flex';
import HeadLine from '../component/elements/HeadLine';
import SubHeadline from '../component/elements/SubHeadline';
import Form from '../component/elements/Form';
import Input from '../component/elements/Input';
import Or from '../component/elements/Or';
import GoogleLink from '../component/elements/GoogleLink';
import PasswordInput from '../component/elements/PasswordInput';

const SignUp = () => {
  //firebase auth
  const auth = getAuth();
 const curUser = auth.currentUser;
const navigate = useNavigate();
  const[loader,setLoader]= useState(false)
  //print input handle hook
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailVerify, setEmailveriy] =useState(false)

  // error input handle hook
  const [fnameError, setFnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  //email and password rejex for test
  const emailRejex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordREjex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  
  const handleClick = async () => {
    if (!fname) {
      setFnameError('enter your first name');
    }
    
    //email logic
    if (!email) {
      setEmailError('enter your email');
    } else {
      if (!emailRejex.test(email)) {
        setEmailError('please, enter valid email');
      } else {
        setEmailError('');
      }
    }
//password logic
    if (!password) {
      setPasswordError('enter your password');
    } else {
      if (!passwordREjex.test(password)) {
        setPasswordError(
          'enter strong password . must be includes uppercase and lowercase letters, number',
        );
      } else {
        setPasswordError('');
      }
    }

    if (!confirmPassword) {
      setConfirmPasswordError('enter your confirm password');
    } else {
      if (password !== confirmPassword) { 
        setConfirmPasswordError('please enter same password')
      } else {
          setConfirmPasswordError('');
      }
        
    }
    

    // firebase sign up 
    if (emailRejex.test(email) && passwordREjex.test(password) && confirmPassword && fname) {
      try {
        const userCredencial = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredencial.user);
        await updateProfile(userCredencial.user, {
          displayName:fname
        })
        setLoader(true)
        setTimeout(() => {
          setEmailveriy(true);
          setLoader(false)
         },2000)
      } catch (error) {
        console.log(error)
          const errorCode = error.code;
          if (errorCode.includes("auth/too-many-requests")) {
            setEmailError("try another email")
          } else if (errorCode.includes("auth/email-already-in-use")) {
            setEmailError("try another email")
          }
        };
      }



  }
  
  const handleVerify = async () => {

      if (!curUser) return;

      await reload(curUser);

      if (curUser.emailVerified) {
        setLoader(true);

        setTimeout(() => {
          navigate('/home');
          setLoader(false)
        }, 2000);
      } else {
        setEmailError('Please verify your email ');
      }
  }
  
  const printFname = e => {
    setFname(e.target.value);
    setFnameError('');
  };
  
  const printEmail = e => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const printPassword = e => {
    setPassword(e.target.value);
    setPasswordError('');
  };
  const printConfirmPassword = e => {
    setConfirmPassword(e.target.value);
    
  };

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
      {emailVerify ? (
        <Flex style="bg-hero w-dvw h-screen justify-center items-center">
          <div className=" w-11/12  md:w-5/12   items-center mx-auto justify-center bg-white rounded-lg shadow-2xl py-5 relative">
            {/* cancel icon */}
            <Link
              onClick={() => setEmailveriy(false)}
              className="absolute -top-8 right-1"
            >
              <RxCross2 className="text-xl md:text-2xl text-white opacity-0 hover:opacity-100 duration-700" />
            </Link>

            <Form style="w-10/12 mx-auto">
              <HeadLine text="Verify Your Email" style="text-center" />
              <SubHeadline
                text="No worries!just sending a email for verify . so click the verification link"
                style="text-center mb-1 md:md-2"
              />

              <Flex style="justify-center">
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
                    onClick={handleVerify}
                    className="py-2 my-2 md:my-5  w-full  md:w-1/2 text-center bg-ct-green text-white rounded-lg cursor-pointer"
                  >
                    I have verified my email
                  </Link>
                )}
              </Flex>
            </Form>
          </div>
        </Flex>
      ) : (
        <Flex style="bg-hero w-dvw h-screen justify-center items-center">
          <div className=" w-11/12  md:w-5/12  items-center mx-auto justify-center bg-white rounded-lg shadow-2xl py-5">
            <Form style="w-10/12 mx-auto">
              <HeadLine text="welcome to Clario" style="text-center" />
              <SubHeadline
                text="Create your account to get started"
                style="text-center mb-1 md:md-2 lg:mb-3"
              />
              <Input
                label="Full Name:"
                type="text"
                placeholder="Enter Your full name"
                required={true}
                flexStyle="md:flex-row md:items-center md:justify-between"
                onChange={printFname}
              />
              {fnameError && (
                <Flex style="items-center justify-end gap-1">
                  <MdErrorOutline className="text-red-600" />
                  <p className="text-red-600 text-sm">{fnameError}</p>
                </Flex>
              )}

              <Input
                label="Email:"
                type="email"
                placeholder="Enter Your Email"
                required={true}
                flexStyle="md:flex-row md:items-center md:justify-between"
                onChange={printEmail}
              />
              {emailError && (
                <Flex style="items-center justify-end gap-1">
                  <MdErrorOutline className="text-red-600" />
                  <p className="text-red-600 text-sm">{emailError}</p>
                </Flex>
              )}
              <PasswordInput
                labelText="Password:"
                flexStyle="md:flex-row md:items-center md:justify-between"
                onChange={printPassword}
              />
              {passwordError && (
                <Flex style="items-center justify-end gap-1">
                  <MdErrorOutline className="text-red-600" />
                  <p className="text-red-600 text-sm">{passwordError}</p>
                </Flex>
              )}
              <PasswordInput
                labelText="Confirm Password:"
                flexStyle="md:flex-row md:items-center md:justify-between"
                onChange={printConfirmPassword}
              />
              {confirmPasswordError && (
                <Flex style="items-center justify-end gap-1">
                  <MdErrorOutline className="text-red-600" />
                  <p className="text-red-600 text-sm">{confirmPasswordError}</p>
                </Flex>
              )}

              <Or />
             
              <GoogleLink onClick={handleGoogle}/>
              <Flex style="justify-center">
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
                    sign up
                  </Link>
                )}
              </Flex>
              <p className="text-center">
                already have an account ?
                <Link
                  to="/login"
                  className="text-ct-green font-bold cursor-pointer"
                >
                  Sign In
                </Link>
              </p>
            </Form>
          </div>
        </Flex>
      )}
    </>
  );
};
export default SignUp;
