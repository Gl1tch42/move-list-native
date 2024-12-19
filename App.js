import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import LoginPage from './components/LoginPage';
import Profile from './components/Profile';
import { FavoriteProvider } from './components/FavoriteContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authStatus = await AsyncStorage.getItem('isAuthenticated');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }
    };
    checkAuthStatus();
  }, []);

  const handleSearch = async (query) => {
    const apiKey = '18dc4cb389aac32424a96a41e455e924';
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    const moviesWithTrailers = await Promise.all(searchData.results.map(async (movie) => {
      const trailerUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`;
      const trailerResponse = await fetch(trailerUrl);
      console.log('colocando trailer')
      const trailerData = await trailerResponse.json();
      return {
        ...movie,
        trailer: trailerData.results.length > 0 ? `https://www.youtube.com/watch?v=${trailerData.results[0].key}` : null,
      };
    }));

    setMovies(moviesWithTrailers);
  };

  const handleLogin = () => {
    AsyncStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    AsyncStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <FavoriteProvider>
      <SafeAreaView style={styles.safeArea}>

        {!isAuthenticated ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <>
            <View style={styles.container}>
              <View style={styles.superior}>
                <Profile onLogout={handleLogout} />
              </View>
              <Text style={styles.header}>Where is my movie ?</Text>
              <SearchBar onSearch={handleSearch} />
              <MovieList movies={movies} />
            </View>
          </>
        )}
      </SafeAreaView>
    </FavoriteProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#141414',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  superior: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    padding: 10,
  },
  header: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
});

export default App;
