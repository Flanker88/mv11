import * as React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';

const {width} = Dimensions.get('window');
const imgW = (width - 60) / 3;
const imgH = (imgW * 4.5) / 3;

const ImageVideo = ({route}) => {
  const {selectedImages} = route.params;
  const navigation = useNavigation();
  const [images, setImages] = React.useState([]);
  const imagesWithAddButton = [{type: 'add'}, ...images];

  React.useEffect(() => {
    loadImages();
  }, [selectedImages]);

  const loadImages = async () => {
    try {
      const imageURIs = await Promise.all(
        selectedImages.map(async image => {
          const base64Image = await RNFS.readFile(image, 'base64');
          return `data:image/png;base64,${base64Image}`;
        }),
      );
      setImages(imageURIs);
    } catch (error) {
      Alert.alert('Error when loading images');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={require('../../Assets/Movie/back.png')} />
      </TouchableOpacity>
      <View style={styles.flatList}>
        <FlatList
          data={imagesWithAddButton}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            if (item.type === 'add') {
              return (
                <TouchableOpacity
                  style={[styles.add, styles.image]}
                  onPress={() => navigation.navigate('PosterMovie')}>
                  <Image
                    style={styles.plus}
                    source={require('../../Assets/EditSlide/Plus.png')}
                  />
                </TouchableOpacity>
              );
            } else {
              return <Image source={{uri: item}} style={styles.image} />;
            }
          }}
          numColumns={3}
          columnWrapperStyle={{marginBottom: 6}}
        />
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
    marginLeft: 20,
    marginTop: 20,
  },
  add: {
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#00000040',
    marginRight: 10,
  },
  plus: {
    position: 'absolute',
  },
  flatList: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: imgW,
    height: imgH,
    marginRight: 10,
  },
});

export default ImageVideo;
