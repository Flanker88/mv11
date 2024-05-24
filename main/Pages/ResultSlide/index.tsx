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
   
  },
  video: {
    width: 463,
    height: 665,
  },
});

export default ResultSlide;
