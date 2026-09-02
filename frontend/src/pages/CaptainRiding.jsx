import React, { useRef, useState } from 'react'
import { LuLogOut } from 'react-icons/lu'
import { RiArrowUpWideFill } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)

    const finishRidePanelRef = useRef(null)

    const location = useLocation()
    const rideData = location.state?.ride


    // =========================
    // GSAP
    // =========================

    useGSAP(() => {

        if (finishRidePanel) {

            gsap.to(finishRidePanelRef.current, {
                y: '0%',
                duration: 0.4,
                ease: 'power2.out'
            })

        } else {

            gsap.to(finishRidePanelRef.current, {
                y: '100%',
                duration: 0.4,
                ease: 'power2.in'
            })

        }

    }, [finishRidePanel])


    return (
        <div className='fixed inset-0 w-full h-screen overflow-hidden bg-white'>


            {/* HEADER */}

            <div className='fixed p-5 top-0 left-0 flex items-center justify-between w-full z-50'>

                <img
                    className='w-16'
                    src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
                    alt=''
                />

                <Link
                    to='/home'
                    className='h-9 w-9 bg-white flex items-center justify-center rounded-full shadow'
                >
                    <LuLogOut className='text-lg font-medium' />
                </Link>

            </div>


            {/* MAP */}

            <div className='absolute top-0 left-0 w-full h-[50%]'>

                <LiveTracking
                    pickup={{
                        ltd: 30.2680182,
                        lng: 77.9961185
                    }}
                    destination={{
                        ltd: 30.3165,
                        lng: 78.0322
                    }}
                />

            </div>


            {/* BOTTOM SECTION */}

            <div
                className='absolute bottom-0 left-0 w-full h-[50%] p-6 flex flex-col justify-center border-8 border-yellow-300 bg-yellow-200 z-10'
                onClick={() => setFinishRidePanel(true)}
            >
                <h3 className='absolute top-2 left-1/2 -translate-x-1/2 text-3xl text-gray-400'>
                    <RiArrowUpWideFill />
                </h3>

                <h4 className='text-xl font-semibold'>
                    {rideData ? `Ride ID: ${rideData._id}` : ''}
                </h4>

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setFinishRidePanel(true)
                    }}
                    className='w-full bg-green-600 text-white text-lg font-semibold p-3 rounded-lg mt-4'
                >
                    Complete Ride
                </button>
            </div>


            {/* =========================
                FINISH RIDE PANEL
            ========================= */}

            <div
                ref={finishRidePanelRef}
                className='fixed bottom-0 left-0 w-full h-[50%] bg-white z-[100] translate-y-full rounded-t-2xl shadow-lg'
            >

                {/* SCROLLABLE CONTENT */}

                <div className='h-[100%] w-full overflow-y-auto px-5 pt-4 pb-8'>

                    <FinishRide
                        ride={rideData}
                        setFinishRidePanel={setFinishRidePanel}
                    />

                </div>

            </div>


        </div>
    )
}

export default CaptainRiding