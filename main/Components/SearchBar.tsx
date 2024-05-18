import * as React from 'react';
import { 
    View, 
    Text,
    TextInput,
    StyleSheet, 
} from 'react-native';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Enter movie & TV show'
        placeholderTextColor={'#ffffff'}
        style = {styles.input}

      />
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
        fontWeight :'700',
        fontSize : 16,
        marginLeft : 50,
        borderBottomWidth : 1,
        borderColor : '#ffffff'
    }
})