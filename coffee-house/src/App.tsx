import './App.css'
import { Route, Routes } from 'react-router-dom'
import Authentication from './pages/Authentication'
import Management from './pages/Management'
import FrontHouse from './pages/FrontHouse'
import BackHouse from './pages/BackHouse'
import { AuthProvider } from './context/AuthContext'
import AddUser from './components/Manage/Users/AddUser'
import EditUser from './components/Manage/Users/EditUser'
import UsersTable from './components/Manage/Users/UsersTable'
import ProductsTable from './components/Manage/ProductsTable'
import OrdersTable from './components/Manage/OrdersTable'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Authentication />} />
        <Route
          path="/manage/*"
          element={
            <Routes>
              <Route path="/" element={<Management />} />
              <Route path="users" element={<UsersTable />} />
              <Route path="users/new" element={<AddUser />} />
              <Route path="users/edit/:id" element={<EditUser />} />
              <Route path="products" element={<ProductsTable />} />
              <Route path="orders" element={<OrdersTable />} />
            </Routes>
          }
        />
        <Route path='/new-user' element={<AddUser />} />
        <Route path='/manage/edit/:id' element={<EditUser />} />
        <Route path='/fronthouse' element={<FrontHouse />} />
        <Route path='/backhouse' element={<BackHouse />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
