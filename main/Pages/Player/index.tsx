import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import Share from 'react-native-share';

const {width, height} = Dimensions.get('window');
const videoH = height * 0.7;

const Player = ({route}) => {
  const {videoPath} = route.params;
  const [isMute, setIsMute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigation = useNavigation();
  const parts = videoPath.split('_');
  const name = parts[0].substring(videoPath.lastIndexOf('/') + 1);
  const fontFamily = parts[1];
  const date = dayjs(parts[2].replace('.mp4', ''), 'YYYY-MM-DD').format(
    'DD/MM/YYYY',
  );

  const toggleMute = () => {
    setIsMute(prevIsMute => !prevIsMute);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const shareVideo = async videoPath => {
    try {
      await Share.open({
        url: `file://${videoPath}`,
        type: 'video/mp4',
      });
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: '4%',
        }}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../Assets/Movie/back.png')} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.text, {fontFamily}]}>{name}</Text>
          <Text style={[styles.date, {fontFamily}]}>{date}</Text>
        </View>
        <Image source={require('../../Assets/File/option.png')} />
      </View>

      <Video
        source={{uri: videoPath}}
        style={styles.video}
        paused={!isPlaying}
        muted={isMute}
        resizeMode="contain"
      />
      <View style={styles.control}>
        <TouchableOpacity onPress={toggleMute}>
          <Image
            source={
              isMute
                ? require('../../Assets/Slide/volume-slash.png')
                : require('../../Assets/Slide/volume.png')
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause}>
          <Image
            source={
              isPlaying
                ? require('../../Assets/Slide/pause.png')
                : require('../../Assets/EditSlide/play.png')
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => shareVideo(videoPath)}>
          <Image source={require('../../Assets/File/share.png')} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Player;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff6b17',
  },
  video: {
    width: width,
    height: videoH,
    marginTop: 20,
  },
  text: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  date: {
    fontSize: 15,
    color: '#FFFFFF',
    marginTop: 10,
    textAlign: 'center',
  },
  control: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
