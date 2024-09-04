import React from 'react'
import { MdGroups, MdSearch, MdAdd } from "react-icons/md";



const Header = () => {
  return (
    <>

      <div className="h-[8vh] bg-[#890CBD] flex justify-between items-center xl:px-5 px-3 py-1">

        <div>
          <img src="/assets/logoPng/logo-white-nobg.png" alt="logo-white" className=" h-10" />
        </div>

        <div className="flex gap-7 items-center text-white">
          <button><MdSearch size={28} /></button>
          <button><MdAdd size={28} /> </button>
          <button><MdGroups size={28} /></button>
        </div>

      </div>

    </>
  )
}

export default Header