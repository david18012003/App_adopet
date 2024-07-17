import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ModalPerfil from '../Modales/ModalPerfil';
import { useNavigation } from '@react-navigation/native';

const Header = ({title}) => {
    const [modalPerfil, setModalPerfil] = useState(false);

    const navigation =useNavigation()
    const modalInfo = () => {
        setModalPerfil(!modalPerfil);
        console.log(modalPerfil);
    };
    const navegarPerfil=()=>{
        navigation.navigate('perfil')
        setModalPerfil(false)
    }

    return (
        <>
            <View style={styles.header}>
                <View style={styles.headerIcon}>
                    <Image source={require('../../public/img/lista.png')} />
                </View>
                <View style={styles.headerTittle}>
                    <Text style={styles.textHeader}>{title}</Text>
                </View>
                <View style={styles.headerPerfil}>
                    <TouchableOpacity onPress={modalInfo}>
                        <Image source={require('../../public/img/usuario-de-perfil.png')} />
                    </TouchableOpacity>
                </View>
                <ModalPerfil visible={modalPerfil} onClose={modalInfo} navegacionPerfil={navegarPerfil}/>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        backgroundColor: '#85DAFF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 10,
    },
    headerPerfil: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 10,
    },
    textHeader: {
        color: "#000",
        fontSize: 20,
    },
    headerTittle: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Header;
