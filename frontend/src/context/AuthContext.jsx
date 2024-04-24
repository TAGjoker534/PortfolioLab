import {createContext, useEffect, useState} from 'react';
import Cookies from "js-cookie";
import {string} from "prop-types";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {

    const [username, setUsername] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        console.log("Get profile info from storage")
        const cookie = Cookies.get('jwt_token')
        if(cookie) {
            //Get information
            console.log(localStorage.getItem("userId"))
            //setUsername(localStorage.getItem("username") || "")
            setUserId(localStorage.getItem("userId") || "")
        }
        axios({
            url: "http://localhost:8080/getUser",
            method: "GET",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        }).then(data => {
            console.log(data.data.username)
            setUsername(data.data.username)
        })

    }, []);


    const logOut = () => {
        Cookies.remove("jwt_token")
        setUserId(null)
        setUsername(null)
        localStorage.removeItem("userId")
        localStorage.removeItem("username")

    }

    return <AuthContext.Provider value={{username, setUsername,userId, setUserId, logOut}}>
        {children}
    </AuthContext.Provider>
}

AuthProvider.propTypes = {
    token: string,
    children : () => {}
}