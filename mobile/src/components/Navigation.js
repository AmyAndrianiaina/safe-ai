import React, { useContext } from "react";
import { Text, View } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { AuthContext } from "../context/AuthContext";
import SplashScreen from "../screens/SplashScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {

    const {userInfo, splashLoading} = useContext(AuthContext);

    return (
    <NavigationContainer>
        <Stack.Navigator>  
            {splashLoading ? 
            (
                <Stack.Screen name="Splash Screen" component={SplashScreen} options={{headerShown: false}} />
            ) : 
                userInfo.access_token ? (
                    <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Chat" component={ChatScreen} />
                    </>
                ) : (
                    <>
                    <Stack.Screen name="Login" component={LoginScreen} options={{headerShadowVisible: false}}/>
                    <Stack.Screen name="Register" component={RegisterScreen} options={{headerShadowVisible: false}}/>
                    </>
            )}
        </Stack.Navigator>
    </NavigationContainer>
    )
}
    
export default Navigation;