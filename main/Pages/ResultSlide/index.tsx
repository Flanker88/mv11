import React from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Image
} from 'react-native';
import Video from 'react-native-video';
import { PaperProvider } from 'react-native-paper';

const ResultSlide = ({ route, navigation }) => {
  const { videoUri } = route.params;

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Image source={require('../../Assets/Movie/back.png')} />
        </TouchableOpacity>
        <View style={styles.videoContainer}>
          <Video 
            source={{ uri: videoUri }} 
            style={styles.video} 
            controls={true}
          />
          <View style={styles.song}>
            <Image style={styles.imgSong} source={require('../../Assets/Movie/back.png')} />
            <Text style={styles.nameSong}>AAAAAAA</Text>
            <Text style={styles.nameSinger}>AAAAAAA</Text>
            <TouchableOpacity style={styles.change}>
            <Image source={require('../../Assets/EditSlide/Change.png')} />
            <Text style={styles.textChange}>Change</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b7bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  song : {
    width : 363,
    height : 83,
    marginTop : 20,
    borderRadius : 20,
    backgroundColor : '#0657b5'
  },
  imgSong : {
    marginTop : 10,
    width : 64,
    height : 64,
    borderRadius : 10,
  },
  nameSong : {
    marginLeft : 80,
    marginTop : 20,
    color : '#ffffff',
    position : 'absolute',
    fontSize : 16,
    fontFamily : 'josefin-slab-latin-700-normal',
  },
  nameSinger : {
    marginLeft : 80,
    marginTop : 50,
    color : '#ffffff',
    position : 'absolute',
    fontSize : 16,
    fontFamily : 'josefin-slab-latin-700-normal',
  },
  change :{
    //justifyContent : 'center',
    alignItems : 'center',
    marginLeft : 220,
    marginTop : 8,
    position : 'absolute'
  },
  textChange : {
    marginTop : 25,
    color : '#474747',
    fontSize : 16,
    fontFamily : 'josefin-slab-latin-700-normal',
    position : 'absolute',
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    justifyContent : 'center',
    alignItems : 'center',
    marginTop : 20
    
  },
  video: {
    width: 463,
    height: 643,
    
  },
});

export default ResultSlide;
