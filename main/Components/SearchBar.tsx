import React, { useState } from 'react';
import { 
    View, 
    Text,
    TextInput,
    StyleSheet, 
    Button, 
    TouchableOpacity,
    Image,
} from 'react-native';

const SearchBar = ({ onSearch } : any) => {
  const [query, setQuery] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Enter movie & TV show'
        placeholderTextColor={'#ffffff'}
      
        style = {styles.input}
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.clusterSearch}
      onPress={() => onSearch(query)}
      >
          <Image source={require('../Assets/Movie/background.png')} />
          <Image style={styles.search} source={require('../Assets/Movie/search.png')} />
          <Text style={styles.text}>Search</Text>
        </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
    container : {
        margin : 10
    },
    input : {
        width : 330,
        height : 36,
        padding : 5,
        borderRadius : 10,
        fontFamily : 'josefin-slab-latin-700-normal',
        fontSize : 16,
        marginLeft : 50,
        borderBottomWidth : 1,
        borderColor : '#ffffff'
    },
    clusterSearch : {
      position : 'absolute',
      marginLeft : 300,
    },
    search : {
      margin : 8,
      width : 18,
      height : 18,
      position : 'absolute'
    },
    text : {
      position : 'absolute',
      fontSize : 16,
      marginLeft : 35,
      paddingTop : 7,
      color : '#000000',
      fontFamily : 'josefin-slab-latin-700-normal',
    },
})