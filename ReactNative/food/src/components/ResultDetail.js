import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const ResultDetail = ({ result }) => (
  <View>
    <Image style={styles.image} source={{ uri: result.image_url }} />
    <Text style={styles.name}>{result.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },

  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
  },

  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default ResultDetail;
