import { View, Text, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import React from 'react';
import Mensajes from '../chats/Mensajes.jsx';
import FormRegistroUsers from '../componen/FormRegistroUsers.jsx';

const ModalRegistro = ({ visible, onClose}) => {
  return (
    <Modal
      animationType="slide"
      onDismiss={() => console.log("hola modal")}
      onShow={() => console.log("hola mundo")}
      transparent
      visible={visible}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={onClose}>
              <Image
                style={styles.closeButtonImage}
                source={require('../../public/img/cerrar.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <ScrollView>
            <FormRegistroUsers modalClose={onClose} visible={visible}/>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = {
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(1,1,1, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: "65%",
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  closeButtonContainer: {
    height: 45,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  closeButtonImage: {
    margin: 15,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 12,
  },
};

export default ModalRegistro;
