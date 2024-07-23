import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ip } from '../IP.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalRegistro from '../Modales/ModalRegistro.jsx';

const Login = ({ modalClose, visible }) => {
    const [data, setData] = useState({
        correo: '',
        password: ''
    });
    const [modalRegistro, setModalRegistro] = useState(false);
    const [mensaje, setMensaje] = useState("Continuar como invitado");
    const navigation = useNavigation();

    useEffect(() => {
        if (visible) {
            setMensaje('Registrate aqui!!!');
        }
    }, [visible]);

    const handleInputChange = (name, value) => {
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const openModalRegistro = () => {
        setModalRegistro(!modalRegistro);
    };

    const handleLogin = async () => {
        if (!data.correo || !data.password) {
            Alert.alert('Por favor, ingrese su correo y contraseña.');
            return;
        }

        try {
            const URL = `${ip}/validacion`;
            const response = await axios.post(URL, data);
            if (response.status === 200) {
                await AsyncStorage.setItem('token', response.data.token);
                await AsyncStorage.setItem('user', JSON.stringify(response.data.usuario[0]));
                navigation.navigate('tabs');
                modalClose && modalClose(); // Solo si modalClose está definido
                setData({
                    correo: '',
                    password: ''
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                Alert.alert('Usuario no registrado');
            } else {
                console.error(error);
                Alert.alert('Error del servidor: ' + error.message);
            }
        }
    };

    return (
        <View style={styles.page}>
            <View style={styles.form}>
                <Text style={styles.textInit}>Iniciar sesión</Text>
                <TextInput
                    style={styles.input}
                    value={data.correo}
                    onChangeText={(text) => handleInputChange('correo', text)}
                    placeholderTextColor="#000"
                    placeholder="Correo"
                />
                <TextInput
                    style={styles.input}
                    value={data.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    placeholderTextColor="#000"
                    placeholder="Contraseña"
                    secureTextEntry
                />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.textButton}>Ingresar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={openModalRegistro}>
                        <Text style={styles.textButton}>Registrarme</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.textInvitado}
                    onPress={mensaje === 'Registrate aqui!!!'
                        ? openModalRegistro
                        : () => navigation.navigate('tabs')}
                >
                    <Text style={styles.text}>{mensaje}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.textInvitado}>
                    <Text style={styles.text}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
            </View>
            <ModalRegistro onClose={openModalRegistro} visible={modalRegistro} />
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
    input: {
        width: 280,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        color: '#000',
        paddingLeft: 20,
        marginBottom: 15
    },
    button: {
        width: 100,
        height: 30,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5DE4F9',
        margin: 5
    },
    textButton: {
        color: '#000',
    },
    textInvitado: {
        marginTop: 20,
    },
    text: {
        color: '#000'
    }
});

export default Login;
