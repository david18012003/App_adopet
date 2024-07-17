// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavegacionStack from './components/navegacion/Navegacion.Stack.jsx';
import ListarPets from './components/screens/ListarPets.jsx';
import { SocketProvider } from './components/context/SocketContext.jsx';
import Header from './components/componen/Header.jsx';
import ModalPerfil from './components/Modales/ModalPerfil.jsx';

const App = () => {
  return (
    <SocketProvider>
      <NavigationContainer>
        <NavegacionStack/>
        {/* <ListarPets /> */}
        {/* <Header/> */}
        {/* <ModalPerfil/> */}
      </NavigationContainer>
    </SocketProvider>
  );
}

export default App;
