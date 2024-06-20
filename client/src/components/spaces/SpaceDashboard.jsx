import React, { useState } from 'react'
import VibeLayout from '@/components/shared/VibeLayout';
import Post from '@/components/dashboard/Post'
import { useParams } from "react-router-dom"


export function SpaceDashboard() {
   
    const [showCatalogue, setShowCatalogue] = useState(false);
    
    const showCatalogueHandler = (state) => {
        setShowCatalogue(state);
    }

    function temp() {
        let { spaceName } = useParams();
         
        return (<div><Post isSpace={spaceName} /></div>)
    }

    return (
        <VibeLayout elementBody={temp}
        />
    )
}

export default SpaceDashboard