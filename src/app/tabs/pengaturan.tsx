
import { StyleSheet, Text, View } from "react-native";

export default function Pengaturan() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halaman Pengaturan</Text>
      <Text style={styles.description}>
        Selamat datang di menu Pengaturan aplikasi.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#072deb",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
  },
});
