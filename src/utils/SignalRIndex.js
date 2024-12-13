// import * as signalR from "@microsoft/signalr";
import React, { useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-notifications';
import { API_BASE_URL } from "../helpers/enum";
// import Sound from 'react-native-sound';

const SignalRComponent = () => {
    const getConnectionIdFromSignalR = useCallback(async () => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${API_BASE_URL}ontec`, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .build();

        try {
            await connection.start();
            const connectionId = await connection.invoke('GetConnectionId');
            await AsyncStorage.setItem('connectionId', connectionId);

            // Load the sound file
            const sound = new Sound('message_received.mp3', Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.error('Failed to load the sound', error);
                }
            });

            connection.on("ontecreceivemsg", (message) => {
                Toast.show(message, {
                    type: "warning",
                    placement: "top",
                    duration: 5000,
                    offset: 30,
                    animationType: "slide-in",
                });

                // Play the sound when a message is received
                sound.play();
            });

            connection.onreconnecting(() => {
                AsyncStorage.removeItem('connectionId');
                // Handle connection reconnecting event
            });

            connection.onreconnected(() => {
                AsyncStorage.removeItem('connectionId');
                // Handle connection reconnected event
            });

            connection.onclose(() => {
                AsyncStorage.removeItem('connectionId');
                // Handle connection closed event
            });

        } catch (error) {
            console.error('Error establishing SignalR connection:', error);
        }
    }, []);

    useEffect(() => {
        getConnectionIdFromSignalR();
    }, []);

    return null;
};

export default SignalRComponent;
