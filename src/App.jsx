import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import AuthContext from './service/AuthContext'
import Sign from './pages/Sign'
import Register from './pages/Register'
import Landing from './pages/Landing'
import Sources from './pages/Sources'
import Media from './pages/Media'
import Favorite from './pages/Favorite'
import Profile from './pages/Profile'
import SignUpPremium from './pages/SignUpPremium'
import SourceElementPage from './pages/SourceElementPage'
import MediaItemPage from './pages/MediaItemPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminManageContent from './pages/admin/AdminManageContent'
import AdminManageUsers from './pages/admin/AdminManageUsers'
import AdminUsersIPs from './pages/admin/AdminUsersIPs'
import AdminCreateContent from './pages/admin/AdminCreateContent'
import ProtectedRoute from './service/ProtectedRoute'


function App() {

  const { user, loading } = useContext(AuthContext)


  return (
    <div className='App'>
      <Routes>
        {/* Гостевые маршруты */}
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Sign />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/signup-premium' element={<SignUpPremium />} />

        {/* Маршруты для пользователей */}
        <Route
          path='/sources'
          element={
            <ProtectedRoute loading={loading} user={user} allowedRoles={['user', 'admin']}>
              <Sources />
            </ProtectedRoute>
          }
        />
        <Route
          path='/sources/:id'
          element={
            <ProtectedRoute loading={loading} user={user} allowedRoles={['user', 'admin']}>
              <SourceElementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/media'
          element={
            <ProtectedRoute loading={loading} user={user} allowedRoles={['user', 'admin']}>
              <Media />
            </ProtectedRoute>
          }
        />
        <Route
          path='/media/:id'
          element={
            <ProtectedRoute loading={loading} user={user} allowedRoles={['user', 'admin']}>
              <MediaItemPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/favorite'
          element={
            <ProtectedRoute loading={loading} user={user} allowedRoles={['user', 'admin']}>
              <Favorite />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute loading={loading} user={user} allowedRoles={['user', 'admin']}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Админские маршруты */}
        <Route path='/admin/auth' element={<AdminLoginPage />} />
        <Route
          path='/admin/manage-content'
          element={
            <ProtectedRoute loading={loading} user={user} allowedRoles={['admin']}>
              <AdminManageContent />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/add-content'
          element={
            <ProtectedRoute loading={loading} user={user} allowedRoles={['admin']}>
              <AdminCreateContent />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/manage-users'
          element={
            <ProtectedRoute loading={loading} user={user} allowedRoles={['admin']}>
              <AdminManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/logs'
          element={
            <ProtectedRoute loading={loading} user={user} allowedRoles={['admin']}>
              <AdminUsersIPs />
            </ProtectedRoute>
          }
        />

        {/* Перенаправление по умолчанию */}
        <Route path='/*' element={<Navigate to='/login' replace />} />
      </Routes>
    </div>
  )
}

export default App
