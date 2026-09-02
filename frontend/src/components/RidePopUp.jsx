import React from 'react'
import { IoLocation } from 'react-icons/io5'
import { MdMyLocation, MdPayment } from 'react-icons/md'
import { RiArrowDownWideFill } from 'react-icons/ri'

const RidePopUp = (props) => {
    return (
        <div>
            <h3 onClick={() => {
                props.setRidePopUpPanel(false);
            }}
                className='p-1 flex justify-center  font-bold w-[93%] absolute top-0 text-3xl text-gray-400'>
                <RiArrowDownWideFill />
            </h3>
            <h3 className='text-2xl font-semibold mb-2'>New Ride Available!</h3>

            <div className='flex justify-between items-center p-2 mt-5 mb-2 bg-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src='thor.jpg' alt='' />
                    <h2 className='text-xl font-semibold'>
                        {props.ride?.user?.fullname?.firstname}{" "}
                        {props.ride?.user?.fullname?.lastname}
                    </h2>
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

                <div className='flex items-center justify-between mt-5 w-full'>

                    <button onClick={() => {
                        props.setRidePopUpPanel(false);
                    }} className='bg-gray-300 text-lg  text-gray-700 font-bold p-3 px-10 rounded-lg'>Ignore</button>

                    <button onClick={() => {
                        props.setConfirmRidePopUpPanel(true);
                        props.confirmRide()
                    }} className=' bg-green-600 text-lg  text-white font-semibold p-3 px-10 rounded-lg'>Accept</button>
                </div>

            </div>
        </div>
    )
}

export default RidePopUp