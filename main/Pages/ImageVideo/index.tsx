import * as React from 'react';
import { 
  View, 
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,

 } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';

const ImageVideo = ({ route }) => {
  const { selectedImages } = route.params;
  const navigation = useNavigation();
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    const loadImages = async () => {
      try {
        const imageURIs = await Promise.all(
          selectedImages.map(async (image) => {
            const base64Image = await RNFS.readFile(image, 'base64');
            return `data:image/png;base64,${base64Image}`;
          })
        );
        setImages(imageURIs);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, [selectedImages]);

  const imagesWithAddButton = [{ type: 'add' }, ...images];

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => { navigation.goBack() }}>
          <Image source={require('../../Assets/Movie/back.png')} />
        </TouchableOpacity>
        <View style={styles.flatList}>
        <FlatList
          data={imagesWithAddButton}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            if (item.type === 'add') {
              return (
                <TouchableOpacity style={styles.add} onPress={() => navigation.navigate('PosterMovie')}>
                  <Image source={require('../../Assets/EditSlide/Frame.png')} />
                  <Image style={styles.plus} source={require('../../Assets/EditSlide/Plus.png')} />
                </TouchableOpacity>
              );
            } else {
              return <Image source={{ uri: item }} style={styles.image} />;
            }
          }}
          numColumns={3}
        />
        </View>
      </View>
    </PaperProvider>
  );
};


const styles = StyleSheet.create({
  container:{
    flex: 1, 
    marginTop : 20,
    backgroundColor : '#0b7bff'
  },  
  back : {
    width : 24,
    height : 24,
    marginLeft : 20,
    marginTop : 20,
  },
  add : {
    justifyContent : 'center',
    alignItems : 'center',
    marginLeft : 8,
    marginBottom : 10
  },
  plus : {
    position : 'absolute',
  },
  flatList : {
    justifyContent : 'center',
    alignItems : 'center',
    marginTop : 20,
  },
  image: {
    width: 111,
    height: 164,
    marginBottom: 10,
    marginHorizontal : 8,
  },

});

export default ImageVideo;
