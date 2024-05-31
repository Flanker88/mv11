import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import fonts from '../../constant/fonts';

const {width, height} = Dimensions.get('window');
const videoW = width * 0.85;
const videoH = height * 0.65;

const ResultSlide = ({route, navigation}) => {
  const {videoUri, selectedMusic} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{marginLeft: 10}}>
        <Image source={require('../../Assets/Movie/back.png')} />
      </TouchableOpacity>

      <Video source={{uri: videoUri}} style={styles.video} />

      {selectedMusic && (
        <View style={styles.songContainer}>
          <View style={styles.song}>
            <Image
              style={styles.imgSong}
              source={require('../../Assets/Slide/music.png')}
            />
            <Text numberOfLines={2} style={styles.nameSong}>
              {selectedMusic?.name}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b7bff',
  },
  songContainer: {
    flex: 1,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  song: {
    borderRadius: 20,
    backgroundColor: '#0657b5',
    width: width * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  imgSong: {
    width: 40,
    height: 40,
    marginRight: 6,
  },
  nameSong: {
    color: 'white',
    fontFamily: fonts.light,
    fontSize: 16,
    width: '80%',
  },

  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  video: {
    width: videoW,
    height: videoH,
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 1,
  },
});

export default ResultSlide;
