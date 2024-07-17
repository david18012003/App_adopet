import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home.jsx';
import Ayuda from '../screens/Ayuda.jsx';
import ListarPets from '../screens/ListarPets.jsx';
import MascotasAdoptadas from '../screens/MascotasAdoptadas.jsx';
import Perfil from '../screens/Perfil.jsx';

const ButtonTabs = () => {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} options={{headerShown:false}}/>
        <Tab.Screen name='Ayuda' component={Ayuda} options={{headerShown:false}}/>
        <Tab.Screen name='Listar' component={ListarPets} options={{headerShown:false}}/>
        <Tab.Screen name='Adopet' component={MascotasAdoptadas} options={{headerShown:false}}/>
        <Tab.Screen name='Perfil' component={Perfil} options={{headerShown:false}}/>
    </Tab.Navigator>
  )
}

export default ButtonTabs