import * as React from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import useSWR from 'swr';
import { PaperProvider } from 'react-native-paper';
import SearchBar from '../../Components/SearchBar';
import { useNavigation } from '@react-navigation/native';
import { fetcherTMDB } from '../../Config/fetcherTMDB';

const PosterMovie = () => {
  const navigation = useNavigation();
  const [query, setQuery] = React.useState('');
  const { data, error, isLoading } = useSWR(
    query ? `/search/movie?query=${query}` : null,
    fetcherTMDB
  );

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Image source={require('../../Assets/Movie/back.png')} />
        </TouchableOpacity>
        <SearchBar onSearch={handleSearch} />
        <View style={styles.topSearchContainer}>
          <Text style={styles.topSearchText}>Top search</Text>
        </View>
        <ScrollView horizontal contentContainerStyle={styles.resultsContainer}>
          {isLoading && <ActivityIndicator size="large" color="#fff" />}
          {error && <Text style={styles.errorText}>Failed to load data</Text>}
          {data && data.results.map((movie) => (
            <TouchableOpacity 
            key={movie.id} 
            style={styles.movieItem} 
            onPress={() => navigation.navigate('MovieDetail', { movieID: movie.id })}
          >
            <Image 
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} 
              style={styles.movieImage} 
            />
          </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    marginTop : 20,
    backgroundColor : '#00d147'
  },  
  back : {
    width : 24,
    height : 24,
    marginLeft : 20,
    marginTop : 20,
    position : 'absolute'
  },
  topSearchContainer: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  topSearchText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    fontFamily : 'Josefin-Slab'
  },
  resultsContainer: {
    padding: 10,
    flexDirection: 'row', 
  },
  movieItem: {
    marginBottom: 20,
    alignItems: 'center',
    marginRight: 15, 
  },
  movieImage: {
    width: 130,
    height: 180,
    //borderRadius: 10,
  },
  movieTitle: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    color: '#ff0000',
    textAlign: 'center',
  },
});

export default PosterMovie;
