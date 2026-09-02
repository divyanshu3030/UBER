import React from 'react'
import { IoLocation } from 'react-icons/io5'
import { MdMyLocation, MdPayment } from 'react-icons/md'
import { RiArrowDownWideFill } from 'react-icons/ri'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {

    const navigate = useNavigate()


    // =========================
    // END RIDE
    // =========================

    async function endRide() {

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
                {
                    rideId: props.ride?._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if (response.status === 200) {
                navigate('/captain-home')
            }

        } catch (error) {

            console.log(
                'END RIDE ERROR:',
                error.response?.data || error.message
            )

        }
    }


    return (

        <div className='w-full'>


            {/* =========================
                CLOSE BUTTON
            ========================= */}

            <button
                onClick={() => {
                    props.setFinishRidePanel(false)
                }}
                className='w-full flex justify-center text-3xl text-gray-400 cursor-pointer p-1 mb-4'
            >
                <RiArrowDownWideFill />
            </button>


            {/* =========================
                TITLE
            ========================= */}

            <h3 className='text-2xl font-semibold mb-5'>
                Finish this Ride...
            </h3>


            {/* =========================
                USER
            ========================= */}

            <div className='flex justify-between items-center p-2 mb-1 border-2 border-yellow-400 rounded-lg w-full'>

                <div className='flex items-center gap-3 min-w-0'>

                    <img
                        className='h-12 w-12 rounded-full object-cover flex-shrink-0'
                        src='thor.jpg's
                        alt=''
                    />

                    <h2 className='text-xl font-semibold truncate'>
                        {props.ride?.user?.fullname?.firstname}
                    </h2>

                </div>

                <h5 className='text-lg font-semibold ml-3 flex-shrink-0'>
                    2.2 KM
                </h5>

            </div>


            {/* =========================
                RIDE DETAILS
            ========================= */}

            <div className='w-full'>


                {/* PICKUP */}

                <div className='flex items-start gap-5 p-4 border-b-2 border-gray-300'>

                    <MdMyLocation className='text-xl flex-shrink-0 mt-1' />

                    <div className='min-w-0 flex-1'>

                        <h3 className='text-lg font-medium'>
                            Pickup
                        </h3>

                        <p className='text-sm mt-1 text-gray-600 break-words'>
                            {props.ride?.pickup}
                        </p>

                    </div>

                </div>


                {/* DESTINATION */}

                <div className='flex items-start gap-5 p-4 border-b-2 border-gray-300'>

                    <IoLocation className='text-xl flex-shrink-0 mt-1' />

                    <div className='min-w-0 flex-1'>

                        <h3 className='text-lg font-medium'>
                            Destination
                        </h3>

                        <p className='text-sm mt-1 text-gray-600 break-words'>
                            {props.ride?.destination}
                        </p>

                    </div>

                </div>


                {/* PAYMENT */}

                <div className='flex items-start gap-5 p-4'>

                    <MdPayment className='text-xl flex-shrink-0 mt-1' />

                    <div>

                        <h3 className='text-lg font-medium'>
                            ₹{props.ride?.fare}
                        </h3>

                        <p className='text-sm mt-1 text-gray-600'>
                            Cash
                        </p>

                    </div>

                </div>

            </div>


            {/* =========================
                FINISH RIDE
            ========================= */}

            <div className='mt-8 w-full'>

                <button
                    onClick={endRide}
                    className='w-full bg-green-600 text-white text-lg font-semibold p-3 rounded-lg'
                >
                    Finish Ride
                </button>

                <p className='text-center text-gray-600 mt-4 px-2'>
                    Click on finish button if you have completed the payment
                </p>

            </div>


            {/* EXTRA SPACE FOR SCROLL */}

            <div className='h-32'></div>


        </div>
    )
}

export default FinishRide