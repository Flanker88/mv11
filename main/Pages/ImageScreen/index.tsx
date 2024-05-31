import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';

const {width} = Dimensions.get('window');

const imgSize = (width - 25) / 3;

const ImageScreen = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadImages = async () => {
      try {
        const files = await RNFS.readDir(
          `${RNFS.DocumentDirectoryPath}/downloaded_images`,
        );
        setImages(files.map(file => file.path));
      } catch (error) {
        Alert.alert('No image, please download in Poster Movie');
      }
    };

    loadImages();
  }, []);

  const handleImagePick = image => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter(img => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleNextPress = () => {
    if (selectedImages.length > 0) {
      navigation.navigate('SlideShow', {selectedImages});
    } else {
      alert('Please select at least one image');
    }
  };

  const renderItem = ({item}) => {
    const isSelected = selectedImages.includes(item);

    return (
      <TouchableOpacity
        onPress={() => handleImagePick(item)}
        style={styles.imageContainer}>
        <Image source={{uri: `file://${item}`}} style={styles.image} />

        {isSelected && (
          <View style={styles.overlay}>
            <Image
              source={require('../../Assets/Movie/done.png')}
              style={styles.checkmark}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 6,
        }}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../Assets/Movie/arrow-left.png')} />
        </TouchableOpacity>
        <Text style={styles.text}>Choose image</Text>
        <View style={styles.back} />
      </View>

      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item}
        numColumns={3}
        columnWrapperStyle={{marginBottom: 8}}
        style={{flexGrow: 1}}
      />

      <View style={styles.selectedCountContainer}>
        <Text style={styles.selectedCountText}>
          Selected {selectedImages.length} photos
        </Text>

        <TouchableOpacity onPress={handleNextPress} style={styles.nextBtn}>
          <Text style={styles.textNext}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  back: {
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 24,
    color: '#000000',
  },
  imageContainer: {
    width: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: imgSize,
    height: imgSize,
  },
  overlay: {
    position: 'absolute',
    top: 6,
    right: 0,
    bottom: 0,
    left: 100,
  },
  checkmark: {
    width: 24,
    height: 24,
  },
  selectedCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    borderBottomWidth: 1,
    borderBottomRightRadius: 20,
  },

  selectedCountText: {
    fontSize: 16,
  },
  nextBtn: {
    padding: 6,
    borderWidth: 1,
    borderRadius: 20,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textNext: {
    fontSize: 15,
    color: '#101010',
  },
});

export default ImageScreen;
