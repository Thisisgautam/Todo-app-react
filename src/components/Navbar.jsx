import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between  text-white bg-[#4B164C] p-3'>
        <div className="logo font-bold cursor-pointer"> Todo </div>
        <ul className='flex gap-4'>
        <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-75'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
