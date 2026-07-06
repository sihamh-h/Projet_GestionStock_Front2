import api from "./api";

export const profileService = {
  changePassword: async (userId, currentPassword, newPassword) => {
    await api.patch(`/api/rest/users/${userId}/change-password`, {
      currentPassword,
      newPassword,
    });
  },
};