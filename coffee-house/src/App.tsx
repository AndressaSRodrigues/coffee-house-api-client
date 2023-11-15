import './App.css'
import { Route, Routes } from 'react-router-dom'
import Authentication from './pages/Authentication'
import Management from './pages/Management'
import FrontHouse from './pages/FrontHouse'
import BackHouse from './pages/BackHouse'
import { AuthProvider } from './context/AuthContext'
import EditUsers from './components/Manage/EditUsers'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Authentication />} />
        <Route path='manage' element={<Management />} />
        <Route path='fronthouse' element={<FrontHouse />} />
        <Route path='backhouse' element={<BackHouse />} />
        <Route path='edit-users' element={<EditUsers />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
