import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSocket } from '../context/SocketContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ip } from '../IP.jsx';

const Mensajes = ({ Id_receptor, foto }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const socket = useSocket();
  const scrollViewRef = useRef();

  const obtenerDatos = async () => {
    const storedUser = await AsyncStorage.getItem('user');
    const user = JSON.parse(storedUser);
    setUserId(user.id);
    setUserName(user.nombre);
  };

  const cargarMensajes = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const user = JSON.parse(storedUser);
      const response = await axios.get(`${ip}/mensaje/${Id_receptor}/${user.id}/${foto}`);
      setMessages(response.data.result);
    } catch (error) {
      console.error('Error al cargar los mensajes:', error);
    }
  };

  useEffect(() => {
    obtenerDatos();
    cargarMensajes();

    if (!socket) return;

    socket.on('connect', () => {
      console.log('Conectado al servidor Socket.IO');
    });

    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      scrollViewRef.current.scrollToEnd({ animated: true });
    });

    return () => {
      socket.off('connect');
      socket.off('chat message');
    };
  }, [socket, Id_receptor]);

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage === '') {
      Alert.alert("Tiene que escribir el mensaje para poder enviarlo");
    } else {
      const messageData = {
        userEnvia_id: userId,
        userRecibe_id: Id_receptor,
        name_foto: foto,
        nameUserEnv: userName,
        message: inputMessage,
      };

      socket.emit('chat message', messageData);
      setInputMessage('');
      cargarMensajes();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.messagesContainer}
        ref={scrollViewRef}
      >
        {messages.map((messageObj, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              messageObj.nameUserEnv === userName ? styles.myMessage : styles.otherMessage,
            ]}
          >
            <Text style={[
              styles.TextUser,
              messageObj.nameUserEnv === userName ? styles.myText : styles.otherText,
            ]}>{messageObj.nameUserEnv}</Text>
            <Text style={styles.message}>{messageObj.message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholderTextColor="#000"
          placeholder="Escribe un mensaje..."
        />
        <TouchableOpacity style={styles.boton} onPress={sendMessage}>
          <Text style={styles.btnText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  messagesContainer: {
    flex: 1,
    width: '100%',
  },
  messageContainer: {
    padding: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    marginVertical: 5,
    maxWidth: '70%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6', // Color de fondo para mensajes del usuario actual
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
  },
  message: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 20,
    color: '#000',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: '#000',
  },
  boton: {
    width: 60,
    height: 40,
    backgroundColor: '#57C407',
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  btnText: {
    fontSize: 16,
    color: '#000',
  },
  TextUser:{
    color:"#000"
  },
  myText:{
    textAlign:'right',
    color:'transparent'
  }
});

export default Mensajes;
