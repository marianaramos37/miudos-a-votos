import { Outlet, Navigate } from 'react-router-dom'
import { signIn } from '../signIn'

const ProtectedRoute = () => {
    let auth = {'token': localStorage.getItem('isAuthenticated')}

    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default ProtectedRoute 