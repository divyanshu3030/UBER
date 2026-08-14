import React from 'react'
import { IoLocation } from 'react-icons/io5';
import { MdMyLocation, MdPayment } from 'react-icons/md';
import { RiArrowDownWideFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const FinishRide = (props) => {
    return (
        <div>
            <h3 onClick={() => {
                props.setFinishRidePanel(false);
            }}
                className='p-1 flex justify-center  font-bold w-[93%] absolute top-0 text-3xl text-gray-400'>
                <RiArrowDownWideFill />
            </h3>
            <h3 className='text-2xl font-semibold mb-2'>Finish this Ride...</h3>

            <div className='flex justify-between items-center p-2 mt-5 mb-2 border-2 border-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src='thor.jpg' alt='' />
                    <h2 className='text-xl font-semibold'>Avengers</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>


                <div className='w-full'>

                    <div className='flex flex-row items-center gap-5 p-3 border-b-2 border-gray-300'>
                        <MdMyLocation className='text-lg ' />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-am -mt-1 text-gray-600'>shimla by pass dehradun</p>
                        </div>
                    </div>

                    <div className='flex flex-row items-center gap-5 p-3 border-b-2 border-gray-300'>
                        <IoLocation className='text-lg ' />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-am -mt-1 text-gray-600'>shimla by pass dehradun</p>
                        </div>
                    </div>

                    <div className='flex flex-row items-center gap-5 p-3'>
                        <MdPayment className='text-lg ' />
                        <div>
                            <h3 className='text-lg font-medium'>₹199.33</h3>
                            <p className='text-am -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>


                <div className='mt-6 w-full'>
                        <Link to='/captain-home' className='w-full mt-2 flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'> Finish Ride</Link>

                        <p className='text-center text-gray-600 mt-4'>Click on finish button if you have completed the payment</p>
                </div>

            </div>
        </div>
    )
}

export default FinishRide