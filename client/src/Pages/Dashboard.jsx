import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Dashboard = () => {

  const navigate = useNavigate();

  return (
    <div className='min-h-screen'>
      {/* Navbar For Recruiter  */}
      <div className='shadow py-4'>
        <div className='px-5 flex justify-between'>
          <img onClick={e => navigate("/")} className='max-sm:w-32 cursor-pointer' src={assets.logo} alt="" />
          <div className='flex items-center gap-3'>
            <p className='max-sm:hidden'>Welcome , Recruiter</p>
            <div className='relative group'>
              <img className='w-8 border rounded-full' src={assets.company_icon} alt="" />
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black-500 rounded pt-12'>
                <ul className='list-none m-0 p-2 rounded border text-sm bg-white '>
                  <li className='px-2 py-1 pr-5 cursor-pointer'>Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-start'>
          {/* Left Sidebar */}
          <div className='inline-block min-h-screen border-r-2'>
            <ul className='flex flex-col items-start pt-5 text-gray-800'>
              <NavLink className={({isActive}) => `flex items-center p-3 sm:p- gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/add-job'}>
               <img className='min-w-4 ' src={assets.add_icon} alt="" />
               <p className='max-sm:hidden '> Add Job</p>
              </NavLink>
              <NavLink className={({isActive}) => `flex items-center p-3 sm:p- gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/manage-jobs'}>
               <img src={assets.home_icon} className='min-w-4 ' alt="" />
               <p className='max-sm:hidden '>Manage Jobs</p>
              </NavLink>
              <NavLink to={'/dashboard/view-applications'} className={({isActive}) => `flex items-center p-3 sm:p- gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}> 
               <img src={assets.person_tick_icon} alt="" className='min-w-4 ' />
               <p className='max-sm:hidden '>View Applications</p>
              </NavLink>
            </ul>
          </div>
          <div>
            <Outlet/>
          </div>
      </div>

    </div>
  )
}

export default Dashboard
