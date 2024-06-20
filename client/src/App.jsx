import { AuthProvider } from './contexts/authContext/AuthContext'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './components/auth/Auth';
import GeneralProtectedRoute from './components/protectedRoutes/GeneralProtectedRoute'
import Dashboard from './pages/generals/Dashboard';
import Profile from './pages/generals/Profile';
import ViewCatalogue from './components/profile/ViewCatalogue';
import { Toaster } from './shadcn-components/ui/toaster';
import ViewCatalogueSm from './components/profile/ViewCatalogueSm';
import Search  from './pages/generals/Search';
import Spaces from './pages/generals/Spaces';
import SpaceDashboard from './components/spaces/SpaceDashboard';

const App=()=> {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/dashboard" element={<GeneralProtectedRoute elementBody={<Dashboard />} />} />
        <Route path="/profile/:userId" element={<GeneralProtectedRoute elementBody={<Profile />} />} />
        <Route path="/view-catalogue-sm" element={<GeneralProtectedRoute elementBody={<ViewCatalogueSm />} />} />
        <Route path="/search" element={<GeneralProtectedRoute elementBody={<Search/>}/>}/>
        <Route path="/spaces" element={<GeneralProtectedRoute elementBody={<Spaces/>}/>}/>
        <Route path="/space-dashboard/:spaceName" element={<GeneralProtectedRoute elementBody={<SpaceDashboard/>}/>}/>
        <Route path="/test" element={<ViewCatalogue/>}/>
        
      </Routes>
      <Toaster/>
    </AuthProvider>
    </BrowserRouter>
  )
}

export default App