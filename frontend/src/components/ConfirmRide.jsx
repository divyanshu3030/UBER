import React from 'react'
import { RiArrowDownWideFill } from 'react-icons/ri'
import { IoLocation } from "react-icons/io5";
import { MdMyLocation, MdPayment } from 'react-icons/md';


const ConfirmRide = (props) => {

    const vehicleImages = {
        car: '/carr.png',
        moto: '/bike.png',
        auto: '/auto.png'
    }

    return (
        <div>

            <h3 onClick={() => {
                props.setConfirmRidePanel(false)
            }}
                className='p-1 flex justify-center font-bold w-[93%] absolute top-0 text-3xl text-gray-400'>
                <RiArrowDownWideFill />
            </h3>
            <h3 className='text-2xl font-semibold mb-1'>Confirm your Ride.</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-30' src={vehicleImages[props.vehicleType]} alt='' />

                <div className='w-full'>

                    <div className='flex flex-row items-center gap-5 p-2 border-b-2 border-gray-300'>
                        <MdMyLocation className='text-4xl font-bold ' />
                        <div>
                            <h3 className='text-sm font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>

                    <div className='flex flex-row items-center gap-5 p-3 border-b-2 border-gray-300'>
                        <IoLocation className='text-2xl ' />
                        <div>
                            <h3 className='text-sm font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                        </div>
                    </div>

                    <div className='flex flex-row items-center gap-5 p-3'>
                        <MdPayment className='text-lg ' />
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
                            <p className='text-am -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>


                <button onClick={() => {
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                    props.createRide()
                }} className='w-full mt-2 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>

        </div>
    )
}

export default ConfirmRide