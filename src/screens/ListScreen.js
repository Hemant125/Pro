import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { fetchItems, deleteItemFromDB } from '../database/database';
import { setItems } from '../redux/itemSlice';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ListScreen = ({ navigation }) => {
  const items = useSelector(state => state.items);
  const dispatch = useDispatch();

 
  useEffect(() => {
    fetchItems((data) => {
      dispatch(setItems(data)); 
    });
  }, []);
  

  const handleDelete = (id) => {
    deleteItemFromDB(id, () => {
      fetchItems((data) => dispatch(setItems(data))); 
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Add New Item')} style={styles.headerButton}>
          <Icon name="plus" size={hp(3)} color="#007bff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Entypo name="block" size={hp(15)} color="#000" />
          <Text style={styles.emptyText}>No items are there, please click on + icon to add items. </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.textContainer}>
                <View style={styles.row}>
                  <Text style={styles.label}>Name:</Text>
                  <Text style={styles.value}>{item.name}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Description:</Text>
                  <Text style={styles.value}>{item.description}</Text>
                </View>
              </View>

              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Edit Item', { item })}>
                  <Icon name="pencil" size={hp(4)} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Icon name="trash" size={hp(4)} color="#dc3545" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
    backgroundColor: '#f8f9fa',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    padding: wp(2),
    textAlign: 'center',
    fontSize: hp(3),
    fontWeight: 'bold',
    color: '#888',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: hp(2),
    borderRadius: wp(3),
    marginBottom: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  label: {
    fontSize: hp(2.2),
    fontWeight: 'bold',
    color: '#555',
    width: wp(25),
  },
  value: {
    fontSize: hp(2.2),
    color: '#000',
    flex: 1,
  },
  iconContainer: {
    paddingLeft: wp(1),
    flexDirection: 'row',
    gap: wp(3.2),
  },
  headerButton: {
    

   
    height: '100%',  // 
    justifyContent: 'center',  
    alignItems: 'center',  
    paddingHorizontal: wp(2), 
    marginRight: wp(5),
  },
});

export default ListScreen;


