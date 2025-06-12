export const createAuthenticated = (
  set: (fn: (state: any) => any) => void
) => ({
  isAuthenticated: false,
  userData: null,
  setUserData: (user: any) => {
    set((state: any) => ({
      ...state,
      isAuthenticated: true,
      userData: user,
    }));
  },
  logout: async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}u/logout`, {
        method: "POST",
        credentials: "include", // quan trọng để gửi cookie httpOnly
      });

      if (!res.ok) {
        console.error("Logout failed");
        return;
      }

      set((state: any) => ({
        ...state,
        userData: null,
        isAuthenticated: false,
      }));
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
});
