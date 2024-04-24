import React, { useState, useRef, useEffect } from 'react';
import '../styles/SignUp.css';
import { validate } from '../utils/validateformdata';
import netflix_logo from '../images/netflix-logo-png-clip-art-removebg-preview.png';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth } from '../utils/firebaseconfig';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userInfoSlice';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((store) => store.userInfo)

    /* state variable used to toggle between signup and signin*/
    const [signUp, setSignUp] = useState(false);

    const [result, setResult] = useState(null);

    /*useRef refers to an input element. Make sure to add ref attribute in those input elements*/
    const emailRef = useRef(), passwordRef = useRef(), usernameRef = useRef();

    const handleClick = () => {
        setSignUp(!signUp);
        /* we should not display error messages when user decides to switch between sign up and sign in */
        setResult(null);
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        /* validate function returns null if everything went ok */

        /* need to valid email, password and username when user is in sign up form */
        if(signUp) {
            const x = validate(emailRef.current.value, passwordRef.current.value, usernameRef.current.value)

            /* If the form is not validated */
            if(x === 1) {
                setResult("Invalid Credentials")
                return;
            }
        }

        // Sign up the user 
        if(signUp) {
            /*put result back to null because the all the credentials that has been entered by the user
            are valid and now we just need to check if he is a exisiting user or not. If he is 
            we then display the user is already registered or else we just sign up the user */
            setResult(null)
            createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                /*
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);
                    //
                */
            updateProfile(userCredential.user, { displayName: usernameRef.current.value})
            .then(() => { /* Profile data is updated */ })
            .catch((error) => setResult(error.message));

            /* User has successfully signed up. Now show him the sign in page*/
            setSignUp(false);
            })

            .catch((error) => setResult("User has already registered"));
        }

        // else sign in the user
        else {
            signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                const {displayName, email} = userCredential.user;
                dispatch(addUser({displayName, email}))
                navigate("/browse")
            })
            .catch((error) => {
                setResult("Invalid Credentials")
            });
        }
    }

    useEffect(() => {
        if(userInfo) {
            navigate("/browse")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return !userInfo && (
    <div className='mainContainer'>
        <img src = {netflix_logo} alt = "logo" className='netflixLogo'/>
        <div className='formContainer'>
            <h1>{signUp ? 'Sign Up' : 'Sign In'}</h1>
            <form>
                {
                    /* extra username field in signup form */
                    signUp && <input type='username' placeholder='Enter your username' ref={usernameRef}/>
                }
                <input type='email' placeholder = 'Enter your email here' ref = {emailRef} />
                <input type = 'password' placeholder = 'Enter your password' ref = {passwordRef} />
                <button onClick= {handleButtonClick}>{signUp ? 'Sign Up' : 'Sign In'}</button>
                {/* If we get any errors while signing up */}
                {(result && signUp) && <span className='errorMsg'>{result}</span>}
                {/* If we get any erros while signing in */}
                {(result && !signUp) && <span className='errorMsg'>{result}</span>}
            </form>
            {!signUp ? <p onClick={handleClick}>New to netflix? Sign up here!</p> : 
            <p onClick={handleClick}>Already have an account? Sign in here!</p>}
        </div>
    </div>
  )
}


