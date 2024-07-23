import { View, Text, Modal, TouchableOpacity ,Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalAlerta = ({visible,onClose,}) => {
    const navigation = useNavigation();
    const clearAll = async () => {
        try {
          await AsyncStorage.clear();
          navigation.navigate('login')
          console.log('Todos los datos de AsyncStorage han sido eliminados.');
        } catch (error) {
          console.error('Error al eliminar todos los datos', error);
        }
      };
  return (
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
                        
                        height:"50%",
                        width:"70%",
                        backgroundColor:"#fff",
                        borderRadius:20
                       
                    }}
                    >
                        <View
                            style={{
                                height:45,
                                width:"100%",
                                flexDirection:"row",
                                justifyContent:"flex-end",
                                alignItems:'center',
                                // paddingHorizontal:10,
                            }}
                        >
                            <TouchableOpacity
                            onPress={onClose}
                            >
                                <Image 
                                    style={{
                                        width:30,
                                        height:30,
                                        margin:10
                                    }}
                                    source={require('../../public/img/cerrar.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{
                            margin:12
                        }} >
                            <View style={{justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={require('../../public/img/cerrar.png')} 
                                    style={{ width: 200, height: 200 }}
                                />
                            </View>
                            <View>
                                <Text style={{textAlign:'center', color:'#000', fontSize:20}}>
                                    ¿Estas seguro que quieres cerrar sesión?
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-end', margin:30, }}>
                                    <TouchableOpacity onPress={onClose}>
                                    <Text style={{ textAlign: 'right', fontSize:20,color:'#000' }}>NO</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-start', margin:30, marginLeft:120 }}>
                                    <TouchableOpacity onPress={()=>clearAll()}>
                                    <Text style={{ textAlign: 'left',fontSize:20, color:'#CC0000' }}>SI</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>

                    </View>

                </View>
        </Modal>
  )
}

export default ModalAlerta