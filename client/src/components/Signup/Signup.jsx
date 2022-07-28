import React, { useState } from 'react'
import '../../styles/Signup/Signup.css'
import '../../styles/Register/Register.css'
import googleIcon from '../../assets/google.svg'
import gitIcon from '../../assets/github.png'
import { Link, useNavigate } from 'react-router-dom'
import { BsQuestionOctagonFill } from 'react-icons/bs'
import { FaTrophy } from 'react-icons/fa'
import { RiQuestionAnswerFill } from 'react-icons/ri'
import { AiTwotoneStar } from 'react-icons/ai'
import { useMutation } from 'react-query'
import axios from 'axios'
import validator from 'validator'

const Signup = () => {

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // validations 
    const [isEmailValid, setIsEmailValid] = useState(1);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(1);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [isDisplayNameValid, setIsDisplayNameValid] = useState(1);
    const [displayNameErrorMessage, setdisplayNameErrorMessage] = useState("");

    const navigate = useNavigate();


    const { mutate } = useMutation(
        async (data) => {
            await axios({
                method: 'post',
                url: '/api/v1/signup',
                data
            })
        },
        {
            onSuccess: () => {
                alert('Successfull')
                navigate('/login');
            },
            onError: (error) => {
                if (error.response.data.type === 'email') {
                    setIsEmailValid(0);
                    setEmailErrorMessage(error.response.data.message)
                }
            }
        }
    )



    const postDetails = () => {
        mutate({
            name: displayName,
            email: email,
            password: password
        })
    }


    const handleSubmit = (isBlurOrSubmit) => {

        if (displayName.length < 3 || !validator.isEmail(email) || !validator.isStrongPassword(password)) {
            if (displayName.length < 3) {
                console.log(isDisplayNameValid + "Asas");
                setIsDisplayNameValid(0);
                if (displayName === "")
                    setdisplayNameErrorMessage("Display Name can not be empty.")
                else
                    setdisplayNameErrorMessage(`Display Name must be at least 3 characters`);
            } else {
                setIsDisplayNameValid(1);
            }

            if (!validator.isEmail(email)) {
                setIsEmailValid(0);
                if (email === "")
                    setEmailErrorMessage("Email can not be empty.")
                else
                    setEmailErrorMessage(`${email} is not a valid email address.`);
            } else {
                setIsEmailValid(1);
            }

            if (!validator.isStrongPassword(password)) {
                setIsPasswordValid(0);
                if (password === "")
                    setPasswordErrorMessage("Password can not be empty.")
                else
                    setPasswordErrorMessage(`Password is should contain below requirements.`);
            } else {
                setIsPasswordValid(1);
            }
        } else {

            setIsDisplayNameValid(1);
            setIsEmailValid(1);
            setIsPasswordValid(1);

            if (isBlurOrSubmit === "submit")
                postDetails();
        }

    }

    const handleInputBlur = () => {
        if (!isEmailValid || !isPasswordValid || !isDisplayNameValid) {
            handleSubmit('blur');
        }
    }

    return (
        <>
            <div className='signup-right-header'>
                Create your Code Query account. It’s free and only takes a minute.
            </div>
            <div className='signup-wrapper'>
                <div className="signup-left">
                    <div className='signup-left-1'>Welcome your query to codeQuery</div>
                    <div className='signup-left-2'>
                        <BsQuestionOctagonFill color="#4e9afc" />
                        <div>
                            Getting stuck ask a question
                        </div>
                    </div>
                    <div className='signup-left-2'>
                        <RiQuestionAnswerFill color="#4e9afc" />
                        <div>
                            Hurrah! you know , post answer
                        </div>
                    </div>
                    <div className='signup-left-2'>
                        <FaTrophy color="#4e9afc" />
                        <div>
                            Earn reputation
                        </div>
                    </div>
                    <div className='signup-left-2'>
                        <AiTwotoneStar color="#4e9afc" />
                        <div>
                            Post your knowledge here
                        </div>
                    </div>
                </div>
                <div className='signup-right'>

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


                    {/* register fields  */}
                    <div className='register-fields'>
                        <div className='register-field-wrap register-flex'>
                            <div className='register-field-wrap-item'>
                                <div className='register-label-row'>
                                    <label htmlFor="name">Display Name</label>
                                </div>
                                <input
                                    className={!isDisplayNameValid ? 'register-field-input register-field-input-RB' : 'register-field-input'}
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    type="text"
                                    name=""
                                    id="name"
                                    onBlur={() => handleInputBlur()} />
                                {!isDisplayNameValid ? (<div
                                    className='error-message'>
                                    {displayNameErrorMessage}
                                </div>) : null}
                            </div>
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
                            <div className='register-field-wrap-item signup-password-input
                            '>
                                <div className='register-label-row'>
                                    <label htmlFor="password">Password</label>
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
                                className='register-submit-button btn'
                            >
                                Sign up
                            </div>
                            <div className='signup-submit-button'>
                                By clicking “Sign up”, you agree to
                                <span> our terms of service</span>,
                                <span> privacy policy </span>
                                and
                                <span> cookie policy</span>
                            </div>
                        </div>
                    </div>

                    {/* bottom info and links  */}
                    <div className='register-bottom-links'>
                        <div>Don’t have an account?</div>
                        <Link to='/login'>
                            <pre>  Log in</pre>
                        </Link>
                    </div>

                </div>
            </div >
        </>
    )
}

export default Signup