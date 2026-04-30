import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
export default function CreateAccount() {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState("");
  const signUp = async () => {
    if (!phoneNumber) {
      return alert('please enter your phone number')
    }
    const user = {
      name,
      phoneNumber

    }
    await AsyncStorage.setItem("user", JSON.stringify(user))

  }
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>

      <Text>Name:</Text>
      <TextInput value={name} onChangeText={setName} style={{ borderWidth: 1, padding: 10, marginTop: 10, marginBottom: 10 }} />
      <Text>Enter Phone Number</Text>

      <TextInput
        placeholder="0911xxxxxx"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={{
          borderWidth: 1,
          padding: 10,
          marginTop: 10,
          marginBottom: 10,
        }}
      />

      <Pressable onPress={signUp} style={{ backgroundColor: "purple", padding: 12 }}>
        <Text style={{ color: "white", textAlign: "center" }}>
          sign up
        </Text>
      </Pressable>
    </View>
  )
}

