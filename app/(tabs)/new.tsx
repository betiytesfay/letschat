import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { addConnection } from "../utilis/storage";


const generateUsers = () => {
  return Array.from({ length: 5 }, (_, i) => ({
    id: String(i),
    name: `User ${i + 1}`,
  }));
};

export default function New() {
  const [scanning, setScanning] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {

    const timer = setTimeout(() => {
      setUsers(generateUsers());
      setScanning(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (scanning) {
    return (
      <View style={styles.center}>
        <Text style={styles.scanText}>Scanning nearby users...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Users</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={async () => {
              await addConnection(item.name);
              console.log("Connected:", item.name);
            }}
            style={styles.card}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sub}>Tap to connect</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanText: {
    fontSize: 18,
    fontWeight: "600",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  sub: {
    color: "gray",
  },
});