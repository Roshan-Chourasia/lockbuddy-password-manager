import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-[#888888] flex justify-around p-3 items-center'>
      <div className="logo font-bold">LockBuddy</div>
      <ul className='flex gap-8'>
        <li className='hover:font-bold hover:cursor-pointer'>Home</li>
        <li className='hover:font-bold hover:cursor-pointer'>Password</li>
      </ul>
    </nav>
  )
}

export default Navbar
