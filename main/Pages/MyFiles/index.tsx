import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import RNFS from 'react-native-fs';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import Video from 'react-native-video';
import Share from 'react-native-share';
import fonts from '../../constant/fonts';

const {width} = Dimensions.get('window');
const videoW = width * 0.8;
const videoH = (videoW * 5) / 3;

const MyFiles = () => {
  const navigation = useNavigation();
  const [videoFiles, setVideoFiles] = useState([]);

  useEffect(() => {
    fetchVideoFiles();
  }, []);

  const fetchVideoFiles = async () => {
    try {
      const directoryPath = `${RNFS.DocumentDirectoryPath}/MyVideos`;
      const files = await RNFS.readdir(directoryPath);
      const videoFiles = files.filter(file => file.endsWith('.mp4'));

      setVideoFiles(videoFiles);
    } catch (error) {}
  };

  const shareVideo = async videoPath => {
    try {
      await Share.open({
        url: `file://${videoPath}`,
        type: 'video/mp4',
      });
    } catch (error) {}
  };

  const renderVideoItem = ({item}) => {
    const parts = item.split('_');
    const videoName = parts[0];
    const fontFamily = parts[1];
    const date = dayjs(parts[2].replace('.mp4', ''), 'YYYY-MM-DD').format(
      'DD/MM/YYYY',
    );
    const videoPath = `${RNFS.DocumentDirectoryPath}/MyVideos/${item}`;

    return (
      <TouchableOpacity
        style={styles.videoItem}
        onPress={() => navigation.navigate('Player', {videoPath})}>
        <Video
          style={styles.video}
          source={{uri: videoPath}}
          paused={true}
          controls={false}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            top: 10,
            right: 8,
          }}>
          <TouchableOpacity
            style={styles.share}
            onPress={() => shareVideo(videoPath)}>
            <Image source={require('../../Assets/File/share.png')} />
          </TouchableOpacity>
          <Image source={require('../../Assets/File/option.png')} />
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: '7%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={[styles.videoName, {fontFamily}]}>{videoName}</Text>
          <Text style={[styles.date, {fontFamily}]}>{date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../Assets/Movie/back.png')} />
        </TouchableOpacity>
        <Text style={styles.text}>My Files</Text>
        <View style={styles.back} />
      </View>

      <FlatList
        style={styles.list}
        data={videoFiles}
        horizontal
        renderItem={renderVideoItem}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <Text
            style={{
              fontSize: 17,
              color: 'white',
            }}>
            No video found
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default MyFiles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff6b17',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  back: {},
  text: {
    marginTop: 15,
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: fonts.semibold,
  },
  videoItem: {
    width: videoW,
    height: videoH,
    marginRight: 20,
  },
  videoName: {
    color: '#FFFFFF',
    fontSize: 32,
  },
  list: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  box: {},
  option: {},
  share: {
    marginRight: 10,
  },
  date: {
    fontSize: 18,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'white',
    padding: 6,
    marginTop: 12,
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});
