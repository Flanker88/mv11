import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import Video from 'react-native-video';

const MyFiles = () => {
  const navigation = useNavigation();
  const [videoFiles, setVideoFiles] = useState([]);

  useEffect(() => {
    const fetchVideoFiles = async () => {
      try {
        const directoryPath = `${RNFS.DocumentDirectoryPath}/MyVideos`;
        const files = await RNFS.readdir(directoryPath); 
        const videoFiles = files.filter(file => file.endsWith('.mp4'));

        setVideoFiles(videoFiles);
      } catch (error) {
        console.error('Error fetching video files:', error);
      }
    };

    fetchVideoFiles();
  }, []);

  const renderVideoItem = ({ item }) => {
    const parts = item.split('_');
    const videoName = parts[0];
    const fontFamily = parts[1];
    const date = parts[2].replace('.mp4', '');
    const formatDate = dayjs(date, 'YYYY-MM-DD').format('DD/MM/YYYY');

    const videoPath = `${RNFS.DocumentDirectoryPath}/MyVideos/${item}`;
    
    return (
      <TouchableOpacity style={styles.videoItem}>
        <Video style={styles.video}
          source={{ uri: videoPath }}   
          paused={true}
          controls={false}
        />
        <TouchableOpacity style={styles.share}>
        <Image source={require('../../Assets/File/share.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
        <Image source={require('../../Assets/File/option.png')} />
        </TouchableOpacity>
        <Text style={[styles.videoName, { fontFamily }]}>{videoName}</Text>
        <Image style={styles.box} source={require('../../Assets/File/box.png')} />
        <Text style={[styles.date, { fontFamily }]}>{formatDate}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Image source={require('../../Assets/Movie/back.png')} />
          </TouchableOpacity>
          <Text style={styles.text}>My Files</Text>
        </View>
        <FlatList
          style={styles.list}
          data={videoFiles}
          horizontal
          renderItem={renderVideoItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </PaperProvider>
  );
};

export default MyFiles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff6b17',
  },
  header: {
    alignItems: 'center',
    marginVertical : 20,
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  text: {
    marginTop : 15,
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'josefin-slab-latin-700-normal',
  },
  videoItem: {
    width : 300,
    height : 525,
    marginHorizontal: 10,
    borderRadius : 10,
    alignItems :'center'
  },
  videoName: {
    marginTop : 350,
    color: '#FFFFFF',
    fontSize: 32,
    position : 'absolute',
  },
  list : {
    marginTop : 20,
    marginHorizontal : 20
  },
  box : {
    position : 'absolute',
    bottom : 50,
  },
  option : {
    position : 'absolute',
    right : 20,
    top : 20,
  },
  share : {
    top : 20,
    right : 50,
    position : 'absolute'
  },
  date : {
    bottom : 55,
    fontSize  : 18,
    color: '#FFFFFF',
    position : 'absolute',
  },
  video : {
    width : 300,
    height : 525,
    borderRadius : 20,
  }
});
