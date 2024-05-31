import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import fonts from '../../constant/fonts';

const {height} = Dimensions.get('window');
const circleSize = height / 2.2;

const Home = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>
        <View
          style={[
            styles.circle,
            {
              right: -circleSize / 6,
              bottom: -circleSize / 7,
              paddingBottom: '35%',
              paddingLeft: '5%',
            },
          ]}>
          <Image source={require('../../Assets/Home/Movie.png')} />
          <Text style={styles.title}>Poster movie</Text>
          <TouchableOpacity
            style={styles.search}
            onPress={() => navigation.navigate('PosterMovie')}>
            <Text style={styles.buttonText}>Search movie</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.circle,
            {
              backgroundColor: '#0b7bff',
              left: -circleSize / 4,
              top: -circleSize / 2.5,
              paddingBottom: '25%',
            },
          ]}>
          <Image source={require('../../Assets/Home/Slide.png')} />
          <Text style={styles.title}>Slide show</Text>
          <TouchableOpacity
            style={styles.search}
            onPress={() => navigation.navigate('ImageScreen')}>
            <Text style={styles.buttonText}>Make now</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.circle,
            {
              backgroundColor: '#ff6b17',
              right: -circleSize / 3,
              paddingRight: '15%',
            },
          ]}>
          <Image source={require('../../Assets/Home/File.png')} />
          <Text style={styles.title}>My files</Text>
          <TouchableOpacity
            style={styles.search}
            onPress={() => navigation.navigate('MyFiles')}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container2: {
    width: '100%',
  },

  circle: {
    position: 'absolute',
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: '#00d147',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },

  title: {
    fontSize: 30,
    color: '#FFFFFF',
    fontFamily: fonts.medium,
    marginVertical: 8,
  },

  search: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    minWidth: '36%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 17,
  },
});

export default Home;
