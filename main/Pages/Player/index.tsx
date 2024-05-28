import React, {useState} from 'react';
import { 
    View, 
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,

 } from 'react-native';
import Video from 'react-native-video';
import dayjs from 'dayjs';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Share from 'react-native-share';

const Player = () => {
    const [isMute, setIsMute] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const { videoPath } = route.params;
    const parts = videoPath.split('_');
    const name = parts[0].substring(videoPath.lastIndexOf('/') + 1);
    const fontFamily = parts[1];
    const date = dayjs(parts[2].replace('.mp4', ''), 'YYYY-MM-DD').format('DD/MM/YYYY');

    const toggleMute = () => {
        setIsMute(prevIsMute => !prevIsMute);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const shareVideo = async (videoPath) => {
        try {
          await Share.open({
            url: `file://${videoPath}`,
            type: 'video/mp4',
          });
        } catch (error) {
          //console.error('Error sharing video:', error);
        }
      };

  return (
    <PaperProvider>
    <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Image source={require('../../Assets/Movie/back.png')} />
        </TouchableOpacity>
        <Text style={[styles.text, { fontFamily }]}>{name}</Text>
        <Text style={[styles.date, { fontFamily }]}>{date}</Text>
        <TouchableOpacity style={styles.option}>
        <Image source={require('../../Assets/File/option.png')} />
        </TouchableOpacity>
      <Video
        source={{ uri: videoPath }}
        style={styles.video}
        paused={!isPlaying}
        muted={isMute}
        resizeMode="contain"
      />
      <View style={styles.control}>
      <TouchableOpacity style={styles.volume} onPress={toggleMute}>
        <Image source={isMute ? require('../../Assets/Slide/volume-slash.png') : require('../../Assets/Slide/volume.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.play} onPress={togglePlayPause}>
            <Image source={isPlaying ? require('../../Assets/Slide/pause.png') : require('../../Assets/EditSlide/play.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.share} onPress={() => shareVideo(videoPath)}>
        <Image source={require('../../Assets/File/share.png')} />
        </TouchableOpacity>
      </View>
    </View>
    </PaperProvider>
  );
};

export default Player;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ff6b17',
  },
  video: {
    width: 393,
    height: 612,
    marginTop : 20,
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  text : {
    fontSize : 24,
    color: '#FFFFFF',
    marginTop : 30,
  },
  date :{
    fontSize : 20,
    color: '#FFFFFF',
    marginTop : 10,
  },
  option : {
    position : 'absolute',
    right : 30,
    top : 20,
  },
  control : {
    width : '100%',
    height : 150,
    flexDirection : 'row',
    alignItems : 'center'
  },
  volume : {
    bottom : 30,
    marginLeft : 50
  },
  play : {
    marginLeft : 100,
    bottom : 30
  },
  share : {
    marginLeft : 100,
    bottom : 30
  }
});
