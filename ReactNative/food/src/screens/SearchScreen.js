import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import SearchBar from '../components/SearchBar';
import ResultList from '../components/ResultList';
import useResult from '../hooks/useResult';

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [searchApi, result, errorMessage] = useResult();

  // price === '$' || '$$' || '$$$'
  const filterResultByPrice = (price) =>
    result.filter((data) => data.price === price);

  return (
    <>
      <SearchBar
        term={term}
        handleTerm={setTerm}
        handleSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView>
        <ResultList results={filterResultByPrice('$')} title='Cost Effective' />
        <ResultList results={filterResultByPrice('$$')} title='Bit Pricier' />
        <ResultList results={filterResultByPrice('$$$')} title='Bit Spender' />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
