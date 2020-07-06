import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import ResultDetail from './ResultDetail';

const ResultList = ({ title, results, navigation }) => {
  if (!results.length) {
    return null;
  }

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        keyExtractor={(result) => result.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ marginRight: 5 }}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
          >
            <ResultDetail result={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  title: {
    marginLeft: 15,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default withNavigation(ResultList);
