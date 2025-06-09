import React, { createContext, useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "../api/axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [cookies] = useCookies(["token"]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get("token");

        if (!token) {
            // If no token, try refreshing the token
            axios.get("/refresh-token", { withCredentials: true })
                .then((res) => {
                    console.log("Auth context accesstoken :", res.data.accessToken);
                    Cookies.set("token", res.data.accessToken, {
                        path: "/", expires: new Date(new Date().getTime() + 15 * 60 * 1000), secure: true, // Required for HTTPS
                        sameSite: 'none'
                    });
                    const decodedToken = jwtDecode(res.data.accessToken);
                    // console.log("Decoded refresh token :"+{decodedToken})
                    // console.log(decodedToken)
                    setUser({
                        id: decodedToken.id,
                        role: decodedToken.role,
                        name: decodedToken.name,
                        email: decodedToken.email,
                        isLoggedIn: true,
                    });
                })
                .catch((err) => {
                    console.error("Token refresh failed", err);
                    setUser({ isLoggedIn: false });
                })
                .finally(() => setLoading(false));;
        } else {
            // If token exists, decode and set user data
            const decodedToken = jwtDecode(token);
            // console.log("Decoded token :"+{decodedToken})
            // console.log(decodedToken)
            setUser({
                id: decodedToken.id,
                role: decodedToken.role,
                name: decodedToken.name,
                email: decodedToken.email,
                isLoggedIn: true,
            });
            setLoading(false);
        }
    }, []);
    // cookies.token
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         let token = Cookies.get("token");

    //         if (!token) {
    //             try {
    //                 const res = await axios.get("/refresh-token", { withCredentials: true });
    //                 token = res.data.accessToken;
    //                 Cookies.set("token", token, { path: "/", expires: new Date(new Date().getTime() + 10 * 60 * 1000) });

    //                 const decodedToken = jwtDecode(token);
    //                 setUser({
    //                     id: decodedToken.id,
    //                     role: decodedToken.role,
    //                     isLoggedIn: true,
    //                 });
    //             } catch (err) {
    //                 console.error("Token refresh failed", err);
    //                 setUser({ isLoggedIn: false });
    //             }
    //         } else {
    //             const decodedToken = jwtDecode(token);
    //             setUser({
    //                 id: decodedToken.id,
    //                 role: decodedToken.role,
    //                 isLoggedIn: true,
    //             });
    //         }

    //         setLoading(false);
    //     };

    //     fetchUser();
    // }, [cookies.token]); 



    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
