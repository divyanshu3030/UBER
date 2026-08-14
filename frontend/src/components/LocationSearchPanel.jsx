import React from 'react'
import { MdAddLocation } from "react-icons/md";

const LocationSearchPanel = (props) => {

    //sample array location
    const locations = [
        "shimla by pass road",
        "patel nagar",
        "graphic era hill university , clement town",
        "22B, Near malhotra cafe, dehradun"
    ]

    return (
        <div>
            {/* this is a sample data */}

            {
                locations.map(function (elem, idx) {
                    return <div key={idx} onClick={() => {
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }} className='flex gap-3 border-2 border-gray-50 active:border-black p-3 rounded-lg  items-center justify-start my-2'>
                        <h2 className='bg-[#eee] h-8 w-8 flex items-center justify-center text-xl rounded-full'><MdAddLocation /></h2>
                        <h3 className='font-medium'>{elem} </h3>
                    </div>
                })
            }
        </div>
    );
}


export default LocationSearchPanel