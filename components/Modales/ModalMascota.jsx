import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ip } from '../IP'
import axios from 'axios'

const ModalMascota = ({visible, id, onClose}) => {
    const [infoMascota, setInfomascota]=useState("")

    useEffect(()=>{
        const consultarMascota = async()=>{
            try {
                const URL =`${ip}/mascotas/buscar/${id}`
                const consulta = await axios.get(URL)
                setInfomascota(consulta.data.resultado)
                console.log('desde modal'+consulta.data.resultado);
            } catch (error) {
                
            }
        }
        consultarMascota();
    },[id])

    const renderItem = ({ item }) => (

        <>
        <View style={[styles.petContainer,]}>  
          <Text style={styles.TextTittle}>{item.nombre_pet}</Text>
          <Image source={{ uri: `${ip}/img/${item.foto}` }} style={styles.image} />
        </View>
        <View>
            <Text style={styles.TextConten}>Categoria: {item.nombre_categoria}</Text>
          <Text style={styles.TextConten}>Genero: {item.genero}</Text>
          <Text style={styles.TextConten}>Fundacion: {item.nombre_usuario}</Text>
          <Text style={styles.TextConten}>Descripcion: {item.descripcion}</Text>
          <Text style={styles.TextConten}>Estado: {item.estado}</Text>
          <Text style={styles.TextConten}>Publicado: {item.creado}</Text>
        </View>
        </>
      );
    
  return (
    <>
    <Modal
            animationType="slide"
            onDismiss={()=> console.log("hola modal")}
            onShow={()=> console.log("hola mundo")}
            transparent
            visible={visible}
            >
                <View style={{
                    flex:1,
                    backgroundColor:'rgba(1,1,1, 0.5)',
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <View
                    style={{
                        
                        height:"85%",
                        width:"85%",
                        backgroundColor:"#fff",
                        borderRadius:20
                       
                    }}
                    >
                        
                        <View style={{
                            margin:12
                        }} >
                            <View style={{justifyContent: 'center', alignItems: 'center' }}>
                                
                            </View>
                            <>
                            <View
                        style={{
                            height:45,
                            width:"100%",
                            flexDirection:"row",
                            justifyContent:"flex-end",
                            alignItems:'center',
                        }}
                    >
                        <TouchableOpacity onPress={onClose}>
                            <Image
                                style={{
                                    margin:15
                                }}
                                source={require('../../public/img/cerrar.png')}
                            />
                        </TouchableOpacity>
                    </View>
                            <View style={{marginTop:20}}>
                                 <FlatList
                                    data={infoMascota}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.mascota_id.toString()}
                                  />
                                 </View>
                            </>

                        </View>

                    </View>

                </View>
        </Modal>
    </>
  )
}

const styles= StyleSheet.create({
    petContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
        margin:5,
        borderRadius:6,        
      },
      image: {
        width: 150,
        height: 150,
        borderRadius: 1000,
        marginBottom: 10,
      },
      Info:{
        width:70,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:6,
        borderWidth:1
      },
      InfoText:{
        color:"#000",
        fontSize:16    
      },
      contenBTN:{
        flexDirection:'row',
        marginBottom:10
      },
      TextTittle:{
        color:"#000",
        fontSize:20,
        marginBottom:4
    },
    TextConten:{
        color:"#000",
        fontSize:22,
        margin:10
    }
})

export default ModalMascota