import React, { useState } from 'react'
import { IoLocation } from 'react-icons/io5';
import { MdMyLocation, MdPayment } from 'react-icons/md';
import { RiArrowDownWideFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
                null,
                {
                    params: {
                        rideId: props.ride._id,
                        otp: otp
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.status === 200) {
                props.setConfirmRidePopUpPanel(false);
                props.setRidePopUpPanel(false);
                navigate('/captain-riding', { state: { ride: props.ride } });
            }

        } catch (error) {
            console.log(
                "START RIDE ERROR:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div>
            <h3 onClick={() => {
                props.setConfirmRidePopUpPanel(false);
            }}
                className='p-1 flex justify-center  font-bold w-[93%] absolute top-0 text-3xl text-gray-400'>
                <RiArrowDownWideFill />
            </h3>
            <h3 className='text-2xl font-semibold mb-2'>Confirm this Ride to Start...</h3>

            <div className='flex justify-between items-center p-2 mt-5 mb-2 bg-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src='thor.jpg' alt='' />
                    <h2 className='text-xl font-semibold capitalize'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>


                <div className='w-full'>

                    <div className='flex flex-row items-center gap-5 p-3 border-b-2 border-gray-300'>
                        <MdMyLocation className='text-lg ' />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-am -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>

                    <div className='flex flex-row items-center gap-5 p-3 border-b-2 border-gray-300'>
                        <IoLocation className='text-lg ' />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-am -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>

                    <div className='flex flex-row items-center gap-5 p-3'>
                        <MdPayment className='text-lg ' />
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-am -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>


                <div className='mt-6 w-full'>
                    <form onSubmit={submitHandler}>

                        <input
                            value={otp}
                            onChange={(e) => {
                                setOtp(e.target.value);
                            }}
                            type='text'
                            placeholder='Enter OTP'
                            className="w-full bg-[#eee] py-3 px-4 pl-8 pr-2 text-xl rounded-lg font-mono"
                        />
                        <button className='w-full text-lg mt-2 flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'> Confirm</button>

                        <button
                            typr='button'
                            onClick={() => {
                                props.setConfirmRidePopUpPanel(false);
                                props.setRidePopUpPanel(false);
                            }} className='w-full mt-2 bg-red-700 text-lg  text-white font-bold p-3 rounded-lg'>Cancel</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default ConfirmRidePopUp