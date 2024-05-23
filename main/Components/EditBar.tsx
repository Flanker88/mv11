import React, { useEffect, useState} from 'react';
import { 
  View, 
  Image, 
  StyleSheet, 
  Text,
  TouchableOpacity, 
} from 'react-native';
import Video from 'react-native-video';  // Import Video từ react-native-video
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';
import { PaperProvider } from 'react-native-paper';

const SlideShow = ({ route, navigation }) => {
  const { selectedImages } = route.params;
  const [videoUri, setVideoUri] = useState('');
  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái phát/tạm dừng
  const videoRef = useRef(null);

  useEffect(() => {
    const createVideoSlideshow = async () => {
      if (selectedImages.length === 0) return;

      const timestamp = new Date().getTime();
      const outputPath = `${RNFS.DocumentDirectoryPath}/slideshow_${timestamp}.mp4`;

      // Tạo danh sách tệp đầu vào
      const inputFiles = selectedImages.map(image => `-loop 1 -t 3 -i ${image}`).join(' ');

      // Thiết lập filter_complex để tạo slideshow
      const filterComplex = selectedImages.map(
        (_, index) => `[${index}:v]scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2,setsar=1[v${index}]`
      ).join('; ') + '; ' +
      selectedImages.map(
        (_, index) => `[v${index}]`
      ).join('') + `concat=n=${selectedImages.length}:v=1:a=0,format=yuv420p[v]`;

      // Lệnh FFmpeg
      const ffmpegCommand = `${inputFiles} -filter_complex "${filterComplex}" -map "[v]" -vsync vfr -pix_fmt yuv420p ${outputPath}`;
      console.log('FFmpeg Command:', ffmpegCommand);

      await FFmpegKit.executeAsync(ffmpegCommand, async (session) => {
        const returnCode = await session.getReturnCode();
        const failStackTrace = await session.getFailStackTrace();

        console.log('FFmpeg return code:', returnCode);
        const outputUri = `file://${outputPath}`;
        console.log('FFmpeg process succeeded, output URI:', outputUri);
        setVideoUri(outputUri);
      });
    };

    createVideoSlideshow();
  }, [selectedImages]);

  useEffect(() => {
    console.log('Video URI:', videoUri);
  }, [videoUri]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
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
        <TouchableOpacity style={styles.save}>
          <Image source={require('../../Assets/Slide/save.png')} />
          <Text style={styles.textSave}>Save</Text>
        </TouchableOpacity>
        <View style={styles.videoContainer}>
            <Video 
              source={{ uri: videoUri }} 
              style={styles.video} 
              paused={!isPlaying}
              controls 
            />
        </View>
        <View style={styles.bar}>
          <TouchableOpacity style={styles.music}>
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
  },
  video: {
    width: 420,
    height: 605,
    borderRadius: 10,
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
