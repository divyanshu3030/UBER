import React from 'react'
import { MdAddLocation } from "react-icons/md";

const LocationSearchPanel = (props) => {

    const suggestions = props.suggestions || [];

    const handleLocationClick = (location) => {

        if (props.activeField === "pickup") {
            props.setPickup(location.description);
        }

        if (props.activeField === "destination") {
            props.setDestination(location.description);
        }

        {/* props.setPanelOpen(false);
         props.setVehiclePanel(true);*/}
    };

    return (
        <div>

            {suggestions.length === 0 ? (
                <div className="text-gray-500 text-center py-5">
                    No locations found
                </div>
            ) : (

                suggestions.map((location, idx) => {

                    return (
                        <div
                            key={location.place_id || idx}
                            onClick={() => handleLocationClick(location)}
                            className="flex gap-3 border-2 border-gray-50 active:border-black p-3 rounded-lg items-center justify-start my-2 cursor-pointer"
                        >

                            <h2 className="bg-[#eee] h-8 w-8 flex items-center justify-center text-xl rounded-full">
                                <MdAddLocation />
                            </h2>

                            <h3 className="font-medium">
                                {location.description}
                            </h3>

                        </div>
                    )
                })
            )}

        </div>
    );
}

export default LocationSearchPanel;