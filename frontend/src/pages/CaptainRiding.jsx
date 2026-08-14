import React, { useRef, useState } from 'react'
import { LuLogOut } from 'react-icons/lu'
import { RiArrowUpWideFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])

    return (
        <div className='h-screen'>
            <div className='fixed p-5 top-0 flex items-center justify-between w-full'>
                <img className='w-16 ' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='' />
                <Link to='/home' className='h-9 w-9 bg-white flex items-center justify-center rounded-full'>
                    <LuLogOut className='text-lg font-medium' />
                </Link>
            </div>
            <div className='h-4/5 w-screen'>
                <img className="h-full w-full object-cover" src='map.png' alt='' />
            </div>
            <div className='h-1/5 w-screen p-6 flex items-center justify-between relative border-8 border-yellow-300 bg-yellow-200'
                onClick={() => {
                    setFinishRidePanel(true)
                }}>

                <h3 onClick={() => {

                }}
                    className='absolute top-2 left-1/2 -translate-x-1/2 text-3xl text-gray-400'>
                    <RiArrowUpWideFill />
                </h3>


                <h4 className='text-xl font-semibold'>4 Km away</h4>
                <button className=' bg-green-600 text-lg text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
            </div>

            <div ref={finishRidePanelRef} className='fixed w-full  z-10 bottom-0 translate-y-full bg-white px-4 py-8 pt-12'>
                <FinishRide setFinishRidePanel={setFinishRidePanel} />
            </div>

        </div>
    )
}

export default CaptainRiding