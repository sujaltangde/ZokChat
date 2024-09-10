import { Skeleton } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
   
    // <div className="min-h-screen ">
    //   {/* <span className="loader"></span> */}
    //   <div className="w-full grid grid-cols-12 gap-5 py-5">

    //     <div className="min-h-[88vh]  col-span-3 ">
    //       <Skeleton variant="rectangular" className="min-h-screen" />
    //     </div>

    //     <div className="min-h-[88vh] col-span-6 ">
    //       <Skeleton variant="rectangular" className="min-h-screen"/>
    //     </div>

    //     <div className="min-h-[88vh]  col-span-3   ">
    //        <Skeleton variant="rectangular" className="min-h-screen" />
    //     </div>

    //   </div>
    // </div>

    <div className="min-h-screen flex justify-center items-center pb-20">
      <span className="loader"></span>
    </div>
  )
}

export default Loader