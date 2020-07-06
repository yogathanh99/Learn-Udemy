import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const SearchBar = ({ term, handleTerm, handleSubmit }) => {
  return (
    <View style={styles.background}>
      <AntDesign style={styles.icon} name='search1' size={30} color='black' />
      <TextInput
        value={term}
        onChangeText={handleTerm}
        onEndEditing={handleSubmit}
        style={styles.inputStyle}
        placeholder='Search'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#f0eeee',
    // backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 15,
    marginBottom: 10,
    flexDirection: 'row',
    height: 50,
  },
  icon: {
    marginHorizontal: 5,
  },
  inputStyle: {
    fontSize: 18,
    flex: 1,
  },
});

export default SearchBar;
