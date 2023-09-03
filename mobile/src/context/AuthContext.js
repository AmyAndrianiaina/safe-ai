import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL, BASE_URL_SERVER } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [outputs, setOutputs] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);

    const register = (nom, prenom, cin, date_de_naissance, email, password) => {
        setIsLoading(true);

        axios
            .post(`${BASE_URL}/register`, {
                nom,
                prenom,
                cin,
                date_de_naissance,
                email,
                password
            })
            .then(res => {
                Alert.alert('Message', 'Registration Successful');
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`register error ${e.response.data.detail}`);
                Alert.alert('Error', e.response.data.detail);
                setIsLoading(false);
            });
    };

    const login = (email, password) => {
        setIsLoading(true);

        axios
            .post(`${BASE_URL}/login`, {
                email,
                password
            })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`register error ${e.response.data.detail}`);
                Alert.alert('Error', e.response.data.detail);
                setIsLoading(false);
            });
    };

    const logout = () => {
        setIsLoading(true);

        axios
            .post(`${BASE_URL}/logout`, {
            }, {
                // headers: {Authorization: `Bearer ${userInfo.access_token}`},
            },
            )
            .then(res => {
                console.log(res.data);
                AsyncStorage.removeItem('userInfo');
                setUserInfo({});
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`logout error ${e}`);
                setIsLoading(false);
            });
    };

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);

            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserInfo(userInfo)
            }

            setSplashLoading(false);
        } catch (e) {
            setSplashLoading(false);
            console.log(`is logged in error ${e}`);
        }
    }

    const chat = async (input) => {
        console.log('Message : ' + input);
        setIsLoading(true);

        try {
            const response = await axios.post(`${BASE_URL_SERVER}/Cogni`, {
                input
            });

            let _output = response.data.output;
            console.log()
            setOutputs(_output);
        } catch (error) {
            console.log(`register error ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                userInfo,
                register,
                splashLoading,
                login,
                logout,
                chat,
                outputs
            }}>
            {children}
        </AuthContext.Provider>
    );
};