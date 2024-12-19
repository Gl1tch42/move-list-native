import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const Trailer = ({ url }) => {
  return (
    <View style={styles.trailerWrapper}>
      {url ? (
        <WebView 
          source={{ uri: url }}
          style={styles.video}
          
        />
      ) : (
        <Text style={styles.unavailable}>Trailer não disponível</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  trailerWrapper: {
    width: '100%',
    maxWidth: 560,
    marginVertical: 10,
    alignSelf: 'center',
    height: 300,
  },
  video: {
    flex: 1,
  },
  unavailable: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Trailer;
