import './App.css'
import { Route, Routes } from 'react-router-dom'
import Authentication from './pages/Authentication'
import Management from './pages/Management'
import FrontHouse from './pages/FrontHouse'
import BackHouse from './pages/BackHouse'
import { AuthProvider } from './context/AuthContext'
import AddUser from './components/Manage/Users/AddUser'
import EditUser from './components/Manage/Users/EditUser'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Authentication />} />
        <Route path='/manage' element={<Management />} />
        <Route path='/new-user' element={<AddUser />} />
        <Route path='/manage/edit/:id' element={<EditUser />} />
        <Route path='/fronthouse' element={<FrontHouse />} />
        <Route path='/backhouse' element={<BackHouse />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
