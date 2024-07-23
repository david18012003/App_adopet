import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Header from '../componen/Header';
import { ip } from '../IP';
import axios from 'axios';

const Ayuda = () => {
  const [dataMensaje, setDataMensaje] = useState('');
  const [resultado, setResultado] = useState('');

  const consulta = async () => {
    try {
      const URL = `${ip}/mensajeIA`;
      const respuesta = await axios.post(URL, { mensaje: dataMensaje });

      if (respuesta.status === 200) {
        setResultado(respuesta.data);
        setDataMensaje('')
      } else {
        console.log('Error en la consulta');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title={'Ayuda'} />
      <View style={styles.container}>
        
        <ScrollView style={styles.respuestaContainer}>
          <Text style={styles.respuestaText}>
            {resultado.text}
          </Text>
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='¿Cómo te podemos ayudar?'
            style={styles.input}
            value={dataMensaje}
            placeholderTextColor={'#000'}
            onChangeText={setDataMensaje}
          />
          <TouchableOpacity style={styles.button} onPress={consulta}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 7,
    borderRadius: 5,
    borderColor:'#000',
    borderWidth:1,
    color:"#000"
  },
  button: {
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  respuestaContainer: {
    backgroundColor: '#CCEFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom:20,
  },
  respuestaText: {
    fontSize: 16,
    marginBottom:20,
    color:"#000"

  },
});

export default Ayuda;
