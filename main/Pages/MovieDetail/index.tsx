import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  FlatList,
  Dimensions,
  TouchableOpacity,
 } from 'react-native';
import useSWR from 'swr';
import { fetcherTMDB } from '../../Config/fetcherTMDB';
import { useNavigation } from '@react-navigation/native';

const MovieDetail = ({ route }) => {
  const navigation = useNavigation();
  const { movieID } = route.params;
  const { data, error, isLoading } = useSWR(
    `/movie/${movieID}?append_to_response=credits,images,videos`,
    fetcherTMDB
  );
  console.log(data,'AAAAAA')

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

  const castNames = data.credits.cast.slice(0, 3).map(castMember => castMember.name).join(', ');

  return (
    <View style={styles.container}>
      {data && (
        <>
          <ScrollView style={styles.topContainer}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Image source={require('../../Assets/Movie/arrow-left.png')} />
          </TouchableOpacity>
            <Text style={styles.title}>{data.title}</Text>
            <View style={styles.castContainer}>
              <Text style={styles.castName}>{castNames}</Text>
            </View>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${data.poster_path}` }}
              style={styles.posterImage}
            />
            <Text style={styles.overview}>{data.overview}</Text>
          </ScrollView>
          <View style={styles.bottomContainer}>
            <FlatList
              data={data.images.backdrops}
              horizontal
              keyExtractor={(item) => item.file_path}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.file_path}` }}
                  style={styles.relatedImage}
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListContent}
            />
            <TouchableOpacity style={styles.download}>
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
  back : {
    width : 30,
    height : 30,
    marginLeft : 20,
    marginTop : 20,
    position : 'absolute',
    zIndex: 10,
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
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily : 'Josefin-Slab'
  },
  overview: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 20,
    textAlign: 'center',
    fontFamily : 'Josefin-Slab'
  },
  castContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  castName: {
    color: '#5d5d5d',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily : 'Josefin Slab'
  },
  relatedImagesContainer: {
    marginTop: 20,
    backgroundColor: '#ccf6da',
  },
  relatedImage: {
    width: 200,
    height: 300,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  flatListContent: {
    paddingVertical: 20,
  },
  download : {
    alignItems : 'center'
  },
  textdown : {
    position : 'absolute',
    marginTop : 25,
    fontSize : 16,
    fontWeight : '700'
  },
  errorText: {
    color: '#ff0000',
  },
});

export default MovieDetail;
