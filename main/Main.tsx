import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyFiles from './Pages/MyFiles';
import PosterMovie from './Pages/PosterMovie';
import SlideShow from './Pages/SlideShow';
import Home from './Pages/Home';
import ImageVideo from './Pages/ImageVideo';
import MovieDetail from './Pages/MovieDetail';
import ImageScreen from './Pages/ImageScreen';
import ResultSlide from './Pages/ResultSlide';
import TitleSlide from './Pages/TitleSlide';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
        name="PosterMovie" 
        component={PosterMovie}
        options={{
          headerShown: false,
        }} 
        />
        <Stack.Screen 
        name="MovieDetail" 
        component={MovieDetail}
        options={{
          headerShown: false,
        }} 
        />
        <Stack.Screen 
        name="ImageScreen" 
        component={ImageScreen}
        options={{
          headerShown: false,
        }} 
        />
        <Stack.Screen 
        name="MyFiles" 
        component={MyFiles} 
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
        name="ResultSlide" 
        component={ResultSlide} 
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
        name="SlideShow" 
        component={SlideShow} 
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
        name="TitleSlide" 
        component={TitleSlide} 
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen 
        name="ImageVideo" 
        component={ImageVideo} 
        options={{
          headerShown: false,
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
