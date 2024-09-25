import { HashRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import { LoginComponent } from '../layout/login'
import Dashboard from '../components/Dashboard'
import { RegisterComponent } from '../layout/register'

export const AllRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        {/* <---- Private Routes ----> */}
        <Route path='/' element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes >
    </HashRouter>
  )
}