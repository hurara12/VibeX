import React from 'react'
import RightAdvertSlider from '../Slider/RightAdvertSlider';

function RightBar() {
  return (
      <div className="lg:flex flex-col sticky top-0 items-around h-screen bg-slate-200 w-80 hidden">
        <div >
          <RightAdvertSlider/>
        </div>
          {/* <hr className='mt-2'/>
          <div>
            Haylou
          </div> */
          }
      </div>
  )
}

export default RightBar;