import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import useSWR from 'swr';
import SearchBar from '../../Components/SearchBar';
import {fetcherTMDB} from '../../Config/fetcherTMDB';

const {width} = Dimensions.get('window');
const imgW = (width - 40) / 3;

const PosterMovie = ({navigation}) => {
  const [query, setQuery] = React.useState('');

  const {data, error, isLoading} = useSWR(
    query ? `/search/movie?query=${query}` : null,
    fetcherTMDB,
  );

  const handleSearch = searchQuery => {
    setQuery(searchQuery);
  };

  if (error) {
    Alert.alert('Fail to loading data!');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: '3%',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={require('../../Assets/Movie/back.png')} />
        </TouchableOpacity>
        <SearchBar onSearch={handleSearch} />
      </View>
      <View style={styles.topSearchContainer}>
        <Text style={styles.topSearchText}>Top search</Text>
      </View>

      {isLoading && <ActivityIndicator size="large" color="#fff" />}

      <FlatList
        data={data?.results}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.movieItem}
              onPress={() =>
                navigation.navigate('MovieDetail', {movieID: item.id})
              }>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.movieImage}
              />
            </TouchableOpacity>
          );
        }}
        columnWrapperStyle={{
          paddingHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', color: 'white', fontSize: 17}}>
            Search the movie above
          </Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00d147',
  },
  topSearchContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  topSearchText: {
    color: '#ffffff',
    fontSize: 24,
  },
  resultsContainer: {
    padding: 10,
    flexDirection: 'row',
  },
  movieItem: {
    marginBottom: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  movieImage: {
    width: imgW,
    aspectRatio: 3 / 4,
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
    fontSize: 24,

    marginHorizontal: 80,
  },
});

export default PosterMovie;
