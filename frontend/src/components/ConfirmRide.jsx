import React from 'react'
import { RiArrowDownWideFill } from 'react-icons/ri'
import { IoLocation } from "react-icons/io5";
import { MdMyLocation, MdPayment } from 'react-icons/md';


const ConfirmRide = (props) => {
    return (
        <div>
            
            <h3 onClick={() => {
                props.setConfirmRidePanel(false)
            }}
                className='p-1 flex justify-center  font-bold w-[93%] absolute top-0 text-3xl text-gray-400'>
                <RiArrowDownWideFill />
            </h3>
            <h3 className='text-2xl font-semibold mb-2'>Confirm your Ride.</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-40' src='carr.png' alt='' />

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


                <button onClick={() => {
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                }} className='w-full mt-2 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>

        </div>
    )
}

export default ConfirmRide