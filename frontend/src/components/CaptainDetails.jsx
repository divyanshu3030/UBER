import React from 'react'
import { IoMdSpeedometer } from 'react-icons/io'
import { IoTimerOutline } from 'react-icons/io5'
import { MdSpeakerNotes } from 'react-icons/md'

const CaptainDetails = () => {
    return (
        <div>
            <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center justify-start gap-3'>
                    <img className="w-10 h-10 rounded-full object-cover" src="https://imgs.search.brave.com/HKfaFyIPjOR3sF0namUadB5xtbJR-ssRhPgaOq5RTOg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNC8w/OS8xNy8xMS80Ny9t/YW4tNDQ5NDA0XzY0/MC5qcGc" alt="" />
                    <h4 className="text-lg font-medium">Divyanshu</h4>
                </div>
                <div className='flex flex-col items-end'>
                    <h4 className="text-xl font-bold">₹309.30</h4>
                    <p className="text-sm text-gray-600">Earned</p>
                </div>
            </div>

            <div className='flex items-start justify-center mt-4 gap-8 p-1 bg-gray-100 rounded-xl'>
                <div className="flex justify-center items-center flex-col">
                    <IoTimerOutline className='text-3xl mb-2 font-semibold' />
                    <h5 className="text-lg font-medium">10.2</h5>
                    <p className="text-sm text-gray-600">Hours Online</p>
                </div>

                <div className="flex justify-center items-center flex-col">
                    <IoMdSpeedometer className='text-3xl mb-2 font-thin' />
                    <h5 className="text-lg font-medium">10.2</h5>
                    <p className="text-sm text-gray-600">Hours Online</p>
                </div>

                <div className="flex justify-center items-center flex-col">
                    <MdSpeakerNotes className='text-3xl mb-2 font-thin' />
                    <h5 className="text-lg font-medium">10.2</h5>
                    <p className="text-sm text-gray-600">Hours Online</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails