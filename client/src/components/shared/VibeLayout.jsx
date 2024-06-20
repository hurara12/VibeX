import React, { useState } from 'react'
import Headline from './Headline'
import LeftSideBar from './LeftSideBar'
import Catalogue from '@/pages/generals/Catalogue';
import RightBar from './RightBar';
import Bottombar from './Bottombar';

function VibeLayout({elementBody:Component}) {
    const [showCatalogue, setShowCatalogue] = useState(false);
    const showCatalogueHandler = (state) => {
      setShowCatalogue(state);
    }
    return (
        // Top Division
        <div className="">
          <div>
            <Headline />
          </div>
          {/* Left Side Bar */}
    
          <div className="flex flex-row justify-between">
            <LeftSideBar CatalogueHandler={showCatalogueHandler} />
    
            <div className="flex flex-row justify-center w-screen lg:w-10/12 text-white">
              <div>
                {showCatalogue ? <Catalogue /> : <></>}
                <div className='text-black'> 
                {Component()}
                </div>
              </div>
            </div>
            <RightBar />
            <Bottombar />
          </div>
          <div>
    
          </div>
    
        </div>
    
      )
}

export default VibeLayout