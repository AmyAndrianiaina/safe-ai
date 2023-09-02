import React from "react";
import Navigation from "./src/components/Navigation";
import { AuthProvider } from "./src/context/AuthContext";
import { StatusBar } from "react-native";

const App = () => {
    return (
        <AuthProvider>
            <StatusBar backgroundColor="#06bcee" />
            <Navigation />
        </AuthProvider>
    );
};
    
export default App;