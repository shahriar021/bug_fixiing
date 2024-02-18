import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
//import { Ionicons } from '@expo/vector-icons'; // Import your preferred icon library

const MobileAllowanceCreate = ({isVisible,
  toggleModal}) => {



  return (
    <Modal
      animationType="slide"  // Choose animation type as per your preference
      transparent={true}
      visible={isVisible}
      onRequestClose={toggleModal}>
    
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Mobile Allowance Create</Text>
          <TextInput placeholder='your amount: '/>
          <TouchableOpacity onPress={() => toggleModal}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MobileAllowanceCreate;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    marginTop: 10,
    color: 'blue', // You can customize the color
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
