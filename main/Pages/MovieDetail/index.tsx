import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  TouchableOpacity,
  Animated,
  Alert,
  PermissionsAndroid,
  Platform
} from 'react-native';
import useSWR from 'swr';
import { fetcherTMDB } from '../../Config/fetcherTMDB';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';

const MovieDetail = ({ route }) => {
  const navigation = useNavigation();
  const { movieID } = route.params;
  const { data, error, isLoading } = useSWR(
    `/movie/${movieID}?append_to_response=credits,images,videos`,
    fetcherTMDB
  );
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ITEM_SIZE = 180 + 20;
  const [currentImage, setCurrentImage] = useState(null);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Needed",
            message: "App needs access to your storage to download photos"
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const handleDownload = async () => {
    if (!currentImage) {
      Alert.alert("No image selected", "Please select an image to download.");
      return;
    }

    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert("Permission denied", "Cannot download image without storage permission.");
      return;
    }
    console.log(hasPermission,"AAAA")

    try {
      const url = `https://image.tmdb.org/t/p/w500${currentImage.file_path}`;
      const filename = url.split('/').pop();
      const dest = `${RNFS.DocumentDirectoryPath}/downloaded_images/${filename}`;
      await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/downloaded_images`);
      const download = RNFS.downloadFile({ fromUrl: url, toFile: dest });
  
      const result = await download.promise;
      if (result.statusCode === 200) {
        Alert.alert("Download complete", `Image saved to ${dest}`);
      } else {
        throw new Error(`Failed to download image. Status code: ${result.statusCode}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Download failed", "There was an error downloading the image.");
    }
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentImage(viewableItems[0].item);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00d147" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loader}>
        <Text style={styles.errorText}>Failed to load movie details</Text>
      </View>
    );
  }

  const castNames = data.credits.cast.slice(0, 3).map(castMember => castMember.name).join(', ');

  return (
    <View style={styles.container}>
      {data && (
        <>
          <ScrollView style={styles.topContainer}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
              <Image source={require('../../Assets/Movie/arrow-left.png')} />
            </TouchableOpacity>
            <Text style={styles.title}>{data.title}</Text>
            <View style={styles.castContainer}>
              <Text style={styles.castName}>{castNames}</Text>
            </View>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${data.poster_path}` }}
              style={styles.posterImage}
            />
            <Text style={styles.overview}>{data.overview}</Text>
          </ScrollView>
          <View style={styles.bottomContainer}>
            <Animated.FlatList
              data={data.images.backdrops}
              horizontal
              keyExtractor={(item) => item.file_path}
              onScroll={Animated.event(
                [{nativeEvent : {contentOffset : {x : scrollX }}}],
                {useNativeDriver : true}
              )}
              scrollEventThrottle={16}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              renderItem={({ item, index }) => {
                const inputRange = [
                  (index - 1) * ITEM_SIZE,
                  index * ITEM_SIZE,
                  (index + 1) * ITEM_SIZE,
                ];
                const translateY = scrollX.interpolate({
                  inputRange,
                  outputRange: [20, -30, 20],
                });

                return (
                  <Animated.View style={{ transform: [{ translateY }] }}>
                    <Image
                      source={{ uri: `https://image.tmdb.org/t/p/w500${item.file_path}` }}
                      style={styles.relatedImage}
                    />
                  </Animated.View>
                );
              }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListContent}
            />
            <TouchableOpacity 
              style={styles.download} 
              onPress={handleDownload}
            >
              <Image source={require('../../Assets/Movie/download.png')} />
              <Text style={styles.textdown}>Download</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  back: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginTop: 20,
    position: 'absolute',
    zIndex: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#ccf6da',
  },
  posterImage: {
    width: 150,
    height: 200,
    alignSelf: 'center',
    marginVertical: 10,
  },
  title: {
    color: '#000000',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: "Josefin Sans",
  },
  overview: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  castContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  castName: {
    color: '#5d5d5d',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'JosefinSlab-Regular',
  },
  relatedImagesContainer: {
    marginTop: 20,
    backgroundColor: '#ccf6da',
  },
  relatedImage: {
    width: 200,
    height: 300,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  flatListContent: {
    paddingVertical: 20,
  },
  download: {
    alignItems: 'center',
  },
  textdown: {
    position: 'absolute',
    marginTop: 20,
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    color: '#ff0000',
  },
});

export default MovieDetail;
