import React, { useRef, useState } from 'react'
import { IoLocation, IoTimerOutline } from 'react-icons/io5'
import { MdPayment, MdSpeakerNotes } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { LuLogOut } from "react-icons/lu";
import { IoMdSpeedometer } from "react-icons/io";
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

export const CaptainHome = () => {

    const [ridePopUpPanel, setRidePopUpPanel] = useState(true)
    const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)

    const ridePopUpPanelRef = useRef(null)
    const confirmRidePopUpPanelRef = useRef(null)

    useGSAP(function () {
            if (ridePopUpPanel) {
                gsap.to(ridePopUpPanelRef.current, {
                    transform: 'translateY(0)'
                })
            } else {
                gsap.to(ridePopUpPanelRef.current, {
                    transform: 'translateY(100%)'
                })
            }
        }, [ridePopUpPanel])

        useGSAP(function () {
            if (confirmRidePopUpPanel) {
                gsap.to(confirmRidePopUpPanelRef.current, {
                    transform: 'translateY(0)'
                })
            } else {
                gsap.to(confirmRidePopUpPanelRef.current, {
                    transform: 'translateY(100%)'
                })
            }
        }, [confirmRidePopUpPanel])
    

    return (
        <div className='h-screen'>
            <div className='fixed p-5 top-0 flex items-center justify-between w-full'>
                <img className='w-16 ' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='' />
                <Link to='/home' className='h-9 w-9 bg-white flex items-center justify-center rounded-full'>
                    <LuLogOut className='text-lg font-medium' />
                </Link>
            </div>
            <div className='h-3/5 w-screen'>
                <img className="h-full w-full object-cover" src='map.png' alt='' />
            </div>
            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>

            <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-4 py-8 pt-12'>
                <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
            </div>

            <div ref={confirmRidePopUpPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-4 py-8 pt-12'>
                <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} />
            </div>

        </div>
    )
}

export default CaptainHome