import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Footer from './src/components/Footer';
import Main from './src/components/Main'
import { store } from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={styles.title}>Список координат:</Text>
        <Main />
        <Footer />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    paddingTop: 50
  }
});
