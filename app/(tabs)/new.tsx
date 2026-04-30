import { Pressable, StyleSheet, Text, View } from "react-native";
import { addConnection } from "../utilis/storage";
export default function New() {
  return (
    <View style={styles.container}>
      <Pressable onPress={async () => {
        await addConnection("betii")
        console.log("user added")
      }} >
        <Text style={{ color: "black" }}>Add Friend</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  }
})