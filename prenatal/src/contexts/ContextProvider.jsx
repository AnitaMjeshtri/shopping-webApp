import { createContext, useContext, useState } from "react";

//creating rect contents which allows me to share state and functions between different components
const StateContext = createContext({
  user: null, // We need these default parameters for autocomplete purposes
  token: null,
  setUser: () => {},
  setToken: () => {}
})

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({children}) =>{
    //creating states
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    //creating a setToken function
    const setToken = (token) => {
      _setToken(token)
      if(token){
        localStorage.setItem('ACCESS_TOKEN', token);
      }else{
        localStorage.removeItem('ACCESS_TOKEN');
      }
    }
  return (
    <StateContext.Provider value ={{

      user,
      token,
      setUser,
      setToken
    }}> {/**double curly braces, one for react and the other one tells that its object */}
    {children} {/**render children */}
    </StateContext.Provider>
  )
}

//It uses the useContext hook to access the values provided by the StateContext
//Essentially, any component that calls useStateContext can access the user, token, setUser, and setToken values from the context.
export const useStateContext = () => useContext(StateContext)

//Based on whether the token is available or not we need to render default layout or guest layout