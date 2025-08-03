export interface Admin {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'superadmin';
}

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getAdmin = (): Admin | null => {
  const adminStr = localStorage.getItem('admin');
  return adminStr ? JSON.parse(adminStr) : null;
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  const admin = getAdmin();
  return !!(token && admin);
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('admin');
  window.location.href = '/admin/login';
};
