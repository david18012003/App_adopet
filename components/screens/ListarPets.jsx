import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import { ip } from '../IP.jsx';
import ModalMascota from '../Modales/ModalMascota.jsx';
import ModalChat from '../Modales/ModalChat.jsx';
import Header from '../componen/Header.jsx';

const { width } = Dimensions.get('window');

const ListarPets = () => {
  const [pets, setPets] = useState([]);
  const [viewModal, setViewModal] = useState(false)
  const [id_receptor, setId_receptor] = useState('')
  const [idMascota, setIdMascota]= useState('')
  const [chatModal, setChatModal]=useState(false)
  const [foto, setFoto] = useState('')

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`${ip}/mascotas/listar`);
        setPets(response.data.respuesta);
      } catch (error) {
        console.error('Error al optener las mascotas:', error);
      }
    };

    fetchPets();
  }, []);

  const Informacion = (id)=>{
    setViewModal(!viewModal)
    setIdMascota(id);
    console.log(id);
  }
  const chat=(id_receptor,name_foto, name_user_env)=>{
    setChatModal(!chatModal)
    setId_receptor(id_receptor)
    setFoto(name_foto)

    console.log(chatModal);
  }

  const renderItem = ({ item }) => (
    <View style={[styles.petContainer, [item.genero === "Macho" ? {borderColor:"#25AF00",backgroundColor:"#D6F8C5"}:{borderColor:"#FF776F",backgroundColor:"#FCDCDA"}]]}>
      <Text style={styles.TextTittle}>{item.nombre_pet}</Text>
      <Image source={{ uri: `${ip}/img/${item.foto}` }} style={styles.image} />
      <View style={styles.contenBTN}>
      <TouchableOpacity style={[styles.Info, {backgroundColor:"#85FFFB", marginEnd:10}]}>
    <Text style={[styles.InfoText,]} onPress={()=>Informacion(item.mascota_id)}>
          Mas Info
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.Info, {backgroundColor:"#85FFFB", }]} onPress={()=>chat(item.usuario_id, item.foto)}>
        <Text style={{color:"#000",}}>
          Adoptar
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
    <Header title={'adopet'}/>

    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.input} placeholder='Buscar pet ...' placeholderTextColor={"#000"}/>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
     <View style={{marginTop:20}}>
     <FlatList
        data={pets}
        renderItem={renderItem}
        keyExtractor={(item) => item.mascota_id.toString()}
        numColumns={2}
      />
     </View>
    </View>
    <ModalMascota 
          visible={viewModal}
          id={idMascota}
          onClose={()=>Informacion()}
    />
    <ModalChat
          visible={chatModal}
          foto={foto}
          id_userReceptor={id_receptor}
          onClose={()=>chat()}
    />
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom:45
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width: width * 0.7,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  petContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth:2,
    margin:5,
    borderRadius:6,
    
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
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
}
});

export default ListarPets;
