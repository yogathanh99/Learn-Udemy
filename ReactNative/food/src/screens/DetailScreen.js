import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

import yelp from '../api/yelp';

const DetailScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam('id');

  const handleResult = async (id) => {
    const detail = await yelp.get(`/${id}`);

    setResult(detail.data);
  };

  useEffect(() => {
    handleResult(id);
  }, [id]);

  if (!result) {
    return null;
  }

  return (
    <View>
      <Text>{result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => (
          <Image style={styles.image} source={{ uri: item }} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
  },
});

export default DetailScreen;
