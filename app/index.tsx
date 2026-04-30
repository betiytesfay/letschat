
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Index() {


  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("user")
      console.log("Saved user:", user);
      if (user) {
        router.replace("/(tabs)/allChat")
      }
      else {
        router.replace("/createAccount")
      }
    }

    checkUser();
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color="purple" size={50} style={styles.loading} />


    </View>
  )
}
const styles = StyleSheet.create({
  loading: {

  }
})