

import React, { useState ,useEffect} from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchItems, updateItemInDB } from '../database/database';
import { setItems, updateItem } from '../redux/itemSlice';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EditItemScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const existingItem = route.params?.item;
  
  const [name, setName] = useState(existingItem?.name || '');
  const [description, setDescription] = useState(existingItem?.description || '');

  useEffect(() => {
   // console.log("Updated Name:", name);
 //   console.log("Updated Description:", description);
  }, [name,description]); 
 


const handleUpdate = () => {
  console.log("handle update is called");
  console.log("Attempting to update item:", existingItem);

  if (!existingItem || !existingItem.id) {
      console.log("Error: Item has no valid ID");
      Alert.alert("Error", "Invalid item selected for update.");
      return;
  }

  const trimmedName = name?.trim() || "";
  const trimmedDescription = description?.trim() || "";

  console.log("Trimmed Name:", trimmedName);
  console.log("Trimmed Description:", trimmedDescription);

  

  if (!trimmedName && !trimmedDescription) {
      Alert.alert("Error", "Name and Description cannot be empty!");
      return;
  }

  if (!trimmedName) {
      Alert.alert("Error", "Name cannot be empty!");
      return;
  }

  if (!trimmedDescription) {
      Alert.alert("Error", "Description cannot be empty!");
      return;
  }

  if (trimmedName.length > 15) {
      Alert.alert("Error", "Name cannot exceed 15 characters!");
      return;
  }

  if (trimmedDescription.length > 100) {
      Alert.alert("Error", "Description cannot exceed 100 characters!");
      return;
  }

 
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(trimmedName)) {
      Alert.alert("Error", "Name can only contain alphabets and spaces!");
      return;
  }

 // console.log("Updating item with ID:", existingItem.id, "New Name:", trimmedName, "New Description:", trimmedDescription);

 
  updateItemInDB(existingItem.id, trimmedName, trimmedDescription, () => {
    dispatch(updateItem({ id: existingItem.id, name: trimmedName, description: trimmedDescription }));
    navigation.goBack();
  });
};

  
  
  
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text)=> setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: wp(5),
  },
  header: {
    fontSize: wp(6),
    fontWeight: 'bold',
    marginBottom: hp(3),
    color: '#333',
  },
  input: {
    width: wp(80),
    height: hp(6),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
    backgroundColor: '#fff',
  },
  button: {
    width: wp(50),
    height: hp(7),
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(3),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontSize: wp(4.5),
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditItemScreen;
