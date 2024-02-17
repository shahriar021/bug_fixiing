import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import { Ionicons } from '@expo/vector-icons'; // Import your preferred icon library

const TransportAllowanceCreate = ({ isVisible, closeModal }) => {
  return (
    <Modal
      animationType="slide"  // Choose animation type as per your preference
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        closeModal();  // Add a function to close the modal
      }}
    ><Text>transport</Text>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Transport Allowance Create</Text>
          <TouchableOpacity onPress={closeModal}>
            {/* //<Ionicons name="close-circle" size={24} color="black" /> */}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TransportAllowanceCreate;

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
});
