import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import useSWR from 'swr';
import { fetcherTMDB } from '../../Config/fetcherTMDB';

const MovieDetail = ({ route }) => {
  const { movieID } = route.params;
  const { data, error, isLoading } = useSWR(
    `/movie/${movieID}?append_to_response=credits,images,videos`,
    fetcherTMDB
  );

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

  return (
    <ScrollView style={styles.container}>
      {data && (
        <>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${data.poster_path}` }}
            style={styles.posterImage}
          />
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.overview}>{data.overview}</Text>
          <Text style={styles.sectionTitle}>Cast</Text>
          <View style={styles.castContainer}>
            {data.credits.cast.map((castMember) => (
              <View key={castMember.cast_id} style={styles.castItem}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w200${castMember.profile_path}` }}
                  style={styles.castImage}
                />
                <Text style={styles.castName}>{castMember.name}</Text>
                <Text style={styles.castCharacter}>{castMember.character}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterImage: {
    width: '100%',
    height: 500,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 10,
  },
  overview: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 20,
    marginVertical: 10,
  },
  castContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  castItem: {
    width: 100,
    marginBottom: 20,
    alignItems: 'center',
  },
  castImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  castName: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  castCharacter: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
  },
  errorText: {
    color: '#ff0000',
  },
});

export default MovieDetail;
