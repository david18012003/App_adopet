import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login.jsx';
import Home from '../screens/Home.jsx';
import ButtonTabs from './Button.Tabs.jsx';
import Perfil from '../screens/Perfil.jsx';

const Stack = createStackNavigator();

const NavegacionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='login' component={Login} options={{headerShown:false}}/>
      <Stack.Screen name='tabs' component={ButtonTabs} options={{headerShown:false}}/>
      <Stack.Screen name='home' component={Home} options={{headerShown:false}}/>
      <Stack.Screen name='perfil' component={Perfil} />
    </Stack.Navigator>
  )
}

export default NavegacionStack