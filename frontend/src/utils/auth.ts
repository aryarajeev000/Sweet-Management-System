export const getUserRole = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || null;
  } catch (error) {
    // Invalid token format
    return null;
  }
};

export const isTokenValid = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    
    // Check if token has expiration
    if (payload.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp < currentTime) {
        // Token expired
        localStorage.removeItem("token");
        return false;
      }
    }
    
    return true;
  } catch (error) {
    // Invalid token format
    localStorage.removeItem("token");
    return false;
  }
};

export const getToken = (): string | null => {
  if (!isTokenValid()) {
    return null;
  }
  return localStorage.getItem("token");
};
