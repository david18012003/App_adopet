import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../componen/Header';

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenAsyng = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');
  
        if (tokenAsyng && storedUser) {
          const user = JSON.parse(storedUser);
  
          console.log('Token:', tokenAsyng);
          console.log('id del usuario actual',user.id);
        } else {
          console.log('No se encontraron datos en AsyncStorage');
        }
      } catch (error) {
        console.error('Error al recuperar datos de AsyncStorage:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <>
    <Header title={'Home'}/>
    <View>
      <Text>Home</Text>
    </View>
    </>
  );
};

export default Home;
