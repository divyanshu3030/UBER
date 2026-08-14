import React from 'react'
import { IoHome, IoLocation } from 'react-icons/io5'
import { MdMyLocation, MdPayment } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Riding = () => {
    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 h-9 w-9 bg-white flex items-center justify-center rounded-full'>
                <IoHome className='text-lg font-medium' />
            </Link>
            <div className='h-1/2 w-screen'>
                <img className="h-full w-full object-cover" src='map.png' alt='' />
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-20' src='carr.png' alt='' />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>Divyanshu Negi</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>UK07 DD 0001</h4>
                        <p className='text-sm text-gray-600'>BMW M8</p>
                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>

                    <div className='w-full'>

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
                <button className='w-full mt-2 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>

        </div>
    )
}

export default Riding