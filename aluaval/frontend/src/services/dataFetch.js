const API_BASE_URL = "/api";

const headers = {
  "Content-Type": "application/json",
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  return handleResponse(response);
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    ...headers,
    token: token,
  };
};

export const getAll = async (route) => {
  const url = `${API_BASE_URL}/${route}`;
  return fetchData(url, { method: "GET", headers: getAuthHeaders() });
};

export const getById = async (route, id) => {
  const url = `${API_BASE_URL}/${route}/${id}`;
  return fetchData(url, { method: "GET", headers: getAuthHeaders() });
};

export const create = async (route, data) => {
  const url = `${API_BASE_URL}/${route}`;
  const options = {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  };
  return fetchData(url, options);
};

export const updateById = async (route, id, data) => {
  const url = `${API_BASE_URL}/${route}/${id}`;
  const options = {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  };
  return fetchData(url, options);
};

export const deleteById = async (route, id) => {
  const url = `${API_BASE_URL}/${route}/${id}`;
  return fetchData(url, { method: "DELETE", headers: getAuthHeaders() });
};

export const login = async (credentials) => {
  const url = `${API_BASE_URL}/auth/login`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(credentials),
  };
  const response = await fetchData(url, options);
  localStorage.setItem("token", response.token);
  return response;
};
