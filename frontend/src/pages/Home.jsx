import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FaTruckPickup } from 'react-icons/fa';
import { FaMapLocationDot } from 'react-icons/fa6';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RiArrowDownWideFill } from 'react-icons/ri';

import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import WaitingForDriver from '../components/WaitingForDriver';
import LookingForDriver from '../components/LookingForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from "../components/LiveTracking";

const Home = () => {

    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');

    const [panelOpen, setPanelOpen] = useState(false);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);

    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);

    const [activeField, setActiveField] = useState(null);

    const [fare, setFare] = useState({});
    const [vehicleType, setVehicleType] = useState(null);
    const [ride, setRide] = useState(null);

    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    const navigate = useNavigate()

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })

    }, [user]);

    useEffect(() => {
        if (!socket) return;

        const handleRideConfirmed = (ride) => {
            console.log("🚗 RIDE CONFIRMED:", ride);

            setRide(ride);
            setVehicleFound(false);
            setWaitingForDriver(true);
        };

        const handleRideStarted = (ride) => {
            setWaitingForDriver(false);
            navigate('/riding', { state: { ride } });
        };

        socket.on("ride-confirmed", handleRideConfirmed);
        socket.on("ride-started", handleRideStarted);

        return () => {
            socket.off("ride-confirmed", handleRideConfirmed);
            socket.off("ride-started", handleRideStarted);
        };
    }, [socket, navigate]);

    const panelRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    const panelCloseRef = useRef(null);



    // =========================================
    // PICKUP SUGGESTIONS WITH DEBOUNCE
    // =========================================

    useEffect(() => {

        const value = pickup.trim();

        // 3 characters se kam -> suggestions clear
        if (value.length < 3) {
            setPickupSuggestions([]);
            return;
        }

        // 1 second wait
        const timer = setTimeout(async () => {

            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
                    {
                        params: {
                            input: value
                        },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                console.log("Pickup suggestions:", response.data);

                setPickupSuggestions(response.data);

            } catch (error) {

                console.error(
                    "Pickup suggestion error:",
                    error.response?.data || error.message
                );

                setPickupSuggestions([]);
            }

        }, 1500);

        // Agar user dobara type kare
        // to purana timer cancel ho jayega
        return () => clearTimeout(timer);

    }, [pickup]);


    // =========================================
    // DESTINATION SUGGESTIONS WITH DEBOUNCE
    // =========================================

    useEffect(() => {

        const value = destination.trim();

        // 3 characters se kam -> suggestions clear
        if (value.length < 3) {
            setDestinationSuggestions([]);
            return;
        }

        // 1 second wait
        const timer = setTimeout(async () => {

            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
                    {
                        params: {
                            input: value
                        },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                console.log(
                    "Destination suggestions:",
                    response.data
                );

                setDestinationSuggestions(response.data);

            } catch (error) {

                console.error(
                    "Destination suggestion error:",
                    error.response?.data || error.message
                );

                setDestinationSuggestions([]);
            }

        }, 1500);

        return () => clearTimeout(timer);

    }, [destination]);


    // =========================================
    // PICKUP CHANGE
    // =========================================

    const handlePickupChange = (e) => {

        const value = e.target.value;

        setPickup(value);
        setActiveField('pickup');
        setPanelOpen(true);

    };


    // =========================================
    // DESTINATION CHANGE
    // =========================================

    const handleDestinationChange = (e) => {

        const value = e.target.value;

        setDestination(value);
        setActiveField('destination');
        setPanelOpen(true);

    };


    // =========================================
    // FORM SUBMIT
    // =========================================

    const submitHandler = (e) => {

        e.preventDefault();

        console.log('Pickup:', pickup);
        console.log('Destination:', destination);

    };


    // =========================================
    // SELECT PICKUP
    // =========================================

    const handlePickupSelect = (suggestion) => {

        setPickup(
            suggestion.description ||
            suggestion.address ||
            suggestion
        );

        setPickupSuggestions([]);
        setPanelOpen(true);

    };


    // =========================================
    // SELECT DESTINATION
    // =========================================

    const handleDestinationSelect = (suggestion) => {

        setDestination(
            suggestion.description ||
            suggestion.address ||
            suggestion
        );

        setDestinationSuggestions([]);
        setPanelOpen(true);

    };


    // =========================================
    // MAIN SEARCH PANEL
    // =========================================

    useGSAP(() => {

        if (panelOpen) {

            gsap.to(panelRef.current, {
                height: '100%',
                padding: 24
            });

            gsap.to(panelCloseRef.current, {
                opacity: 1
            });

        } else {

            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0,
            });

            gsap.to(panelCloseRef.current, {
                opacity: 0
            });

        }

    }, [panelOpen]);


    // =========================================
    // VEHICLE PANEL
    // =========================================

    useGSAP(() => {

        if (vehiclePanel) {

            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            });

        } else {

            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            });

        }

    }, [vehiclePanel]);


    // =========================================
    // CONFIRM RIDE PANEL
    // =========================================

    useGSAP(() => {

        if (confirmRidePanel) {

            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            });

        } else {

            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            });

        }

    }, [confirmRidePanel]);


    // =========================================
    // VEHICLE FOUND
    // =========================================

    useGSAP(() => {

        if (vehicleFound) {

            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            });

        } else {

            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            });

        }

    }, [vehicleFound]);


    // =========================================
    // WAITING FOR DRIVER
    // =========================================

    useGSAP(() => {

        if (waitingForDriver) {

            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            });

        } else {

            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            });

        }

    }, [waitingForDriver]);

    const findTrip = async () => {
        try {
            setVehiclePanel(true);
            setPanelOpen(false);

            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
                {
                    params: {
                        pickup,
                        destination
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            console.log("Fare response:", response.data);
            setFare(response.data)

        } catch (error) {
            console.error(
                "Find Trip Error:",
                error.response?.data || error.message
            );
        }
    };

    async function createRide() {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/create`,
                {
                    pickup,
                    destination,
                    vehicleType
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            console.log("CREATE RIDE RESPONSE:", response.data);

        } catch (error) {
            console.log("CREATE RIDE ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("BACKEND ERROR:", error.response?.data);
        }
    }


    return (
        <div className="h-screen relative overflow-hidden">

            {/* Uber Logo */}
            <img
                className="w-16 absolute left-5 top-5"
                src="uberHome.webp"
                alt=""
            />


            {/* Map */}

            <div className="absolute top-0 left-0 w-full h-[62%] z-0">

                <LiveTracking
                    pickup={ride?.pickupCoordinates}
                    destination={ride?.destinationCoordinates}
                />

            </div>


            {/* Bottom Search Section */}

            <div className="flex flex-col justify-end absolute top-0 w-full h-screen z-10 pointer-events-none">

                <div className="h-[38%] p-6 bg-white relative pointer-events-auto">

                    {/* Close Button */}

                    <h3
                        ref={panelCloseRef}
                        onClick={() => {
                            setPanelOpen(false);
                        }}
                        className="absolute opacity-0 right-7 text-3xl font-bold text-gray-400 cursor-pointer"
                    >
                        <RiArrowDownWideFill />
                    </h3>


                    <h4 className="text-2xl font-semibold">
                        Find a trip
                    </h4>


                    <form onSubmit={submitHandler}>

                        {/* Pickup */}

                        <div className="relative mt-5">

                            <FaTruckPickup
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 text-lg"
                            />

                            <input
                                onClick={() => {
                                    setPanelOpen(true);
                                    setActiveField('pickup');
                                }}
                                value={pickup}
                                onChange={handlePickupChange}
                                type="text"
                                placeholder="Add a pick-up location"
                                className="w-full bg-[#eee] py-2 pl-10 pr-3 text-lg rounded-lg"
                            />

                        </div>


                        {/* Destination */}

                        <div className="relative mt-5">

                            <FaMapLocationDot
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 text-lg"
                            />

                            <input
                                onClick={() => {
                                    setPanelOpen(true);
                                    setActiveField('destination');
                                }}
                                value={destination}
                                onChange={handleDestinationChange}
                                type="text"
                                placeholder="Enter your destination"
                                className="w-full bg-[#eee] py-2 pl-10 pr-3 text-lg rounded-lg"
                            />

                        </div>

                    </form>
                    <button
                        onClick={findTrip}
                        className='w-full mt-3 flex justify-center items-center bg-black text-white text-lg font-semibold p-2 rounded-lg'>
                        Find Trip
                    </button>

                </div>


                {/* Location Search Panel */}

                <div
                    ref={panelRef}
                    className="h-0 bg-white overflow-hidden pointer-events-auto"
                >

                    <LocationSearchPanel
                        suggestions={
                            activeField === 'pickup'
                                ? pickupSuggestions
                                : destinationSuggestions
                        }

                        activeField={activeField}

                        setPickup={handlePickupSelect}
                        setDestination={handleDestinationSelect}

                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                    />

                </div>

            </div>


            {/* Vehicle Panel */}

            <div
                ref={vehiclePanelRef}
                className="fixed w-full z-10 bottom-0 bg-white px-4 py-8 pt-12 translate-y-full"
            >

                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />

            </div>


            {/* Confirm Ride */}

            <div
                ref={confirmRidePanelRef}
                className="fixed w-full z-10 bottom-0 bg-white px-4 py-6 pt-10 translate-y-full h-100 overflow-auto"
            >

                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />

            </div>


            {/* Looking For Driver */}

            <div
                ref={vehicleFoundRef}
                className="fixed w-full z-10 bottom-0 bg-white px-4 py-6 pt-10 translate-y-full h-100 overflow-auto"
            >

                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />

            </div>


            {/* Waiting For Driver */}

            <div
                ref={waitingForDriverRef}
                className="fixed w-full z-10 bottom-0 bg-white px-4 py-6 pt-12 translate-y-full"
            >

                <WaitingForDriver
                    waitingForDriver={setWaitingForDriver}
                    ride={ride}
                />

            </div>

        </div>
    );
};

export default Home;