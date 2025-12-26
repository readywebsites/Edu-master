import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Adjust the baseURL to your Django server address
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getCourses = () => {
  return apiClient.get('/courses/');
};

export const login = (username, password) => {
  return apiClient.post('/token/', { username, password });
};

export const register = (userData) => {
  return apiClient.post('/users/', userData); // Assuming DefaultRouter maps CustomUserViewSet to /users/
};

export const getAdminStats = () => {
  return apiClient.get('/admin/stats/');
};

export const getUsers = (params) => {
  return apiClient.get('/users/', { params });
};

export const updateUser = (id, data) => {
  return apiClient.patch(`/users/${id}/`, data);
};

export const deleteUser = (id) => {
  return apiClient.delete(`/users/${id}/`);
};

export const bulkUserAction = (userIds, action) => {
  return apiClient.post('/admin/bulk-user-action/', { user_ids: userIds, action });
};

export const assignCourse = (userId, courseIds, action = 'assign') => {
  return apiClient.post('/admin/assign-course/', { user_id: userId, course_ids: courseIds, action });
};

// Course CRUD
export const createCourse = (data) => {
  return apiClient.post('/courses/', data);
};

export const updateCourse = (id, data) => {
  return apiClient.patch(`/courses/${id}/`, data);
};

export const deleteCourse = (id) => {
  return apiClient.delete(`/courses/${id}/`);
};

// Announcements
export const getAnnouncements = (params) => {
  return apiClient.get('/announcements/', { params });
};

export const createAnnouncement = (data) => {
  return apiClient.post('/announcements/', data);
};

export const updateAnnouncement = (id, data) => {
  return apiClient.patch(`/announcements/${id}/`, data);
};

export const deleteAnnouncement = (id) => {
  return apiClient.delete(`/announcements/${id}/`);
};

export default apiClient;
