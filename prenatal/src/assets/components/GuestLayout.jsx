import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
{/*This page serves as a default layout for login and signup page*/}
export default function GuestLayout(){
  const {token} = useStateContext()

  if(token){
    return <Navigate to='/products'/>
  }

  //inside this we have to render login or signup
  return (
    <div className="login-signup-form">
    <img className="logo" src="/images/prenatalIcon.png" alt="icon" />
    <div className="form">
       <Outlet /> {/* Outlet is the place where the child route will be rendered */}
    </div>
    </div>
  )
}