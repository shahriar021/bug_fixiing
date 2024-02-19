import { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const MobileAllowanceCreate = ({ isVisible, toggleModal }) => {
  const [mobile, setMobile] = useState('');
  const [amount, setAmount] = useState('');

  const MobileChange = text => {
    setMobile(text);
  };

  const AmountChange = text => {
    setAmount(text);
  };

  const handleClose = () => {
    toggleModal();
  };

  return (


    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}
    >


      <View style={styles.centeredView}>
        <View style={styles.modalView}>

          {/* <Text>Mobile Allowance Create</Text> */}
          
          {/* <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={mobile}
            onChangeText={MobileChange}
          /> */}

          <TextInput
            style={styles.input}
            placeholder="Amount"
            // value={amount}
            autoFocus={true}
            // onChangeText={AmountChange}
            // keyboardType="numeric"
          />

          {/* <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleClose} />
          </View> */}

          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>

            <Text style={styles.closeButtonText}>Close</Text>

          </TouchableOpacity>

        </View>
       </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
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
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
    width: '80%',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 18,
  },
});

export default MobileAllowanceCreate;
