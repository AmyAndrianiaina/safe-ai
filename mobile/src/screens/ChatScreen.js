import React, { useState, useEffect, useCallback, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";


const ChatScreen = () => {

    const [messages, setMessages] = useState([])
    const { outputs, chat } = useContext(AuthContext);
    const [ input, setInput] = useState(null);
    const [ index, setIndex] = useState(2);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'How Can I Help You',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Safe AI',
                    avatar: 'https://i.ibb.co/qBR4QQj/bot.png',
                },
            },
        ])
    }, [])

    const onSend = useCallback(async (messages = []) => {
        setIndex(index + 1);
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
        const newInput = messages[0].text; // Store the new input value in a variable
        await chat(newInput); // Wait for the chat function to complete
        console.log(outputs);
    
        // let sms = "Diabetes mellitus, or simply diabetes, is a chronic disease that affects millions of people worldwide. In the United States alone, approximately 25.8 million people have diabetes, making it the seventh leading cause of death. Diabetes is a metabolic disorder characterized by high levels of sugar in the blood, a condition known as hyperglycemia."

        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, {
                _id: index,
                text: outputs,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Safe AI',
                    avatar: 'https://i.ibb.co/qBR4QQj/bot.png',
                },
            })
        );
    }, [chat, index, outputs]);

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ChatScreen;