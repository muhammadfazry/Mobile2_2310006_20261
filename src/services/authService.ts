import { API_ENDPOINTS } from "@/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { File } from "expo-file-system";
import { Platform } from "react-native";
// ... (biarkan interface UserData, AuthResponse, AuthSession, LoginPayload, RegisterPayload tetap)
export interface UpdateProfilePayload {
  name: string;
  email: string;
  no_hp: string;
}

export interface UpdatePasswordPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface ProfileResponse {
  success: boolean;
  message?: string;
  user: UserData;
  foto_url?: string;
}

export interface BasicMessageResponse {
  success: boolean;
  message: string;
}

export interface PhotoUploadAsset {
  uri: string;
  fileName?: string | null;
  mimeType?: string | null;
}
// 5. Ambil Profil Terbaru dari Server Laravel
export async function fetchProfileApi(token: string): Promise<ProfileResponse> {
  try {
    const response = await fetch(API_ENDPOINTS.PROFILE, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleApiResponse<ProfileResponse>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Tidak dapat terhubung ke server Laravel. Periksa koneksi Wi-Fi Anda.",
      );
    }
    throw error;
  }
}

// 6. Perbarui Nama, Email, dan Nomor HP
export async function updateProfileApi(
  token: string,
  payload: UpdateProfilePayload,
): Promise<ProfileResponse> {
  try {
    const response = await fetch(API_ENDPOINTS.UPDATE_PROFILE, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return await handleApiResponse<ProfileResponse>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Gagal menghubungi server saat menyimpan profil. Cek koneksi Wi-Fi.",
      );
    }
    throw error;
  }
}

// 7. Ganti Kata Sandi
export async function updatePasswordApi(
  token: string,
  payload: UpdatePasswordPayload,
): Promise<BasicMessageResponse> {
  try {
    const response = await fetch(API_ENDPOINTS.UPDATE_PASSWORD, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return await handleApiResponse<BasicMessageResponse>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Gagal menghubungi server saat mengganti kata sandi. Cek koneksi Wi-Fi.",
      );
    }
    throw error;
  }
}

// 8. Upload Foto Profil (FormData Multipart — Mendukung HP & Expo Web)
export async function uploadProfilePhotoApi(
  token: string,
  asset: PhotoUploadAsset,
): Promise<ProfileResponse> {
  try {
    const formData = new FormData();
    const fallbackExt =
      asset.mimeType === "image/png"
        ? "png"
        : asset.mimeType === "image/webp"
          ? "webp"
          : "jpg";
    const fileName = asset.fileName || `profile_${Date.now()}.${fallbackExt}`;
  

    if (Platform.OS === "web") {
      const blobResponse = await fetch(asset.uri);
      const blob = await blobResponse.blob();
      formData.append("foto", blob, fileName);
    } else {
       const file = new File(asset.uri);
      formData.append("foto", file);
    }

    // PENTING: Jangan menuliskan header "Content-Type" manual saat mengirim FormData,
    // karena fetch() akan otomatis membuat boundary multipart yang benar!
    const response = await fetch(API_ENDPOINTS.UPDATE_PHOTO, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return await handleApiResponse<ProfileResponse>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Gagal mengunggah foto ke server. Pastikan server menyala (--host=0.0.0.0).",
      );
    }
    throw error;
  }
}

// 9. Perbarui Data User Tersimpan di AsyncStorage Tanpa Menghapus Token
export async function updateStoredUser(user: UserData): Promise<void> {
  await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}
const AUTH_TOKEN_KEY = "@novinaldiapp_token";
const AUTH_USER_KEY = "@novinaldiapp_user";
export interface UserData {
  id: number;
  name: string;
  email: string;
  no_hp: string | null;
  foto: string | null;
}
export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: UserData;
}
export interface AuthSession {
  token: string;
  user: UserData;
}
export interface LoginPayload {
  email: string;
 password: string;
}
export interface RegisterPayload {
  name: string;
  email: string;
  no_hp: string;
  password: string;
  password_confirmation: string;
}
// Helper pembantu agar parsing error dari Laravel 13 seragam dan rapi
async function handleApiResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    // Jika Laravel mengembalikan error validasi 422 (misal: { errors: { email: ["..."] } })
    if (data?.errors) {
      const firstKey = Object.keys(data.errors)[0];
      const firstMsg = data.errors[firstKey]?.[0];
      if (firstMsg) {
        throw new Error(firstMsg);
      }
    }
    throw new Error(
      data?.message || `Permintaan gagal dengan status HTTP ${response.status}.`,
    );
  }
  return data as T;
}
// 1. Perintah API Login
export async function loginApi(payload: LoginPayload): Promise<AuthResponse> {
  try {
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return await handleApiResponse<AuthResponse>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Tidak dapat terhubung ke server Laravel. Pastikan server berjalan (--host=0.0.0.0) dan IP Wi-Fi "
      );
    }
    throw error;
  }
}
// 2. Perintah API Register
export async function registerApi(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  try {
    const response = await fetch(API_ENDPOINTS.REGISTER, {
      method: "POST",
      headers: {
        Accept: "application/json",
  "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return await handleApiResponse<AuthResponse>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Tidak dapat terhubung ke server Laravel. Periksa koneksi Wi-Fi dan alamat API_BASE_URL.",
      );
    }
    throw error;
  }
}
// 3. Perintah API Logout (Menghapus token di database server)
export async function logoutApi(token: string): Promise<void> {
  try {
    await fetch(API_ENDPOINTS.LOGOUT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    // Jika jaringan sedang terputus saat logout, sesi lokal di HP tetap kita bersihkan
  }
}
// 4. Helper Penyimpanan Sesi AsyncStorage (Simpan, Baca, Hapus)
export async function saveAuthSession(
  user: UserData,
  token: string,
): Promise<void> {
  await AsyncStorage.multiSet([
    [AUTH_TOKEN_KEY, token],
    [AUTH_USER_KEY, JSON.stringify(user)],
  ]);
}
export async function getAuthSession(): Promise<AuthSession | null> {
  const values = await AsyncStorage.multiGet([AUTH_TOKEN_KEY, AUTH_USER_KEY]);
  const token = values[0]?.[1];
  const userJson = values[1]?.[1];
  if (!token || !userJson) {
    return null;
  }
  try {
    return { token, user: JSON.parse(userJson) as UserData };
  } catch {
    return null;
  }
}
export async function clearAuthSession(): Promise<void> {
  await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, AUTH_USER_KEY]);
}