import React, { useState } from 'react'
import VibeLayout from '@/components/shared/VibeLayout';
import Post from '@/components/dashboard/Post'


function Dashboard() {
  const [showCatalogue, setShowCatalogue] = useState(false);
  const showCatalogueHandler = (state) => {
    setShowCatalogue(state);
  }
  function temp(){
    return (<div><Post/></div>)
  }
  return (
    <VibeLayout elementBody={temp}
    />
  )
}

export default Dashboard