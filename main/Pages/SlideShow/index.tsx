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
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);

  useEffect(() => {
    const createVideoSlideshow = async () => {
      if (selectedImages.length === 0) return;

      const timestamp = new Date().getTime();
      const outputPath = `${RNFS.DocumentDirectoryPath}/slideshow_${timestamp}.mp4`;

      const inputFiles = selectedImages.map(image => `-loop 1 -t 3 -i "${image}"`).join(' ');

      const filterComplex = selectedImages.map(
        (_, index) => `[${index}:v]scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2,setsar=1[v${index}]`
      ).join('; ') + '; ' +
      selectedImages.map(
        (_, index) => `[v${index}]`
      ).join('') + `concat=n=${selectedImages.length}:v=1:a=0,format=yuv420p[v]`;

      let ffmpegCommand = `${inputFiles} -filter_complex "${filterComplex}" -map "[v]" -fps_mode vfr -pix_fmt yuv420p ${outputPath}`;

      if (selectedMusic) {
        ffmpegCommand = `${inputFiles} -i "${selectedMusic}" -filter_complex "${filterComplex}" -map "[v]" -map ${selectedImages.length}:a -fps_mode vfr -pix_fmt yuv420p -shortest ${outputPath}`;
      }

      console.log('FFmpeg Command:', ffmpegCommand);

      await FFmpegKit.executeAsync(ffmpegCommand, async (session) => {
        const returnCode = await session.getReturnCode();
        const logs = await session.getAllLogsAsString();

        if (returnCode.isValueSuccess()) {
          const outputUri = `file://${outputPath}`;
          console.log('FFmpeg process succeeded, output URI:', outputUri);
          setVideoUri(outputUri);
        } else {
          console.error('FFmpeg process failed with return code:', returnCode);
          console.error('FFmpeg process logs:', logs);
        }
      });
    };

    createVideoSlideshow();
  }, [selectedImages, selectedMusic]);

  useEffect(() => {
    console.log('Video URI:', videoUri);
  }, [videoUri]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const selectMusic = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      setSelectedMusic(res[0].uri);
      console.log('Selected Music:', res[0].uri);
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
          <Text style={styles.text}>Make slideshow</Text>
          <Image source={require('../../Assets/Slide/line.png')} />
          <TouchableOpacity style={styles.volume}>
            <Image source={require('../../Assets/Slide/volume.png')} />
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
          />
        </View>
        <View style={styles.bar}>
          <TouchableOpacity style={styles.music} onPress={selectMusic}>
            <Image source={require('../../Assets/Slide/music.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.play} onPress={togglePlayPause}>
            <Image source={isPlaying ? require('../../Assets/Slide/pause.png') : require('../../Assets/Slide/play.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menu}>
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
