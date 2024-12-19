import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const mockUser = {
    username: 'user1',
    password: '123'
};

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (username === mockUser.username && password === mockUser.password) {
            // Substituir localStorage por AsyncStorage
            AsyncStorage.setItem('isAuthenticated', 'true');
            onLogin();
        } else {
            setError('Credenciais inválidas!');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button style={styles.button} title="Login" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#e50914',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#121212',
        width: '100%'
    },
    title: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#1e1e1e',
        color: 'white',
        padding: 10,
        marginBottom: 10,
        borderRadius: 4,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    }
});

export default LoginPage;
