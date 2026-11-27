// Ganti alamat IP ini dengan IPv4 laptop Anda (cek lewat perintah 'ipconfig' di CMD)
// Pastikan HP dan Laptop terhubung ke jaringan Wi-Fi yang sama.
export const API_BASE_URL = "https://laravel-2310006-20261.ethiodeploy.app/api";

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  PROFILE: `${API_BASE_URL}/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/profile`,
  UPDATE_PASSWORD: `${API_BASE_URL}/profile/password`,
  UPDATE_PHOTO: `${API_BASE_URL}/profile/photo`,
  PROFILE_PHOTOS: `${API_BASE_URL}/profile-photos`,
  LOGOUT: `${API_BASE_URL}/logout`,
};

export function getStorageImageUrl(path?: string | null): string | null {
  if (!path) {
    return null;
  }

  const normalizedPath = path.replace(/\\/g, "/").split(/[?#]/, 1)[0];
  const filename = normalizedPath.split("/").pop();

  return filename
    ? `${API_ENDPOINTS.PROFILE_PHOTOS}/${encodeURIComponent(filename)}`
    : null;
}