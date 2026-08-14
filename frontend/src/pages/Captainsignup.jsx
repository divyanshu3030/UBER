import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Captainsignup = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')

    const { captain, setCaptain } = React.useContext(CaptainDataContext)

    const submitHandler = async (e) => {

        e.preventDefault()
        const captainData = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        }

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData );

        if (response.status === 201) {
            const data = response.data
            setCaptain(data.captain)
            localStorage.setItem('token', data.token)
            navigate('/captain-home')
        }

        setEmail('')
        setFirstName('')
        setLastName('')
        setPassword('')
        setVehicleColor('')
        setVehicleCapacity('')
        setVehiclePlate('')
        setVehicleType('')
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-2' src='https://www.svgrepo.com/show/505031/uber-driver.svg' alt='' />
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

                    <h3 className='text-lg mb-2 font-medium'>Vehicle Information</h3>
                    <div className='flex gap-4 mb-6'>
                        <input
                            required
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg'
                            type='text'
                            placeholder='Vehicle Color..'
                            value={vehicleColor}
                            onChange={(e) => {
                                setVehicleColor(e.target.value)
                            }}
                        />

                        <input
                            required
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg'
                            type='text'
                            placeholder='Vehicle Plate..'
                            value={vehiclePlate}
                            onChange={(e) => {
                                setVehiclePlate(e.target.value)
                            }}
                        />
                    </div>
                    <div className='flex gap-4 mb-6'>
                        <input
                            required
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg'
                            type='number'
                            placeholder='Vehicle Capacity..'
                            value={vehicleCapacity}
                            onChange={(e) => {
                                setVehicleCapacity(e.target.value)
                            }}
                        />

                        <select
                            required
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg'
                            value={vehicleType}
                            onChange={(e) => {
                                setVehicleType(e.target.value)
                            }}
                        >
                            <option value="" disabled>Select Vehicle Type</option>
                            <option value="car">Car</option>
                            <option value="auto">Auto</option>
                            <option value="bike">Bike</option>
                        </select>
                    </div>

                    <button className='bg-[#111] text-white mb-3 rounded px-4 py-2 w-full text-lg font-semibold'>Create Captain Account</button>

                </form>
                <p className='text-center font-semibold mb-10'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here...</Link></p>
            </div>

            <div>
                <p className='text-[10px] leading-tight text-gray-600 mb-5'>Create your Captain account and start earning today.
                    Join Uber as a driver-partner to enjoy
                    flexible working hours, steady ride requests, and reliable earnings—all on your own schedule.

                </p>
            </div>
        </div>
    )
}

export default Captainsignup