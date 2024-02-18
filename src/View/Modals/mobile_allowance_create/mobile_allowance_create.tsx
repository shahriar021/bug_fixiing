import React, { useState } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, Text, View, Modal, Button } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
//import { Ionicons } from '@expo/vector-icons'; // Import your preferred icon library

const MobileAllowanceCreate = ({isVisible,
  toggleModal}) => {

    const [amount, setAmount] = useState("500");
    const [number, setNumber] =  useState<any>(99658741);

    const handleAmountChange = (text:any) => {
      // Handle any logic related to amount change if needed
      setAmount(text);
    };

    const handleNumberChange =(num:any)=>{
      setNumber(num)
    }

    const handleClose = () => {
      // Handle any logic before closing the modal if needed
      toggleModal();
    };

  return (
    <Modal
      animationType="slide"  
      transparent={true}
      visible={isVisible}
      onRequestClose={toggleModal}>
    
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Mobile Allowance Create</Text>
          <TextInput
           placeholder='Enter your amount'
          onChangeText={handleAmountChange}
          value={amount}
          />
          <TextInput
          placeholder='Enter your number'
          keyboardType="numeric"
          onChangeText={handleNumberChange}
          value={number.toString()}  // Convert number to string
          />

          <Button title='close'
            color='#984565'
            onPress={()=>handleClose()}
          />

            
          
          
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
    color: 'red', // You can customize the color
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
