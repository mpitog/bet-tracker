export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const logoutUser = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login'; // redirect
};