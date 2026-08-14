import React from 'react'
import { FaUser } from 'react-icons/fa'
import { RiArrowDownWideFill } from 'react-icons/ri'

const VehiclePanel = (props) => {
    return (
        <div>
            <h3 onClick={() => {
                props.setVehiclePanel(false)
            }}
                className='p-1 flex justify-center  font-bold w-[93%] absolute top-0 text-3xl text-gray-400'>
                <RiArrowDownWideFill />
            </h3>
            <h3 className='text-2xl font-semibold mb-6'>Choose a Vehicle.</h3>

            <div onClick = {()=> {
                props.setConfirmRidePanel(true)
            }}
            className='flex items-center w-full justify-between p-1 border-2 border-gray-200 active:border-black rounded-xl mb-2'>
                <img className='h-18 w-22' src='carr.png' alt='' />
                <div className='w-1/2 ml-2'>
                    <h4 className='h-7 font-medium text-base flex flex-row gap-2'>UberGo <span className='flex items-center gap-0.5 mb-1.5'><FaUser />4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>

                <h2 className='text-lg font-semibold p-2'>₹199.33</h2>
            </div>

            <div onClick = {()=> {
                props.setConfirmRidePanel(true)
            }}
             className='flex items-center w-full justify-between p-1 border-2 border-gray-200 active:border-black rounded-xl mb-2'>
                <img className='h-18 w-22' src='auto.png' alt='' />
                <div className='w-1/2 ml-2'>
                    <h4 className='h-7 font-medium text-base flex flex-row gap-2'>UberAuto <span className='flex items-center gap-0.5 mb-1.5'><FaUser />3</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
                </div>

                <h2 className='text-lg font-semibold p-2'>₹115.60</h2>
            </div>

            <div onClick = {()=> {
                props.setConfirmRidePanel(true)
            }}
            className='flex items-center w-full justify-between p-1 border-2 border-gray-200 active:border-black rounded-xl mb-2'>
                <img className='h-18 w-22' src='bike.png' alt='' />
                <div className='w-1/2 ml-2'>
                    <h4 className='h-7 font-medium text-base flex flex-row gap-2'>Moto <span className='flex items-center gap-0.5 mb-1.5'><FaUser />1</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
                </div>

                <h2 className='text-lg font-semibold p-2'>₹62.22</h2>
            </div>

        </div>
    )
}

export default VehiclePanel