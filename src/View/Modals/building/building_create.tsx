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

const BuildingCreate = ({
  isVisible,
  toggleModal,
  method,
}: {
  isVisible: boolean;
  toggleModal: () => void;
  method: string;
}) => {
  const [buildingName, setBuildingName] = useState('');
  const [warning, setWarning] = useState('');

  const handleBuildingNameChange = (text: string) => {
    setBuildingName(text);
    setWarning('');
  };

  const handleSubmit = async () => {
    if (!buildingName.trim()) {
      setWarning('Please enter a building name.');
      return;
    }

    setWarning('');
    setBuildingName('');
    toggleModal();

    const buildingCreate = {
      building_name: buildingName,
      created_by: 1,
    };

    try {
      const response = await fetch(
        `${SERVER_IP_ADDRESS}Admin/building/building_create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(buildingCreate),
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Building creation successful:', data);
      } else {
        console.error('Building creation failed:', response);
      }
    } catch (error) {
      console.error('Error during creation:', error);
    }
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
              <Text style={styles.cardTitle}>Create Building</Text>
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>
                  Building Name<Text style={styles.required}> *</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Building Name"
                  placeholderTextColor="gray"
                  value={buildingName}
                  onChangeText={handleBuildingNameChange}
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

export default BuildingCreate;
