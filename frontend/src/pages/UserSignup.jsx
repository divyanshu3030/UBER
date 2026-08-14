import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserDataContext)

    const submitHandler = async (e) => {
        e.preventDefault()
        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

        if(response.status === 201) {
            const data = response.data

            setUser(data.user)
            localStorage.setItem('token', data.token)

            navigate('/home')
        }


        setEmail('')
        setFirstName('')
        setLastName('')
        setPassword('')
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-12' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='' />
                <form onSubmit={(e) => {
                    submitHandler(e)
                }}>

                    <h3 className='text-lg mb-2 font-medium'>What's your name</h3>
                    <div className='flex gap-4 mb-6'>
                        <input
                            required
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg'
                            type='text'
                            placeholder='First name...'
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />

                        <input
                            required
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg'
                            type='text'
                            placeholder='Last name...'
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />

                    </div>

                    <h3 className='text-lg mb-2 font-medium'>What's your email</h3>

                    <input
                        required
                        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg'
                        type='email'
                        placeholder='email@example.com'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />

                    <h3 className='text-lg mb-2 font-medium'>Enter Password</h3>

                    <input
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg'
                        type='password'
                        placeholder='password'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />

                    <button className='bg-[#111] text-white mb-3 rounded px-4 py-2 w-full text-lg font-semibold'>Create Account</button>

                </form>
                <p className='text-center font-semibold'>Already have a account? <Link to='/login' className='text-blue-600'>Login here...</Link></p>
            </div>

            <div>
                <p className='text-[10px] leading-tight text-gray-600'>Create your Uber account and start riding today.
                    Join millions of riders who rely on Uber for safe,
                    convenient, and affordable transportation.
                    Sign up in just a few steps to enjoy doorstep pickups, reliable rides, and multiple travel options—including
                    Uber Moto, Uber Auto, and Cabs. Wherever you're headed, Uber makes getting there simple with just a few taps.
                </p>
            </div>
        </div>
    )
}

export default UserSignup