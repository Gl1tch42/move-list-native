import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

function SearchBar({ onSearch }) {
  const [query, setQuery] = React.useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        value={query} 
        onChangeText={setQuery} 
        placeholder="Search for movies..."
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    padding: 10,
    width: '80%',
    maxWidth: 400,
    fontSize: 16,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: '#1e1e1e',
    color: 'white',
  },
  button: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#e50914',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SearchBar;
