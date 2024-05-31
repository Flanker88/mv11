import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const SearchBar = ({onSearch}: any) => {
  const [query, setQuery] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter movie & TV show"
        placeholderTextColor={'#ffffff'}
        style={styles.input}
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity
        style={styles.clusterSearch}
        onPress={() => onSearch(query)}>
        <Image
          style={styles.search}
          source={require('../Assets/Movie/search.png')}
        />
        <Text style={styles.text}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    borderBottomEndRadius: 30,
  },
  input: {
    width: '70%',
    fontSize: 16,
  },

  clusterSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 22,
    padding: 8,
  },
  search: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
  text: {
    fontSize: 16,
  },
});
