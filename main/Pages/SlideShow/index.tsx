import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import Video from 'react-native-video';
import {FFmpegKit} from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import fonts from '../../constant/fonts';

const {height} = Dimensions.get('window');

const SlideShow = ({route, navigation}) => {
  const {selectedImages} = route.params;
  const [videoUri, setVideoUri] = useState('');
  const [isMute, setIsMute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [musicFilePath, setMusicFilePath] = useState('');
  const [title, setTitle] = useState('');
  const [fontFamily, setFontFamily] = useState(fonts.bold);

  useEffect(() => {
    const createVideoSlideshow = async () => {
      if (selectedImages.length === 0) return;

      const timestamp = new Date().getTime();
      const outputPath = `${RNFS.DocumentDirectoryPath}/slideshow_${
        timestamp + Math.floor(Math.random() * Math.random())
      }.mp4`;

      const inputFiles = selectedImages
        .map(image => `-loop 1 -t 2 -i "${image}"`)
        .join(' ');

      const filterComplex =
        selectedImages
          .map(
            (_, index) =>
              `[${index}:v]scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2,setsar=1[v${index}]`,
          )
          .join('; ') +
        '; ' +
        selectedImages.map((_, index) => `[v${index}]`).join('') +
        `concat=n=${selectedImages.length}:v=1:a=0,format=yuv420p[v]`;

      let ffmpegCommand;

      if (musicFilePath) {
        ffmpegCommand = `${inputFiles} -i "${musicFilePath}" -filter_complex "${filterComplex}" -map "[v]" -map ${selectedImages.length}:a -fps_mode vfr -pix_fmt yuv420p -shortest ${outputPath}`;
      } else {
        ffmpegCommand = `${inputFiles} -filter_complex "${filterComplex}" -map "[v]" -fps_mode vfr -pix_fmt yuv420p ${outputPath}`;
      }

      await FFmpegKit.executeAsync(ffmpegCommand, async session => {
        setVideoUri(outputPath);
      });
    };

    createVideoSlideshow();
  }, [selectedImages, musicFilePath]);

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
      const musicUri = res[0].uri;
      setSelectedMusic(res[0]);

      const musicFilePath = `${RNFS.TemporaryDirectoryPath}/temp_music_file.mp3`;
      await RNFS.copyFile(musicUri, musicFilePath);
      setMusicFilePath(musicFilePath);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const saveVideo = async () => {
    if (title.length === 0) {
      return Alert.alert('Enter your slider name!');
    }

    if (videoUri) {
      try {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(
          currentDate.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}-${currentDate
          .getDate()
          .toString()
          .padStart(2, '0')}`;

        const outputFilename = `${title}_${fontFamily}_${formattedDate}.mp4`;
        const outputDirectory = `${RNFS.DocumentDirectoryPath}/MyVideos`;
        const outputFilePath = `${outputDirectory}/${outputFilename}`;

        await RNFS.mkdir(outputDirectory);
        await RNFS.moveFile(videoUri.replace('file://', ''), outputFilePath);

        setTitle('');

        navigation.navigate('ResultSlide', {
          videoUri: outputFilePath,
          selectedMusic,
        });
      } catch (error) {
        Alert.alert('Error when saving video!');
      }
    } else {
      Alert.alert('No video URI available to save');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: '3%',
        }}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../Assets/Movie/back.png')} />
        </TouchableOpacity>

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TitleSlide', {setTitle, setFontFamily})
            }>
            <Text style={styles.text}>
              {title.length > 0 ? title : 'Slider name'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.volume} onPress={toggleMute}>
            <Image
              source={
                isMute
                  ? require('../../Assets/Slide/volume-slash.png')
                  : require('../../Assets/Slide/volume.png')
              }
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.save} onPress={saveVideo}>
            <Text style={styles.textSave}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.videoContainer}>
        <Video
          source={{uri: videoUri}}
          style={styles.video}
          paused={!isPlaying}
          muted={isMute}
        />
      </View>

      <View style={styles.bar}>
        <TouchableOpacity onPress={selectMusic}>
          <Image source={require('../../Assets/Slide/music.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause}>
          <Image
            source={
              isPlaying
                ? require('../../Assets/Slide/pause.png')
                : require('../../Assets/Slide/play.png')
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ImageVideo', {selectedImages})}>
          <Image source={require('../../Assets/Slide/menu.png')} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '90%',
    borderBottomRightRadius: 20,
  },
  text: {
    fontSize: 16,
    color: '#ffffff',
  },
  volume: {
    width: '40%',
    alignItems: 'flex-end',
  },
  save: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '20%',
    padding: 6,
    borderRadius: 20,
  },
  textSave: {
    fontSize: 16,
  },
  videoContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  video: {
    width: '100%',
    height: height * 0.7,
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default SlideShow;
