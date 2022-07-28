import React, { useState } from 'react';
import '../../styles/Login/Login.css';
import '../../styles/Register/Register.css';
import googleIcon from '../../assets/google.svg';
import gitIcon from '../../assets/github.png';
import { useMutation } from 'react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import getUser from '../../redux/actions/user.action';
import Loader from '../Loader/Loader';

const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // validations 
    const [isEmailValid, setIsEmailValid] = useState(1);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(1);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { mutate, isLoading } = useMutation(
        async (data) => {
            const res = await axios({
                method: 'post',
                url: '/api/v1/login',
                data
            })
            return res.data;
        },
        {
            onError: (error) => {
                setIsEmailValid(0);
                setEmailErrorMessage(error.response.data.message)
            },
            onSuccess: (data) => {
                dispatch(getUser(data));
                navigate('/');
            }
        }
    )

    const postDetails = () => {
        mutate({
            email: email,
            password: password
        })
    }


    const handleSubmit = (isBlurOrSubmit) => {

        if ((email === "") || (password === "")) {

            if (email === "") {
                setIsEmailValid(0);
                setEmailErrorMessage("Email can not be empty.")
            } else {
                setIsEmailValid(1);
            }

            if (password === "") {
                setIsPasswordValid(0);
                setPasswordErrorMessage("Password can not be empty.")
            } else {
                setIsPasswordValid(1);
            }


        }
        else {

            setIsEmailValid(1);
            setIsPasswordValid(1);

            if (isBlurOrSubmit === "submit")
                postDetails();
        }

    }

    const handleInputBlur = () => {
        if (!isEmailValid || !isPasswordValid) {
            handleSubmit('blur');
        }
    }


    return (
        <>
            {/* {!isLoading ? */}
            <div className='login-wrapper'>

                <Link to='/'>
                    <div className='login-logo'>
                        CodeQuery
                    </div>
                </Link>

                {/* Third party buttons  */}
                <div className='login-signup-button'>
                    <div className='login-signup-button-img'>
                        <img src={googleIcon} alt="" />
                    </div>
                    <div>
                        Log in with Google
                    </div>
                </div>

                <div className='login-signup-button git-button'>
                    <div className='login-signup-button-img'>
                        <img src={gitIcon} alt="" />
                    </div>
                    <div>
                        Log in with Github
                    </div>
                </div>


                {/* {/* register fields  */}
                <div className='register-fields'>
                    <div className='register-field-wrap register-flex'>
                        <div className='register-field-wrap-item'>
                            <div className='register-label-row'>
                                <label htmlFor="email">Email</label>
                            </div>
                            <input
                                className={!isEmailValid ? 'register-field-input register-field-input-RB' : 'register-field-input'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                name=""
                                id="email"
                                onBlur={() => handleInputBlur()} />
                            {!isEmailValid ? (
                                <div
                                    className='error-message'>
                                    {emailErrorMessage}
                                </div>) : null}
                        </div>
                        <div className='register-field-wrap-item'>
                            <div className='register-label-row'>
                                <label htmlFor="password">Password</label>
                                <a href='/' className='register-forgot-pass'>Forgot Password?</a>
                            </div>
                            <input
                                className={!isPasswordValid ? 'register-field-input register-field-input-RB' : 'register-field-input'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name=""
                                id="password"
                                onBlur={() => handleInputBlur()} />
                            {!isPasswordValid ? (<div
                                className='error-message'>
                                {passwordErrorMessage}
                            </div>) : null}
                        </div>
                        <div
                            onClick={() => handleSubmit('submit')}
                            className='register-submit-button btn'>
                            Log in
                        </div>
                    </div>
                </div>

                {/* bottom info and links  */}
                <div className='register-bottom-links'>
                    <div>Don’t have an account?</div>
                    <Link to='/signup'>
                        <pre>  Sign up</pre>
                    </Link>
                </div>

            </div >
            {/* : <Loader />} */}

        </>
    )
}

export default Login