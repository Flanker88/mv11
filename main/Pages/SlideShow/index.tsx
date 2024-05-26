import React, { useEffect, useState } from 'react';
import { 
  View, 
  Image, 
  StyleSheet, 
  Text,
  TouchableOpacity, 
} from 'react-native';
import Video from 'react-native-video';  
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';
import { PaperProvider } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

const SlideShow = ({ route, navigation }) => {
  const { selectedImages } = route.params;
  const [videoUri, setVideoUri] = useState('');
  const [isMute, setIsMute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [musicFilePath, setMusicFilePath] = useState('');
  const [title, setTitle] = useState('Make slideshow');

  useEffect(() => {
    const createVideoSlideshow = async () => {
      if (selectedImages.length === 0) return;
      console.log(selectedImages,"AAABBB")
  
      const timestamp = new Date().getTime();
      const outputPath = `${RNFS.DocumentDirectoryPath}/slideshow_${timestamp}.mp4`;
  
      const inputFiles = selectedImages.map(image => `-loop 1 -t 2 -i "${image}"`).join(' ');
  
      const filterComplex = selectedImages.map(
        (_, index) => `[${index}:v]scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2,setsar=1[v${index}]`
      ).join('; ') + '; ' +
      selectedImages.map(
        (_, index) => `[v${index}]`
      ).join('') + `concat=n=${selectedImages.length}:v=1:a=0,format=yuv420p[v]`;

      let ffmpegCommand;

      if (musicFilePath) {
        console.log("Temporary Music Path:", musicFilePath);
        ffmpegCommand = `${inputFiles} -i "${musicFilePath}" -filter_complex "${filterComplex}" -map "[v]" -map ${selectedImages.length}:a -fps_mode vfr -pix_fmt yuv420p -shortest ${outputPath}`;
      } else {
        ffmpegCommand = `${inputFiles} -filter_complex "${filterComplex}" -map "[v]" -fps_mode vfr -pix_fmt yuv420p ${outputPath}`;
      }
  
      console.log('FFmpeg Command:', ffmpegCommand);
  
      await FFmpegKit.executeAsync(ffmpegCommand, async (session) => {
        // const returnCode = await session.getReturnCode();
        // const logs = await session.getAllLogsAsString();

        const outputUri = `file://${outputPath}`;
        console.log('FFmpeg process succeeded, output URI:', outputUri);
        setVideoUri(outputUri);
      });
    };
  
    createVideoSlideshow();
  }, [selectedImages, musicFilePath]);  

  useEffect(() => {
    console.log('Video URI:', videoUri);
  }, [videoUri]);

  const toggleMute = () => {
    setIsMute(prevIsMute => !prevIsMute);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const selectMusic = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      }); 
      console.log('Selected Music:', res[0]);
      const musicUri = res[0].uri;
      setSelectedMusic(musicUri);
      console.log('Selected Music URI:', musicUri);

      const musicFilePath = `${RNFS.TemporaryDirectoryPath}/temp_music_file.mp3`;
      await RNFS.copyFile(musicUri, musicFilePath);
      console.log('Temporary Music Path:', musicFilePath);
      setMusicFilePath(musicFilePath);

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        throw err;
      }
    }
  };

  const saveVideo = () => {
    if (videoUri) {
      navigation.navigate('ResultSlide', { videoUri });
    } else {
      console.log('No video URI available to save');
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Image source={require('../../Assets/Movie/back.png')} />
        </TouchableOpacity>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('TitleSlide', { setTitle })}>
            <Text style={styles.text}>{title}</Text>
          </TouchableOpacity>
          <Image source={require('../../Assets/Slide/line.png')} />
          <TouchableOpacity style={styles.volume} onPress={toggleMute}>
            <Image source={isMute ? require('../../Assets/Slide/volume-slash.png') : require('../../Assets/Slide/volume.png')} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.save} onPress={saveVideo}>
          <Image source={require('../../Assets/Slide/save.png')} />
          <Text style={styles.textSave}>Save</Text>
        </TouchableOpacity>
        <View style={styles.videoContainer}>
          <Video 
            source={{ uri: videoUri }} 
            style={styles.video} 
            paused={!isPlaying}
            muted={isMute}
          />
        </View>
        <View style={styles.bar}>
          <TouchableOpacity style={styles.music} onPress={selectMusic}>
            <Image source={require('../../Assets/Slide/music.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.play} onPress={togglePlayPause}>
            <Image source={isPlaying ? require('../../Assets/Slide/pause.png') : require('../../Assets/Slide/play.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menu} onPress={() => navigation.navigate('ImageVideo', { selectedImages })}>
            <Image source={require('../../Assets/Slide/menu.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b7bff',
  },
  back: {
    width: 24,
    height: 24,
    marginLeft: 20,
    marginTop: 35,
  },
  header: {
    marginLeft: 60,
    marginVertical: 35,
    position: 'absolute',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  volume: {
    position: 'absolute',
    marginLeft: 220,
  },
  save: {
    position: 'absolute',
    marginLeft: 310,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSave: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: '700',
  },
  videoContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  video: {
    width: '100%',
    height: 605,
  },
  bar: {
    alignItems: 'center',
    marginVertical: 20,
  },
  music: {
    marginRight: 300,
    marginTop: 30,
  },
  play: {
    top: 20,
    position: 'absolute',
  },
  menu: {
    right: 50,
    top: 30,
    position: 'absolute',
  },
});

export default SlideShow;
