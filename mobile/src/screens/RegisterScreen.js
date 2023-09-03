import React, { useContext, useState } from "react";
import { ScrollView, Button, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";

const RegisterScreen = ({navigation}) => {
    const [nom, setNom] = useState(null);
    const [prenom, setPrenom] = useState(null);
    const [cin, setCin] = useState(null);
    const [date_de_naissance, setDate_de_naissance] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [errors, setErrors] = useState({});
    
    const {isLoading, register} = useContext(AuthContext);

    const [inputs, setInputs] = useState({
        nom: '',
        prenom: '',
        cin: '',
        date_de_naissance: '',
        email: '',
        password: ''
    });

    const validate = async () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.nom) {
            handleError('Please input nom', 'nom');
            isValid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please input a valid email', 'email');
            isValid = false;
        }

        if (!inputs.prenom) {
            handleError('Please input prenom', 'prenom');
            isValid = false;
        }

        if (!inputs.cin) {
            handleError('Please input cin', 'cin');
            isValid = false;
        }

        if (!inputs.date_de_naissance) {
            handleError('Please input date_de_naissance', 'date_de_naissance');
            isValid = false;
        }

        if (!inputs.email) {
            handleError('Please input email', 'email');
            isValid = false;
        }

        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        }

        if (isValid) {
            console.log('valid')
            register(nom, prenom, cin, date_de_naissance, email, password);
        }
    };

    const handleOnChange = (text, input) => {
        setInputs((prevState) => ({...prevState, [input]: text}))
    };

    const handleError = (errorMessage, input)  => {
        setErrors((prevState)=>({...prevState, [input]: errorMessage}))
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Spinner visible={isLoading}/>
            <View style={styles.wrapper}>
                <Text style={styles.label}>Nom</Text>
                <TextInput 
                    style={styles.input} 
                    value={nom}
                    onFocus={() => {
                        handleError(null, 'nom');
                    }}
                    placeholder="Entrer nom" 
                    onChangeText={(text) => {
                            setNom(text); 
                            handleOnChange(text, 'nom')
                        }
                    }
                />
                <Text style={styles.error}>{errors.nom}</Text>

                <Text style={styles.label}>Prenom</Text>
                <TextInput 
                    style={styles.input} 
                    value={prenom}
                    onFocus={() => {
                        handleError(null, 'prenom');
                    }}
                    placeholder="Entrer prenom" 
                    onChangeText={(text) => {
                        setPrenom(text); 
                        handleOnChange(text, 'prenom')
                    }
                }
                />
                <Text style={styles.error}>{errors.prenom}</Text>

                <Text style={styles.label}>CIN</Text>
                <TextInput 
                    style={styles.input} 
                    value={cin}
                    onFocus={() => {
                        handleError(null, 'cin');
                    }}
                    placeholder="Entrer CIN" 
                    onChangeText={(text) => {
                            setCin(text); 
                            handleOnChange(text, 'cin')
                        }
                    }
                />
                <Text style={styles.error}>{errors.cin}</Text>

                <Text style={styles.label}>Date de Naissance</Text>
                <TextInput 
                    style={styles.input} 
                    value={date_de_naissance}
                    onFocus={() => {
                        handleError(null, 'date_de_naissance');
                    }}
                    placeholder="Entrer Date de Naissance" 
                    onChangeText={(text) => {
                            setDate_de_naissance(text); 
                            handleOnChange(text, 'date_de_naissance')
                        }
                    }
                />
                <Text style={styles.error}>{errors.date_de_naissance}</Text>

                <Text style={styles.label}>Email</Text>
                <TextInput 
                    style={styles.input} 
                    value={email}
                    onFocus={() => {
                        handleError(null, 'email');
                    }}
                    placeholder="Entrer email" 
                    onChangeText={(text) => {
                            setEmail(text); 
                            handleOnChange(text, 'email')
                        }
                    }
                />
                <Text style={styles.error} >{errors.email}</Text>

                <Text style={styles.label}>Password</Text>
                <TextInput 
                    style={styles.input} 
                    value={password}
                    onFocus={() => {
                        handleError(null, 'password');
                    }}
                    placeholder="Entrer password" 
                    onChangeText={(text) => {
                            setPassword(text); 
                            handleOnChange(text, 'password')
                        }
                    }
                    secureTextEntry 
                />
                <Text style={{color: 'red'}}>{errors.password}</Text>
            
                <Button title="Register" onPress={validate}
                />

                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
    
export default RegisterScreen;