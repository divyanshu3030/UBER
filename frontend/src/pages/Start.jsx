import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
    return (
        <div>
            <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 w-full flex justify-between flex-col'>
                <img className='w-16 ml-8' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='' />
                <div className='bg-white py-4 px-4 pb-7'>
                    <h2 className='text-2xl font-bold'>Get Started With Uber</h2>
                    <Link to='/login' className='flex item-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>
                    Continue
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Start