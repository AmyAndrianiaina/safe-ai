import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";

const ChatScreen = () => {

    const [data, setData] = useState([]);
    const [textInput, setTextInput] = useState('');

    const handleSend = async () => {
        const prompt = textInput;
        const text = "I am a bot";
        const user = {type: 'user', 'text': prompt};
        const bot = {type: 'bot', 'text': text};
        setData([...data, user, bot]);
        setTextInput('');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>AI ChatBot </Text>
            <FlatList 
                data={data}
                keyExtractor={(item, index) => index.toString()}
                style={styles.body}
                renderItem={({item}) => (
                    <View style={{flexDirection:'row', padding:10}}>
                        <Text style={{fontWeight:'bold', color: item.type === 'user' ? 'green' : 'red'}}>{item.type === 'user' ? 'Amy: ' : 'Bot: '}</Text>
                        <Text style={styles.bot}>{item.text}</Text>
                    </View>
                )}
            />
            <TextInput 
                style={styles.input}
                value={textInput}
                onChangeText = {text => setTextInput(text) }
                placeholder="Ask me anything"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSend}
            >
                <Text style={styles.buttonText}>Let's Go</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffcc9',
        alignItems: 'center',
    },
    title:{
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 70
    },
    body: {
        backgroundColor: '#fffcc9',
        width: '102%',
        margin: 10
    },
    bot: {
        fontSize: 16
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        width: '90%',
        height: 60,
        marginBottom: 10,
        borderRadius: 10
    },
    button: {
        backgroundColor: 'yellow',
        width: '90%',
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'blue'
    }
});
    
export default ChatScreen;