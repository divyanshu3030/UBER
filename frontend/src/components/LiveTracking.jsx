import React, { useEffect } from "react";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import {
    useMap
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import markerIcon
    from "leaflet/dist/images/marker-icon.png";

import markerShadow
    from "leaflet/dist/images/marker-shadow.png";


const pickupIcon = L.icon({

    iconUrl: markerIcon,

    shadowUrl: markerShadow,

    iconSize: [
        25,
        41
    ],

    iconAnchor: [
        12,
        41
    ]

});


const captainIcon = L.divIcon({

    html: `
        <div style="
            font-size: 30px;
            transform: translate(-50%, -50%);
        ">
            🚗
        </div>
    `,

    className: "",

    iconSize: [
        30,
        30
    ],

    iconAnchor: [
        15,
        15
    ]

});


const MapController = ({
    pickup,
    destination,
    captainLocation
}) => {

    const map = useMap();


    useEffect(() => {

        // Captain ki live location
        if (captainLocation) {

            map.setView(
                [
                    captainLocation.ltd,
                    captainLocation.lng
                ],
                15
            );

            return;
        }


        // Pickup + destination
        if (
            pickup &&
            destination
        ) {

            const bounds =
                L.latLngBounds(
                    [
                        pickup.ltd,
                        pickup.lng
                    ],
                    [
                        destination.ltd,
                        destination.lng
                    ]
                );

            map.fitBounds(
                bounds,
                {
                    padding: [
                        50,
                        50
                    ]
                }
            );

            return;
        }


        // Only pickup
        if (pickup) {

            map.setView(
                [
                    pickup.ltd,
                    pickup.lng
                ],
                15
            );

        }

    }, [
        pickup,
        destination,
        captainLocation,
        map
    ]);


    return null;

};


const LiveTracking = ({
    pickup,
    destination,
    captainLocation
}) => {


    // Default Dehradun
    const defaultLocation = {

        ltd: 30.3165,

        lng: 78.0322

    };


    const center =
        pickup ||
        defaultLocation;


    return (

        <MapContainer

            center={[
                center.ltd,
                center.lng
            ]}

            zoom={13}

            scrollWheelZoom={true}

            className="h-full w-full"

        >

            <TileLayer

                attribution="&copy; OpenStreetMap contributors"

                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />


            <MapController

                pickup={pickup}

                destination={destination}

                captainLocation={captainLocation}

            />


            {/* PICKUP */}

            {pickup && (

                <Marker

                    position={[
                        pickup.ltd,
                        pickup.lng
                    ]}

                    icon={pickupIcon}

                >

                    <Popup>
                        Pickup
                    </Popup>

                </Marker>

            )}


            {/* DESTINATION */}

            {destination && (

                <Marker

                    position={[
                        destination.ltd,
                        destination.lng
                    ]}

                    icon={pickupIcon}

                >

                    <Popup>
                        Destination
                    </Popup>

                </Marker>

            )}


            {/* CAPTAIN */}

            {captainLocation && (

                <Marker

                    position={[
                        captainLocation.ltd,
                        captainLocation.lng
                    ]}

                    icon={captainIcon}

                >

                    <Popup>
                        Captain
                    </Popup>

                </Marker>

            )}

        </MapContainer>

    );

};


export default LiveTracking;