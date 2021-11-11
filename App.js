import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
        <WebView 
          cacheEnabled={false}
          style={styles.container}
          source={{uri: 'https://bike-check-92c8f.web.app/'}}
        />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});