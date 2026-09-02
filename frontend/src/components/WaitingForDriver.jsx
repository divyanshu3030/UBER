import React from 'react'
import { IoLocation } from 'react-icons/io5'
import { MdMyLocation, MdPayment } from 'react-icons/md'
import { RiArrowDownWideFill } from 'react-icons/ri'

const WaitingForDriver = (props) => {
    return (
        <div>
            <h3 onClick={() => {
                props.waitingForDriver(false)
            }}
                className='p-1 flex justify-center  font-bold w-[93%] absolute top-0 text-3xl text-gray-400'>
                <RiArrowDownWideFill />
            </h3>

            <div className='flex items-center justify-between'>
                <img className='h-20' src='carr.png' alt='' />
                <div className='text-right'>
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
                    <p className='text-sm text-gray-600'>BMW M8</p>
                    <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
                </div>
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
            </div>

        </div>
    )
}

export default WaitingForDriver