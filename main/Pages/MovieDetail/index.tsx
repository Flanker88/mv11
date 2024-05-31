import React, {useState, useCallback} from 'react';
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
  Platform,
  Dimensions,
} from 'react-native';
import useSWR from 'swr';
import {fetcherTMDB} from '../../Config/fetcherTMDB';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');
const ITEM_SIZE = width * 0.4;

const MovieDetail = ({navigation, route}) => {
  const {movieID} = route.params;
  const {data, error, isLoading} = useSWR(
    `/movie/${movieID}?append_to_response=credits,images,videos`,
    fetcherTMDB,
  );
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [currentImage, setCurrentImage] = useState(null);
  const {top} = useSafeAreaInsets();

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Needed',
            message: 'App needs access to your storage to download photos',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        return false;
      }
    } else {
      return true;
    }
  };

  const handleDownload = async () => {
    if (!currentImage) {
      Alert.alert('No image selected', 'Please select an image to download.');
      return;
    }

    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission denied',
        'Cannot download image without storage permission.',
      );
      return;
    }

    try {
      const url = `https://image.tmdb.org/t/p/w500${currentImage.file_path}`;
      const resizedImage = await ImageResizer.createResizedImage(
        url,
        393,
        612,
        'PNG',
        80,
      );

      const dest = `${RNFS.DocumentDirectoryPath}/downloaded_images/${resizedImage.name}`;
      await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/downloaded_images`);
      await RNFS.moveFile(resizedImage.uri, dest);

      Alert.alert('Download succeeded');
    } catch (error) {
      Alert.alert(
        'Download failed',
        'There was an error downloading the image.',
      );
    }
  };

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
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

  const castNames = data.credits.cast
    .slice(0, 3)
    .map(castMember => castMember.name)
    .join(', ');

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      {data && (
        <>
          <ScrollView
            style={styles.topContainer}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: '2%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image source={require('../../Assets/Movie/arrow-left.png')} />
              </TouchableOpacity>
              <Text numberOfLines={1} style={styles.title}>
                {data.title}
              </Text>
              <View />
            </View>
            <View style={styles.castContainer}>
              <Text style={styles.castName}>{castNames}</Text>
            </View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
              }}
              style={styles.posterImage}
            />
            <Text style={styles.overview}>{data.overview}</Text>
          </ScrollView>
          <View style={styles.bottomContainer}>
            <Animated.FlatList
              data={data.images.backdrops}
              horizontal
              keyExtractor={item => item.file_path}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}
              scrollEventThrottle={16}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              renderItem={({item, index}) => {
                const inputRange = [
                  (index - 1) * ITEM_SIZE,
                  index * ITEM_SIZE,
                  (index + 1) * ITEM_SIZE,
                ];
                const translateY = scrollX.interpolate({
                  inputRange,
                  outputRange: [0, -20, 0],
                });

                return (
                  <Animated.View style={{transform: [{translateY}]}}>
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${item.file_path}`,
                      }}
                      style={styles.relatedImage}
                    />
                  </Animated.View>
                );
              }}
              ListEmptyComponent={
                <Text
                  style={{textAlign: 'center', fontSize: 17, marginLeft: 10}}>
                  No extra image
                </Text>
              }
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListContent}
            />
            <TouchableOpacity style={styles.download} onPress={handleDownload}>
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
    textAlign: 'center',
    width: '80%',
  },
  overview: {
    color: '#000000',
    fontSize: 16,
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
    textAlign: 'center',
  },
  relatedImagesContainer: {
    marginTop: 20,
    backgroundColor: '#ccf6da',
  },
  relatedImage: {
    width: ITEM_SIZE,
    aspectRatio: 2 / 3,
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
    marginTop: 25,
    fontSize: 16,
  },
  errorText: {
    color: '#ff0000',
  },
});

export default MovieDetail;
