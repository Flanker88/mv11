import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Image,
  SafeAreaView
} from 'react-native';
import { PaperProvider } from 'react-native-paper';

const Home = ({ navigation }: any) => {

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View>
        <Image
          style={styles.circleGreen}
          source={require('../../Assets/Home/CircleGreen.png')}
        />
        <Image
          style={{
              width: 58,
              height: 58,
              marginTop : 150,
              right : 80,
              position : 'absolute'   
            }}
          source={require('../../Assets/Home/Movie.png')}
        />
        <Text style={{
            position : 'absolute',
            marginTop : 220,
            right : 20,
            fontSize : 30,
            color : '#FFFFFF',
            fontFamily : 'josefin-slab-latin-700-normal',
        }}>Poster movie
        </Text>
        <TouchableOpacity
            style={styles.search}
            onPress={() => navigation.navigate('PosterMovie')}>
            <Image source={require('../../Assets/Home/Ground.png')} />
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        
        </View>

        <View>
          <Image
            style={styles.circleBlue}
            source={require('../../Assets/Home/CircleBlue.png')}
          />
          <Image
          style={{
              width: 58,
              height: 58,
              marginTop : 280,
              left : 60,
              position : 'absolute'   
            }}
          source={require('../../Assets/Home/Slide.png')}
        />
        <Text style={{
            position : 'absolute',
            marginTop : 350,
            left : 20,
            fontSize : 30,
            color : '#FFFFFF',
            fontFamily : 'josefin-slab-latin-700-normal',
        }}>Slide show
        </Text>
        <TouchableOpacity
            style={styles.make}
            onPress={() => navigation.navigate('ImageScreen')}>
            <View style={styles.buttonContent}>
              <Image source={require('../../Assets/Home/Ground.png')} />
              <Text style={styles.buttonText}>Make now</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <Image
            style={styles.circle}
            source={require('../../Assets/Home/Circle.png')}
          />
          <Image
            style={{
              width: 58,
              height: 58,
              marginTop: 450,
              right: 80,
              position: 'absolute'
            }}
            source={require('../../Assets/Home/File.png')}
          />
          <Text style={{
            position : 'absolute',
            marginTop : 520,
            right : 50,
            fontSize : 30,
            color : '#FFFFFF',
            fontFamily : 'josefin-slab-latin-700-normal',
        }}>My files
        </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('MyFiles')}>
            <Image source={require('../../Assets/Home/Ground.png')} />
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>

        </View>
        </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circleGreen: {
    position: 'absolute',
    width: 382, 
    height: 382,
    right : -40,
    top : 100,
    resizeMode: 'contain',
  },
  search: {
    width: 125,
    height: 36,
    marginTop: 280,
    right: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  circleBlue: {
    position: 'absolute',
    width: 382, 
    height: 382,
    left: -60, 
    top: 200, 
    resizeMode: 'contain',
  },
  make: {
    width: 125,
    height: 36,
    marginTop: 400,
    left: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  circle: {
    position: 'absolute',
    width: 382,
    height: 382, 
    right : -60,
    top : 350,
    resizeMode: 'contain',
  },
  button : {
    width: 125,
    height: 36,
    marginTop: 580,
    right: 40,
    justifyContent :'center',
    alignItems : 'center',
    position: 'absolute'  
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText : {
    color : '#000000',
    fontSize : 22,
    position: 'absolute',
    marginLeft : 5,
    fontFamily : 'josefin-slab-latin-700-normal',
  }
});

export default Home;

