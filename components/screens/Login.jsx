import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ip } from '../IP.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [data, setData] = useState({
        correo: '',
        password: ''
    });

    const handleInputChange = (name, value) => {
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const navigation = useNavigation();

    const handleLogin = async () => {
        console.log(data);
        try {
            const URL = `${ip}/validacion`;
            const response = await axios.post(URL, data);

            console.log(response.data);
            if (response.status === 200) {
                await AsyncStorage.setItem('token', response.data.token);
                await AsyncStorage.setItem('user', JSON.stringify(response.data.usuario[0]));
                navigation.navigate('tabs');
                setData({
                    correo: '',
                    password: ''
                })
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                Alert.alert('Usuario no registrado');
            } else {
                console.error(error);
                Alert.alert('Error del servidor'+error);
            }
        }
    };

    return (
        <View style={styles.page}>
            <View style={styles.form}>
                <Text style={styles.textInit}>
                    Iniciar sesión
                </Text>
                <TextInput
                    style={styles.inputCorreo}
                    value={data.correo}
                    onChangeText={(text) => handleInputChange('correo', text)}
                    placeholderTextColor="#000"
                    placeholder="Correo"
                />
                <TextInput
                    style={styles.inputPassword}
                    value={data.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    placeholderTextColor="#000"
                    placeholder="Contraseña"
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.textBoton}>
                        Ingresar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.textInvitado} onPress={() => navigation.navigate('tabs')}>
                    <Text style={styles.text}>
                        Continuar como invitado
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.textInvitado}>
                    <Text style={styles.text}>
                        ¿Olvidaste tu contraseña?
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    form: {
        width: 300,
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderRadius: 10
    },
    textInit: {
        color: '#000',
        fontSize: 28,
        paddingBottom: 40
    },
    inputCorreo: {
        width: 280,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        color: '#000',
        paddingLeft: 20,
        marginBottom: 15
    },
    inputPassword: {
        width: 280,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        color: '#000',
        paddingLeft: 20,
        marginBottom: 30
    },
    button: {
        width: 100,
        height: 30,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5DE4F9'
    },
    textBoton: {
        color: '#000',
    },
    textInvitado: {
        marginTop: 20,
        color: '#000'
    },
    text: {
        color: '#000'
    }
});

export default Login;
