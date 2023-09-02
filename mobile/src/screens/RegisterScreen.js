import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";

const RegisterScreen = ({navigation}) => {
    const [nom, setNom] = useState(null);
    const [prenom, setPrenom] = useState(null);
    const [cin, setCin] = useState(null);
    const [date_de_naissance, setDate_de_naissance] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    
    const {isLoading, register} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Spinner visible={isLoading}/>
            <View style={styles.wrapper}>
                <TextInput 
                    style={styles.input} 
                    value={nom}
                    placeholder="Entrer nom" 
                    onChangeText={(text) => setNom(text)}
                />

                <TextInput 
                    style={styles.input} 
                    value={prenom}
                    placeholder="Entrer prenom" 
                    onChangeText={(text) => setPrenom(text)}
                />

                <TextInput 
                    style={styles.input} 
                    value={cin}
                    placeholder="Entrer CIN" 
                    onChangeText={(text) => setCin(text)}
                />

                <TextInput 
                    style={styles.input} 
                    value={date_de_naissance}
                    placeholder="Entrer Date de Naissance" 
                    onChangeText={(text) => setDate_de_naissance(text)}
                />

                <TextInput 
                    style={styles.input} 
                    value={email}
                    placeholder="Entrer email" 
                    onChangeText={(text) => setEmail(text)}
                />

                <TextInput 
                    style={styles.input} 
                    value={password}
                    placeholder="Entrer password" 
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry 
                />
            
                <Button title="Register" onPress={() => {
                    register(nom, prenom, cin, date_de_naissance, email, password);
                }}
                />

                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
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
    wrapper: {
        width: '80%',
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
    },
    link: {
        color: 'blue',
    }
});
    
export default RegisterScreen;