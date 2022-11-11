import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Footer from './src/components/Footer';
import Main from './src/components/Main'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список координат:</Text>
      <Main />
      <Footer />
      <StatusBar style="auto" />
    </View>
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
