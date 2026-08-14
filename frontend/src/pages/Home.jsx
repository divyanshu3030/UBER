import React, { useRef, useState } from 'react'
import { FaTruckPickup, FaUser } from 'react-icons/fa'
import { FaMapLocationDot } from "react-icons/fa6"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { RiArrowDownWideFill } from "react-icons/ri";
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import WaitingForDriver from '../components/WaitingForDriver'
import LookingForDriver from '../components/LookingForDriver'


const Home = () => {

    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const panelRef = useRef(null)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)

    const panelCloseRef = useRef(null)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel ] = useState(false)
    const [vehicleFound, setVehicleFound ] = useState(false)
    const [waitingForDriver, setWaitingForDriver ] = useState(false)
    const [ pickupSuggestions, setPickupSuggestion ] = useState();

    

    const submitHandler = (e) => {
        e.preventDefault();
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
            })

            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
            })

            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelOpen])

    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanel])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePanel])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehicleFound])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [waitingForDriver])

    return (
        <div className='h-screen relative overflow-hidden'>
            <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='' />

            <div className='h-screen w-screen'>
                {/* image for temporary */}
                <img className="h-full w-full object-cover" src='map.png' alt='' />
            </div>

            <div className='flex flex-col justify-end absolute top-0 w-full h-screen'>
                <div className='h-[30%] p-6 bg-white relative'>

                    <h3 ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false)
                    }}
                        className='absolute opacity-0 right-7 top-7 text-2xl'>
                        <RiArrowDownWideFill />
                    </h3>

                    <h4 className='text-2xl  font-semibold'>Find a trip</h4>
                    <form onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <div className="relative mt-5">
                            <FaTruckPickup className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 text-lg" />

                            <input
                                onClick={() => {
                                    setPanelOpen(true)
                                }}
                                value={pickup}
                                onChange={(e) => {
                                    setPickup(e.target.value)
                                }}
                                type="text"
                                placeholder="Add a pick-up location"
                                className="w-full bg-[#eee] py-2 pl-10 pr-3 text-lg rounded-lg"
                            />
                        </div>

                        <div className="relative mt-5">

                            <FaMapLocationDot className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 text-lg" />
                            <input
                                onClick={() => {
                                    setPanelOpen(true)
                                }}
                                value={destination}
                                onChange={(e) => {
                                    setDestination(e.target.value)
                                }}
                                type="text"
                                placeholder="Enter your destination"
                                className="w-full bg-[#eee] py-2 pl-10 pr-3 text-lg rounded-lg"
                            />
                        </div>
                    </form>
                </div>

                <div ref={panelRef} className='h-0 bg-white'>
                    <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
                </div>
            </div>

            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-4 py-8 pt-12 translate-y-full'>
                <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
            </div>

            <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 bg-white px-4 py-6 pt-12 translate-y-full'>
                <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
            </div>

            <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 bg-white px-4 py-6 pt-12 translate-y-full'>
                <LookingForDriver setVehicleFound={setVehicleFound}/>
            </div>

            <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-4 py-6 pt-12 '>
                <WaitingForDriver waitingForDriver={waitingForDriver}/>
            </div>
        </div>
    )
}

export default Home