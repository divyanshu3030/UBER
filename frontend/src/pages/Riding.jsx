import React, { useContext, useEffect } from 'react';
import { IoHome, IoLocation } from 'react-icons/io5';
import { MdPayment } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { SocketContext } from '../context/SocketContext';
import LiveTracking from '../components/LiveTracking';

const Riding = () => {

    const location = useLocation();
    const { ride } = location.state || {};

    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();

    useEffect(() => {

        const handleRideEnded = () => {
            navigate('/home');
        };

        socket.on("ride-ended", handleRideEnded);

        return () => {
            socket.off("ride-ended", handleRideEnded);
        };

    }, [socket, navigate]);

    return (
        <div className="h-screen relative overflow-hidden">

            <Link
                to="/home"
                className="fixed right-2 top-2 h-9 w-9 bg-white flex items-center justify-center rounded-full z-20"
            >
                <IoHome className="text-lg font-medium" />
            </Link>

            <div className="absolute top-0 left-0 w-full h-[62%] z-0">

                <LiveTracking
                    pickup={ride?.pickupCoordinates}
                    destination={ride?.destinationCoordinates}
                />

            </div>

            <div className="absolute bottom-0 left-0 w-full h-[38%] bg-white p-4 z-10 overflow-auto">

                <div className="flex items-center justify-between">

                    <img
                        className="h-20"
                        src="carr.png"
                        alt="Car"
                    />

                    <div className="text-right">

                        <h2 className="text-lg font-medium capitalize">
                            {ride?.captain?.fullname?.firstname}
                        </h2>

                        <h4 className="text-xl font-semibold -mt-1 -mb-1">
                            {ride?.captain?.vehicle?.plate}
                        </h4>

                        <p className="text-sm text-gray-600">
                            {ride?.captain?.vehicle?.vehicleType || "Car"}
                        </p>

                    </div>

                </div>

                <div className="flex gap-2 justify-between flex-col items-center mt-2">

                    <div className="w-full">

                        <div className="flex flex-row items-center gap-5 p-3 border-b-2 border-gray-300">

                            <IoLocation className="text-lg" />

                            <div>

                                <h3 className="text-lg font-medium">
                                    Destination
                                </h3>

                                <p className="text-sm -mt-1 text-gray-600">
                                    {ride?.destination}
                                </p>

                            </div>

                        </div>

                        <div className="flex flex-row items-center gap-5 p-3">

                            <MdPayment className="text-lg" />

                            <div>

                                <h3 className="text-lg font-medium">
                                    ₹{ride?.fare}
                                </h3>

                                <p className="text-sm -mt-1 text-gray-600">
                                    Cash
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <button
                    className="w-full mt-2 bg-green-600 text-white font-semibold p-2 rounded-lg"
                >
                    Make a Payment
                </button>

            </div>

        </div>
    );
};

export default Riding;