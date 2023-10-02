import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login(){

  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState({});
  const { setUser, setToken } = useStateContext();

  const onSubmit = (event) => {
    event.preventDefault();
    
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    axiosClient
      .post('/login', payload)
      .then(({data})=>{
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data)
          setErrors(response.data);
        }else{
          setErrors({
            email: [response.data.message]
          })
        }
      });
  }

  // console.log(token)
  // if(token){
  //   return <Navigate to='/users' />
  // }
  return (
        <form onSubmit={onSubmit}>
            <h2 className="login-signup-text text-2xl mb-5 font-bold">Effettua il login</h2>
            {
              Object.keys(errors).length > 0 && <div className="alert mb-5 bg-red-600 p-5 text-white rounded-md">
                {
                  Object.keys(errors).map((field) => (
                    <p key={field} className="error-message">
                      {errors[field][0]}
                    </p>
                  ))
                }
              </div>
            }
            <input ref={emailRef} type="email" placeholder="Email" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <button className="btn btn-block">ACCEDI</button>
            
            <p className="message">
            Non hai un account?
            </p>
            <p className="message"><Link to="/signup">REGISTRATI</Link></p>
        </form>
  )
}