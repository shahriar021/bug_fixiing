// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, {useState, useEffect} from 'react';
// import {FaRegTrashAlt} from 'react-icons/fa';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   ScrollView,
//   Modal,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
// } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

// // import {IconButton} from 'react-native-paper';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const MobileAllowance = () => {
//   const ID = 'yourUserID'; // Replace with your user ID or fetch dynamically

//   const [showModal, setShowModal] = useState(false);
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [selectedDatetime, setSelectedDatetime] = useState(new Date());
//   const [mobile, setMobile] = useState('');
//   const [amount, setAmount] = useState('');
//   const [mobileAllowanceList, setMobileAllowanceList] = useState([]);
//   const [mobileAllowanceLists, setMobileAllowanceLists] = useState([]);
//   const [recharge_user, setRecharge_user] = useState(1);
//   const [created_by, setCreated_by] = useState(1);

//   useEffect(() => {
//     fetch(`http://192.168.0.125:5002/mobile_allowance/mobile_allowance_list`)
//       .then(res => res.json())
//       .then(data => setMobileAllowanceLists(data));
//   }, []);
//   console.log(mobileAllowanceList);
//   const handleDatetimeChange = date => {
//     setSelectedDatetime(date);
//     setDatePickerVisibility(false);
//   };

//   const MobileChange = text => {
//     setMobile(text);
//   };

//   const AmountChange = text => {
//     setAmount(text);
//   };
//   const createdBy = text => {
//     setCreated_by(text);
//   };
//   const rechargeUser = text => {
//     setRecharge_user(text);
//   };

//   const MobileAllowanceCreateBtn = async event => {
//     event.preventDefault();
//     // Handle Mobile Allowance creation
//     const newMobileAllowanceItem = {
//       recharge_time: selectedDatetime,
//       mobile,
//       amount,
//       recharge_user: 1,
//       created_by: 1,
//     };
//     console.log(newMobileAllowanceItem);
//     try {
//       const response = await fetch(
//         `http://192.168.0.125:5002/mobile_allowance/mobile_allowance_create`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(newMobileAllowanceItem),
//         },
//       );

//       if (response.ok) {
//         // Handle successful login
//         const data = await response.json();
//         console.log('mobile allowance created successful:', data);
//         // Store user information in AsyncStorage if needed
//         await AsyncStorage.setItem('email');
//         navigation.navigate('Home');
//       } else {
//         // Handle unsuccessful login
//         console.error('transport allowance creation failed:', response);
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     }

//     setMobileAllowanceList(prevList => [newMobileAllowanceItem, ...prevList]);
//     setShowModal(false);
//   };

//   useEffect(() => {
//     deleteItem();
//   }, []);

//   const deleteItem = id => {
//     console.log(id);

//     fetch(
//       `http://192.168.0.125:5002/mobile_allowance/mobile_allowance_delete/${id}`,
//       {
//         method: 'POST',
//       },
//     )
//       .then(Response => Response.json())
//       .then(data => {
//         console.log(data);
//       });
//   };
//   return (
//     <View style={{padding: 10, margin: 10}}>
//       {/* Header */}
//       {/* ... Your header JSX here ... */}
//       <View style={styles.centeredView}>
//         <Modal
//           visible={showModal}
//           onRequestClose={() => setShowModal(false)}
//           animationType="slide"
//           transparent={true}>
//           <View style={styles.centeredView}>
//             <View style={styles.modalView}>
//               {/* Modal content */}
//               <Text style={styles.textStyle}>Create Mobile Allowance</Text>
//               <Button
//                 title="Close Modal"
//                 onPress={() => setShowModal(false)}
//                 style={styles.buttonClose}
//               />

//               {/* Form for creating Mobile Allowance */}
//               <Text style={styles.label}>
//                 Mobile Number<Text style={styles.required}> *</Text>
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Mobile Number"
//                 value={mobile}
//                 onChangeText={MobileChange}
//               />
//               <Text style={styles.label}>
//                 Amount<Text style={styles.required}> *</Text>
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Amount"
//                 value={amount}
//                 onChangeText={AmountChange}
//                 keyboardType="numeric"
//               />
//               {/* <TextInput
//                 style={styles.input}
//                 placeholder="Amount"
//                 value={created_by}
//                 onChangeText={createdBy}
//                 keyboardType="numeric"
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Amount"
//                 value={recharge_user}
//                 onChangeText={rechargeUser}
//                 keyboardType="numeric"
//               /> */}
//               <Button
//                 style={styles.button}
//                 title="Pick Date and Time"
//                 onPress={() => setDatePickerVisibility(true)}
//               />
//               <DateTimePickerModal
//                 isVisible={isDatePickerVisible}
//                 mode="datetime"
//                 onConfirm={handleDatetimeChange}
//                 onCancel={() => setDatePickerVisibility(false)}
//               />
//               <Button
//                 style={styles.buttonOpen}
//                 title="Create Mobile Allowance"
//                 onPress={MobileAllowanceCreateBtn}
//               />
//             </View>
//           </View>
//         </Modal>
//       </View>

//       <View>{/* Button to open the modal */}</View>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         {/* Mobile Allowance List */}
//         {mobileAllowanceLists.map((item, i) => (
//           <View style={styles.listItemContainer} key={i}>
//             <Text style={styles.mobileText}>Mobile:{item.mobile}</Text>
//             <Text style={styles.amountText}>Amount:{item.amount} Tk.</Text>
//             <Text style={styles.dateText}>
//               Date:{item.recharge_time.toString()}
//             </Text>

//             {/* <IconButton
//               icon="delete"
//               iconColor="red"
//               size={20}
//               onPress={() => deleteItem(item.id)}
//             /> */}
//             {/* <IconButton
//               icon={() => <Icon name="delete" size={20} color="red" />}
//               onPress={() => deleteItem(item.id)}
//             /> */}
          
//           </View>
//         ))}
//         <Button
//           style={styles.buttonOpen}
//           title="Create Mobile Allowance"
//           onPress={() => setShowModal(true)}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',

//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//   },

//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     width: '80%',
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//     color: 'red',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     color: 'black',
//     width: '80%',
//   },

//   label: {
//     marginBottom: 5,
//     color: '#333',
//     fontWeight: 'bold',
//   },
//   required: {
//     color: 'red',
//   },

//   container: {
//     flex: 1,
//     paddingTop: 22,
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },

//   scrollView: {
//     padding: 16,
//   },
//   listItemContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 12,
//     elevation: 2, // for Android shadow
//     shadowColor: '#000', // for iOS shadow
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   mobileText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   amountText: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 8,
//   },
//   dateText: {
//     fontSize: 14,
//     color: '#777',
//   },
// });

// export default MobileAllowance;




































































// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {FaRegTrashAlt} from 'react-icons/fa';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Modal,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

// import {IconButton} from 'react-native-paper';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MobileAllowanceAll = () => {
  
  const ID = 'yourUserID'; // Replace with your user ID or fetch dynamically

  const [showModal, setShowModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDatetime, setSelectedDatetime] = useState(new Date());
  const [mobile, setMobile] = useState('');
  const [amount, setAmount] = useState('');
  const [mobileAllowanceList, setMobileAllowanceList] = useState([]);
  const [mobileAllowanceLists, setMobileAllowanceLists] = useState([]);
  const [recharge_user, setRecharge_user] = useState(1);
  const [created_by, setCreated_by] = useState(1);

  const [refresh,setRefresh]=useState(false)


  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`http://192.168.0.111:5002/mobile_allowance/mobile_allowance_list`)
      .then(res => res.json())
      .then(data => {
        setMobileAllowanceLists(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(true); // In case of an error, set loading to false
      });
  }, []);
  console.log(mobileAllowanceList);
  const handleDatetimeChange = date => {
    setSelectedDatetime(date);
    setDatePickerVisibility(false);
  };

  const MobileChange = text => {
    setMobile(text);
  };

  const AmountChange = text => {
    setAmount(text);
  };
  const createdBy = text => {
    setCreated_by(text);
  };
  const rechargeUser = text => {
    setRecharge_user(text);
  };

  const MobileAllowanceCreateBtn = async event => {
    event.preventDefault();
    // Handle Mobile Allowance creation
    const newMobileAllowanceItem = {
      recharge_time: selectedDatetime,
      mobile,
      amount,
      recharge_user: 1,
      created_by: 1,
    };
    console.log(newMobileAllowanceItem);
    try {
      const response = await fetch(
        
        `http://192.168.0.111:5002/mobile_allowance/mobile_allowance_create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMobileAllowanceItem),
        },
      );

      if (response.ok) {
        // Handle successful login
        const data = await response.json();
        console.log('mobile allowance created successful:', data);
        // Store user information in AsyncStorage if needed
        // await AsyncStorage.setItem('email');
        // navigation.navigate('Home');
      } else {
        // Handle unsuccessful login
        console.error('transport allowance creation failed:', response);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }

    setMobileAllowanceList(prevList => [newMobileAllowanceItem, ...prevList]);
    setShowModal(false);
  };

  useEffect(() => {
    deleteItem();
  },[]);

  const deleteItem = id => {
    console.log(id);

    fetch(
      `http://192.168.0.111:5002/mobile_allowance/mobile_allowance_delete/${id}`,
      {
        method: 'POST',
      },
    )
      .then(Response => Response.json())
      .then(data => {
        console.log(data);
      });

      setRefresh(prevRef =>!prevRef)
  };
  return (
    <View style={{padding: 10, margin: 10}}>
      {/* Header */}
      {/* ... Your header JSX here ... */}
      <View style={styles.centeredView}>
        <Modal
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
          animationType="slide"
          transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* Modal content */}
              <Text style={styles.textStyle}>Create Mobile Allowance</Text>
              <Button
                title="Close Modal"
                onPress={() => setShowModal(false)}
                style={styles.buttonClose}
              />

              {/* Form for creating Mobile Allowance */}
              <Text style={styles.label}>
                Mobile Number<Text style={styles.required}> *</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                value={mobile}
                onChangeText={MobileChange}
              />
              <Text style={styles.label}>
                Amount<Text style={styles.required}> *</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Amount"
                value={amount}
                onChangeText={AmountChange}
                keyboardType="numeric"
              />
              {/* <TextInput
                style={styles.input}
                placeholder="Amount"
                value={created_by}
                onChangeText={createdBy}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Amount"
                value={recharge_user}
                onChangeText={rechargeUser}
                keyboardType="numeric"
              /> */}
              <Button
                style={styles.button}
                title="Pick Date and Time"
                onPress={() => setDatePickerVisibility(true)}
              />
              {/* <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleDatetimeChange}
                onCancel={() => setDatePickerVisibility(false)}
              /> */}
              <Button
                style={styles.buttonOpen}
                title="Create Mobile Allowance"
                onPress={MobileAllowanceCreateBtn}
              />
            </View>
          </View>
        </Modal>
      </View>

      <View>{/* Button to open the modal */}</View>
      {isLoading ?
      (
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}><ActivityIndicator size="large" color="#0000ff" /></View>
        
      ) 
    :(<ScrollView contentContainerStyle={styles.scrollView}>
      {/* Mobile Allowance List */}
      {mobileAllowanceLists.map((item, i) => (
        <View style={styles.listItemContainer} key={i}>
          
          <Text style={styles.mobileText}>Mobile:{item.mobile}</Text>
          <Text style={styles.amountText}>Amount:{item.amount} Tk.</Text>
          <Text style={styles.dateText}>
            Date:{item.recharge_time.toString()}
          </Text>

          {/* <IconButton
            icon="delete"
            iconColor="red"
            size={20}
            onPress={() => deleteItem(item.id)}
          /> */}
          {/* <IconButton
            icon={() => <Icon name="delete" size={20} color="red" />}
            onPress={() => deleteItem(item.id)}
          /> */}
          <Button title='delete'
          color={"red"}
           onPress={()=>deleteItem(item.id)}
          />
        
        </View>
      ))}
      {/* <Button
        style={styles.buttonOpen}
        title="Create Mobile Allowance"
        onPress={() => setShowModal(true)}
      /> */}
    </ScrollView>)
    }
      
    </View>
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
    width: '80%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    color: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
    width: '80%',
  },

  label: {
    marginBottom: 5,
    color: '#333',
    fontWeight: 'bold',
  },
  required: {
    color: 'red',
  },

  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

  scrollView: {
    padding: 16,
  },
  listItemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  mobileText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  amountText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#777',
  },
});

export default MobileAllowanceAll;
