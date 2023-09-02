import React, { useContext } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = ({navigation}) => {
    const {userInfo, logout, isLoading} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Spinner visible={isLoading}/>
            <Text style={styles.welcome}>Welcome {userInfo.user.name}</Text>
            <Button title="Logout" color="red" onPress={logout}/>
            <View style={{flexDirection: 'row', marginTop: 20}}>
                <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                    <Text style={styles.link}>Message</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 18,
        marginBottom: 8
    },
});
    
export default HomeScreen;