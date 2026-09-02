import React, { useRef, useState, } from 'react'
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
import { useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import LiveTracking from "../components/LiveTracking";

export const CaptainHome = () => {

    const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
    const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)

    const ridePopUpPanelRef = useRef(null)
    const confirmRidePopUpPanelRef = useRef(null)
    const [ride, setRide] = useState(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)


    useEffect(() => {

        const joinCaptain = () => {

            console.log("🟢 SOCKET CONNECTED:", socket.id);

            socket.emit('join', {
                userId: captain._id,
                userType: 'captain'
            });
        };

        if (socket.connected) {
            joinCaptain();
        }

        socket.on('connect', joinCaptain);

        const handleNewRide = (data) => {
            console.log("🔥 NEW RIDE RECEIVED:", data);

            setRide(data);
            setRidePopUpPanel(true);
        };

        socket.on('new-ride', handleNewRide);

        return () => {
            socket.off('connect', joinCaptain);
            socket.off('new-ride', handleNewRide);
        };

    }, [socket, captain._id]);

    useEffect(() => {

    if (!captain?._id) return;

    const updateCaptainLocation = () => {

        if (!navigator.geolocation) {
            console.log("Geolocation is not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const location = {
                    ltd: position.coords.latitude,
                    lng: position.coords.longitude
                };

                console.log(
                    "CAPTAIN LOCATION:",
                    location
                );

                socket.emit(
                    "update-location-captain",
                    {
                        userId: captain._id,
                        location: location
                    }
                );

            },

            (error) => {

                console.log(
                    "CAPTAIN LOCATION ERROR:",
                    error.message
                );

            },

            {
                enableHighAccuracy: true
            }
        );

    };

    // First time immediately
    updateCaptainLocation();

    // Every 5 seconds
    const interval = setInterval(
        updateCaptainLocation,
        5000
    );

    return () => {
        clearInterval(interval);
    };

}, [socket, captain?._id]);

    async function confirmRide() {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
                {
                    rideId: ride._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.status === 200) {
                setRidePopUpPanel(false);
                setConfirmRidePopUpPanel(true);
            }
        } catch (error) {
            console.log("CONFIRM RIDE ERROR:", error.response?.data || error.message);
        }
    }

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
        <div className="h-screen relative overflow-hidden">

            {/* Header */}
            <div className="fixed p-5 top-0 left-0 flex items-center justify-between w-full z-20">
                <img
                    className="w-16"
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt="Uber"
                />

                <Link
                    to="/home"
                    className="h-9 w-9 bg-white flex items-center justify-center rounded-full"
                >
                    <LuLogOut className="text-lg font-medium" />
                </Link>
            </div>


            {/* Map */}
            <div className="absolute top-0 left-0 w-full h-[62%] z-0">
                <LiveTracking
                    pickup={ride?.pickupCoordinates}
                    destination={ride?.destinationCoordinates}
                />
            </div>


            {/* Captain Details */}
            <div className="absolute bottom-0 left-0 w-full h-[38%] bg-white p-6 z-10">
                <CaptainDetails />
            </div>


            {/* Ride Popup */}
            <div
                ref={ridePopUpPanelRef}
                className="fixed w-full z-30 bottom-0 translate-y-full bg-white px-4 py-8 pt-12"
            >
                <RidePopUp
                    ride={ride}
                    setRidePopUpPanel={setRidePopUpPanel}
                    setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
                    confirmRide={confirmRide}
                />
            </div>


            {/* Confirm Ride Popup */}
            {confirmRidePopUpPanel && (
                <div
                    ref={confirmRidePopUpPanelRef}
                    className="fixed w-full z-40 bottom-0 translate-y-full bg-white px-4 py-8 pt-12"
                >
                    <ConfirmRidePopUp
                        ride={ride}
                        setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
                        setRidePopUpPanel={setRidePopUpPanel}
                    />
                </div>
            )}

        </div>
    );
}

export default CaptainHome