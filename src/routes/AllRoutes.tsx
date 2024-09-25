import { HashRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import { LoginComponent } from '../layout/login'
import Dashboard from '../components/Dashboard/Dashboard'
import { RegisterComponent } from '../layout/register'
import CreateUser from '../components/Dashboard/CreateUser'
import Users from '../components/Dashboard/Users'

export const AllRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        {/* <---- Private Routes ----> */}
        <Route path='/' element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/all-users" element={<Users />} />
          <Route path="/dashboard/create-user" element={<CreateUser />} />
        </Route>
      </Routes >
    </HashRouter>
  )
}