import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyFiles from './Pages/MyFiles';
import PosterMovie from './Pages/PosterMovie';
import SlideShow from './Pages/SlideShow';
import Home from './Pages/Home';
import MakeSlideShow from './Pages/MakeSlideShow';
import MovieDetail from './Pages/MovieDetail';

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
        name="MyFiles" 
        component={MyFiles} 
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
        name="MakeSlideShow" 
        component={MakeSlideShow} 
        options={{
          headerShown: false,
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
