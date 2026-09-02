import React from 'react'
import { IoLocation } from 'react-icons/io5'
import { MdMyLocation, MdPayment } from 'react-icons/md'
import { RiArrowDownWideFill } from 'react-icons/ri'

const LookingForDriver = (props) => {

    const vehicleImages = {
        car: '/carr.png',
        moto: '/bike.png',
        auto: '/auto.png'
    }

    return (
        <div>
            <h3 onClick={() => {
                props.setVehicleFound(false)
            }}
                className='p-1 flex justify-center  font-bold w-[93%] absolute top-0 text-3xl text-gray-400'>
                <RiArrowDownWideFill />
            </h3>
            <h3 className='text-2xl font-semibold mb-2'>Looking for a Driver..</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-40' src={vehicleImages[props.vehicleType]} alt='' />

                <div className='w-full'>

                    <div className='flex flex-row items-center gap-5 p-3 border-b-2 border-gray-300'>
                        <MdMyLocation className='text-lg ' />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-am -mt-1 text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>

                    <div className='flex flex-row items-center gap-5 p-3 border-b-2 border-gray-300'>
                        <IoLocation className='text-lg ' />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-am -mt-1 text-gray-600'>{props.destination}</p>
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
            </div>

        </div>
    )
}

export default LookingForDriver