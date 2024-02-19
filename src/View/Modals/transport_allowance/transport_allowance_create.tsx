import {SERVER_IP_ADDRESS} from '@env';
import React, {useState} from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const TransportAllowanceCreate = ({
  isVisible,
  toggleModal,
  
}: {
  isVisible: boolean;
  toggleModal: () => void;
  method: string;
}) => {
  const [mobile, setMobile] = useState('');
  const [warning, setWarning] = useState('');

  const MobileChange = (text: string) => {
    setMobile(text);
    setWarning('');
  };

  const handleSubmit = async () => {
    if (!setMobile.trim()) {
      setWarning('Please enter a value.');
      return;
    }

    setWarning('');
    setMobile('');
    toggleModal();

    

    
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={toggleModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>TransportAllowanceCreate</Text>
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>
                Mobile Number<Text style={styles.required}> *</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Mobile Number"
                  placeholderTextColor="red"
                  value={mobile}
                  onChangeText={MobileChange}
                />


              
                {warning ? <Text style={styles.warning}>{warning}</Text> : null}
              </View>
              <View style={styles.submitButton}>
                <Button title="Submit" onPress={handleSubmit} color="#007bff" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '80%',
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 24,
  },
  cardBody: {},
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
  },
  submitButton: {
    marginTop: 10,
  },
  warning: {
    color: 'red',
    marginTop: 5,
  },
  required: {
    color: 'red',
  },
});

export default TransportAllowanceCreate;