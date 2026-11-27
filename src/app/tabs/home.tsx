import type { UserData } from "@/services/authService";
import { getAuthSession } from "@/services/authService";
import { homeStyles } from "@/styles/homeStyles";
import { Ionicons } from "@expo/vector-icons";

import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();

  // Menyimpan data pengguna yang sedang login
  const [user, setUser] = useState<UserData | null>(null);

  // Mengambil sesi autentikasi dari Laravel
   useFocusEffect(
  useCallback(() => {
    getAuthSession()
      .then((session) => {
        if (session) {
          setUser(session.user);
        }
      })
      .catch((error) => {
        console.error("Gagal mengambil sesi:", error);
      });
  }, [])
);

  const handleMenuPress = (
    menuName: string,
    targetRoute?: string
  ) => {
    if (targetRoute) {
      router.push(targetRoute as never);
    } else {
      Alert.alert(
        menuName,
        `Fitur ${menuName} siap dikembangkan pada tahapan modul berikutnya.`
      );
    }
  };

  return (
    <SafeAreaView
      style={homeStyles.safeArea}
      edges={[]}
    >
      <ScrollView
        style={homeStyles.scrollContainer}
        contentContainerStyle={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Kartu Sambutan */}
        <View style={homeStyles.welcomeCard}>
          <View style={homeStyles.statusBadge}>
  <Ionicons
    name="checkmark-circle"
    size={15}
    color="#059669"
  />

  <Text style={homeStyles.statusBadgeText}>
    Terhubung ke Server Laravel 13
  </Text>
</View>

          <Text style={homeStyles.greetingTitle}>
            Halo, {user?.name || "Selamat Datang"}!
          </Text>

          <Text style={homeStyles.greetingEmail}>
            {user?.email || email || "mahasiswa@kampus.ac.id"}
          </Text>
        </View>

        {/* Menu Utama */}
        <View style={homeStyles.menuCard}>
          <View style={homeStyles.menuHeader}>
            <Text style={homeStyles.menuSectionTitle}>
              Layanan &amp; Menu Utama
            </Text>

            <Text style={homeStyles.menuSectionSubtitle}>
              Pintasan cepat pengelolaan operasional minimarket
            </Text>
          </View>

          <View style={homeStyles.menuGrid}>
            {/* 1. Produk */}
            <TouchableOpacity
              style={homeStyles.menuItem}
              activeOpacity={0.75}
              onPress={() => handleMenuPress("Produk", "/produk")}
            >
              <View
                style={[
                  homeStyles.menuIconWrapper,
                  homeStyles.iconBgBlue,
                ]}
              >
                <Ionicons
                  name="cube"
                  size={26}
                  color="#2563EB"
                />
              </View>

              <Text style={homeStyles.menuLabel}>Produk</Text>
            </TouchableOpacity>

            {/* 2. Pelanggan */}
            <TouchableOpacity
              style={homeStyles.menuItem}
              activeOpacity={0.75}
              onPress={() => handleMenuPress("Pelanggan")}
            >
              <View
                style={[
                  homeStyles.menuIconWrapper,
                  homeStyles.iconBgGreen,
                ]}
              >
                <Ionicons
                  name="people"
                  size={26}
                  color="#059669"
                />
              </View>

              <Text style={homeStyles.menuLabel}>Pelanggan</Text>
            </TouchableOpacity>

            {/* 3. Supplier */}
            <TouchableOpacity
              style={homeStyles.menuItem}
              activeOpacity={0.75}
              onPress={() => handleMenuPress("Supplier")}
            >
              <View
                style={[
                  homeStyles.menuIconWrapper,
                  homeStyles.iconBgAmber,
                ]}
              >
                <Ionicons
                  name="business"
                  size={26}
                  color="#D97706"
                />
              </View>

              <Text style={homeStyles.menuLabel}>Supplier</Text>
            </TouchableOpacity>

            {/* 4. Barang Masuk */}
            <TouchableOpacity
              style={homeStyles.menuItem}
              activeOpacity={0.75}
              onPress={() => handleMenuPress("Barang Masuk")}
            >
              <View
                style={[
                  homeStyles.menuIconWrapper,
                  homeStyles.iconBgTeal,
                ]}
              >
                <Ionicons
                  name="download"
                  size={26}
                  color="#0D9488"
                />
              </View>

              <Text style={homeStyles.menuLabel}>
                Barang Masuk
              </Text>
            </TouchableOpacity>

            {/* 5. Barang Keluar */}
            <TouchableOpacity
              style={homeStyles.menuItem}
              activeOpacity={0.75}
              onPress={() => handleMenuPress("Barang Keluar")}
            >
              <View
                style={[
                  homeStyles.menuIconWrapper,
                  homeStyles.iconBgRose,
                ]}
              >
                <Ionicons
                  name="share"
                  size={26}
                  color="#E11D48"
                />
              </View>

              <Text style={homeStyles.menuLabel}>
                Barang Keluar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}