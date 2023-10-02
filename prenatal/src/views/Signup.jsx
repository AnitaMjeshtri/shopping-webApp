import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const [errors, setErrors] = useState({});
  const { setUser, setToken } = useStateContext();

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient
      .post('/signup', payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          const responseData = JSON.parse(response.data);
          setErrors(responseData);
        }
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="login-signup-text text-2xl mb-5 font-bold">
        Crea il tuo account
      </h2>
      {Object.keys(errors).length > 0 && (
        <div className="alert mb-5 bg-red-600 p-5 text-white rounded-md">
          {Object.keys(errors).map((field) => (
            <p key={field} className="error-message">
              {errors[field][0]}
            </p>
          ))}
        </div>
      )}
      <input ref={nameRef} type="text" placeholder="Full Name" />
      <input ref={emailRef} type="email" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <input
        ref={passwordConfirmationRef}
        type="password"
        placeholder="Password Confirmation"
      />
      <button className="btn btn-block">REGISTRATI</button>

      <p className="message">Già registrato?</p>
      <p className="message">
        <Link to="/login">ACCEDI</Link>
      </p>
    </form>
  );
}
