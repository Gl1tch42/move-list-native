import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Button, FlatList } from 'react-native';
import Trailer from './Trailer';
import FavoriteContext from './FavoriteContext';

const MovieList = ({ movies }) => {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoriteContext);
  const isFavorite = (movie) => favorites.some(fav => fav.id === movie.id);

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.overview}>{item.overview}</Text>
            <Trailer url={item.trailer} />
            {isFavorite(item) ? (
              <Button title="Remover dos Favoritos" onPress={() => removeFavorite(item.id)} />
            ) : (
              <Button title="Adicionar aos Favoritos" onPress={() => addFavorite(item)} />
            )}
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    margin: 10,
    padding: 20,
    width: 280,
    maxHeight: 629,
    textAlign: 'left',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
  },
  overview: {
    fontSize: 16,
    color: '#999',
    height: 60,
    overflow: 'hidden',
    marginBottom: 10,
  },
});

export default MovieList;
