import * as React from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity
 } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import SearchBar from '../../Components/SearchBar';
import {useNavigation} from '@react-navigation/native';

const PosterMovie = () => {
  const navigation = useNavigation();
  return (
    <PaperProvider>
      <View style={styles.container}>
      <TouchableOpacity style={styles.back}
      onPress={() => {
        navigation.goBack();
      }}
      >
      <Image
        source={require('../../Assets/Movie/back.png')}
      />
      </TouchableOpacity>
      <SearchBar/>
      <TouchableOpacity style={styles.clusterSearch}>
      <Image
        source={require('../../Assets/Movie/background.png')}
      />
      <Image
      style={styles.search}
        source={require('../../Assets/Movie/search.png')}
      />
      <Text style={styles.text}>Search</Text>
      </TouchableOpacity>
      <View style = {{
        marginTop : 10,
        marginHorizontal : 20,
              }}>
        <Text style = {{
          color : '#ffffff',
          fontSize : 24,
          fontWeight : '700',
        }}>Top search</Text>
      </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    marginTop : 20,
    backgroundColor : '#00d147'
  },  
  back : {
    width : 24,
    height : 24,
    marginLeft : 20,
    marginTop : 20,
    position : 'absolute'
  },
  clusterSearch : {
    position : 'absolute',
    marginLeft : 300,
    marginTop : 10
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
    fontWeight : '700',
    marginLeft : 35,
    paddingTop : 7,
    color : '#000000'
  }
});

export default PosterMovie;
