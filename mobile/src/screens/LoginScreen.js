import React, { useContext, useState } from "react";
import { Button, StyleSheet, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("amy@gmail.com");
    const [password, setPassword] = useState("passr");
    const [errors, setErrors] = useState({});
    
    const {isLoading, login} = useContext(AuthContext);

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.email) {
            handleError('Please input email', 'email');
            isValid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please input a valid email', 'email');
            isValid = false;
        }

        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        }

        if (isValid) {
            console.log('valid')
            login(email, password);
        }
    };

    const handleOnChange = (text, input) => {
        setInputs((prevState) => ({...prevState, [input]: text}))
    };

    const handleError = (errorMessage, input)  => {
        setErrors((prevState)=>({...prevState, [input]: errorMessage}))
    }

    return (
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <View style={styles.wrapper}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    style={styles.input} 
                    value={email}
                    onFocus={() => {
                        handleError(null, 'email');
                    }}
                    placeholder="Enter email" 
                    onChangeText={(text) => {
                        setEmail(text); 
                        handleOnChange(text, 'email')
                    }
                }
                />
                <Text style={styles.error}>{errors.email}</Text>

                <Text style={styles.label}>Password</Text>
                <TextInput 
                    style={styles.input} 
                    value={password}
                    onFocus={() => {
                        handleError(null, 'password');
                    }}
                    placeholder="Enter password" 
                    onChangeText={(text) => {
                            setPassword(text); 
                            handleOnChange(text, 'password')
                        }
                    }
                    secureTextEntry 
                />

                <Text style={{color: 'red', marginVertical: -7}}>{errors.password}</Text>
                    
                <Text></Text>

                <Button title="Login" onPress={validate}
                />

                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.link}>Register</Text>
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
    },
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: 'grey',
    },
    error: {
        marginVertical: -7,
        fontSize: 14,
        color: 'red',
    }
});
    
export default LoginScreen;