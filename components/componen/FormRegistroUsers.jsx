import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ip } from '../IP.jsx';

const FormRegistroUsers = ({ modalClose }) => {
    const [data, setData] = useState({
        nombre: '',
        cedula: '',
        correo: '',
        telefono: '',
        password: '',
        rol: 1
    });

    const handleInputChange = (name, value) => {
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFormRegistroUsers = async () => {
        if (!data.nombre || !data.cedula || !data.correo || !data.telefono || !data.password) {
            Alert.alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            console.log('todos los datos: ',data);
            const URL = `${ip}/usuario/registrar`;
            const response = await axios.post(URL, data);

            if (response.status === 200) {
                Alert.alert('Mensaje', response.data.mensaje);
                modalClose(); // Cerrar el modal si la función está definida
                setData({
                    nombre: '',
                    cedula: '',
                    correo: '',
                    telefono: '',
                    password: '',
                    rol: 1
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
                <Text style={styles.textInit}>
                    Registrate
                </Text>
                <TextInput
                    style={styles.inputCorreo}
                    value={data.nombre}
                    onChangeText={(text) => handleInputChange('nombre', text)}
                    placeholderTextColor="#000"
                    placeholder="Nombre"
                />
                <TextInput
                    style={styles.inputCorreo}
                    value={data.cedula}
                    onChangeText={(text) => handleInputChange('cedula', text)}
                    placeholderTextColor="#000"
                    placeholder="Cedula"
                />
                <TextInput
                    style={styles.inputCorreo}
                    value={data.correo}
                    onChangeText={(text) => handleInputChange('correo', text)}
                    placeholderTextColor="#000"
                    placeholder="Correo"
                />
                <TextInput
                    style={styles.inputCorreo}
                    value={data.telefono}
                    onChangeText={(text) => handleInputChange('telefono', text)}
                    placeholderTextColor="#000"
                    placeholder="Telefono"
                />
                <TextInput
                    style={styles.inputPassword}
                    value={data.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    placeholderTextColor="#000"
                    placeholder="Contraseña"
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleFormRegistroUsers}>
                    <Text style={styles.textBoton}>
                        Enviar
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
    }
});

export default FormRegistroUsers;
