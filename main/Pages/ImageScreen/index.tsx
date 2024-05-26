import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';

const ImageScreen = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadImages = async () => {
      try {
        const files = await RNFS.readDir(`${RNFS.DocumentDirectoryPath}/downloaded_images`);
        setImages(files.map(file => file.path));
      } catch (error) {
        Alert.alert("No image, please download in Poster Movie");
      }
    };

    loadImages();
  }, []);

  const handleImagePick = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter(img => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleNextPress = () => {
    if (selectedImages.length > 0) {
      navigation.navigate('SlideShow', { selectedImages });
    } else {
      alert('Please select at least one image');
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedImages.includes(item);
    return (
      <TouchableOpacity onPress={() => handleImagePick(item)}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: `file://${item}` }} 
            style={styles.image} 
          />
          {isSelected && (
            <View style={styles.overlay}>
              <Image 
                source={require('../../Assets/Movie/done.png')} 
                style={styles.checkmark} 
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Image source={require('../../Assets/Movie/arrow-left.png')} />
      </TouchableOpacity>
      <Text style={styles.text}>Choose image</Text>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={3}
      />
      <View style={styles.selectedCountContainer}>
        <TouchableOpacity onPress={handleNextPress}>
          <Image
            style={styles.next}
            source={require('../../Assets/Movie/next.png')} />
            <Text style={styles.textNext}>Next</Text>
        </TouchableOpacity>
        <Text style={styles.selectedCountText}>
          Selected {selectedImages.length} photos
        </Text>
        <Image 
        style={styles.line}
        source={require('../../Assets/Movie/line.png')} />
      </View>
    </View>
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
    marginLeft: 20,
    marginVertical: 20,
    zIndex: 10,
  },
  text : {
    fontSize : 24,
    fontWeight : '700',
    position : 'absolute',
    marginLeft : 130,
    marginTop : 25,
    color : '#000000'
  },
  imageContainer: {
    position: 'relative',
    width: '32%',
    margin: '1%',
  },
  image: {
    width: 128,
    height: 128,
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
    marginVertical: 10,
    alignItems: 'flex-start',
  },
  selectedCountText: {
    fontSize: 16,
    marginLeft : 20,
    marginTop : 20,
    fontWeight: '700',
    position : 'absolute'
  },
  next : {
    marginLeft : 220
  },
  textNext : {
    position : 'absolute',
    fontSize : 16,
    fontWeight :'700',
    color : '#101010',
    marginLeft : 285,
    marginTop : 23,
  },
  line : {
    marginTop : 50,
    marginLeft : 20,
    position : 'absolute'
  }
});

export default ImageScreen;
