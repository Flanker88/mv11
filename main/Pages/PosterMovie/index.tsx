import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import useSWR from 'swr';

const PosterMovie = () => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const API_URL = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "8f44559bd5dbfe77fe948fafc01314b3"; 

  const fetchMovie = async () => {
    const { data } = await axios.get(API_URL, {
      params: {
        api_key: API_KEY,
        query: query
      }
    });
    setSearchResult(data.results);
  }

  const { data, error } = useSWR(query ? API_URL : null, fetchMovie);

  const renderItem = ({ item }) => (
    <Text>{item.title}</Text>
  );

  if (error) return <Text>Error fetching data</Text>;
  if (!data) return <ActivityIndicator />;

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setQuery(text)}
        value={query}
        placeholder="Enter movie name"
      />
      <Button title="Search" onPress={fetchMovie} />
      <FlatList
        data={searchResult}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

export default PosterMovie;


// import React from 'react';
// import { View, TouchableOpacity, Image, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
// import { Text } from '@rneui/themed';
// import MovieItem from 'main/Components/MovieItem';
// import useSWR from 'swr'
// import axios from 'axios';
// import { mvdbkey } from '../../Config/env';

// const UpComing = (props) => {
//   const API_URL = "https://api.themoviedb.org/3/movie/upcoming"
//   const fetchMovie = async () => {
//     const { data: { results } } = await axios.get(API_URL + t('languageURL'), {
//       params: {
//         api_key: mvdbkey,
//       }
//     })
//     return results
//   }
//   const { data, isLoading } = useSWR(API_URL, fetchMovie)

//   if (isLoading) return (
//     <SafeAreaView style={{
//       flex: 1,
//       backgroundColor: "#090B14"
//     }}>
//       <View style={stylesHeader.top}>
//         <View>
//           <Text style={stylesHeader.title}>{t('loading')}</Text>
//         </View>
//         <TouchableOpacity
//           style={stylesHeader.revert}
//           onPress={() => {
//             props.navigation.goBack();
//           }}
//         >
//           <Image source={require('../../Assets/Revert.png')} />
//         </TouchableOpacity>
        
//       </View>
//       <View style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//       }}>
//         <View style={[stylesLoading.container, stylesLoading.horizontal]}>
//           <ActivityIndicator size="large" color="#F7BE13" />
//         </View>
//       </View>
//     </SafeAreaView >)
//   return (
//     <SafeAreaView style={{
//       flex: 1,
//       backgroundColor: "#090B14"
//     }}>
//       <View style={stylesHeader.top}>
//         <TouchableOpacity
//           style={stylesHeader.revert}
//           onPress={() => {
//             props.navigation.goBack();
//           }}
//         >
//           <Image source={require('../../Assets/Revert.png')} />
//         </TouchableOpacity>

//         <View>
//           <Text style={stylesHeader.title}>{t('upcoming')}</Text>
//         </View>
//       </View>
//       <View style={{
//         flex: 1
//       }}>
//         <ScrollView>
//           {data.map((item) => {
//             return (
//               <MovieItem
//                 key={item.id}
//                 id={item.id}
//                 url={
//                   item.poster_path
//                 }
//                 title={item.title}
//                 release_date={dayjs(item.release_date).format('DD MMMM, YYYY')}
//               />
//             )
//           })}
//         </ScrollView>
//       </View>
//     </SafeAreaView >
//   )
// }

// const stylesHeader = StyleSheet.create({
//   top: {
//     width: "100%",
//     height: 55,
//     alignItems: 'center'
//   },
//   revert: {
//     position: "absolute",
//     top: 5,
//     left: 20,
//     padding: 15
//   },
//   title: {
//     color: "#FFF",
//     textAlign: "center",
//     fontSize: 20,
//     fontFamily: "Open Sans",
//     fontWeight: 700,
//     marginTop: 17
//   },
// })
// const stylesLoading = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   horizontal: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 10,
//   },
// });

// export default UpComing