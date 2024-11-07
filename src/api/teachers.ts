import getBaseUrl from "../utils/axiosSetup";
import axios from "axios";

export interface Teacher {
  id?: string,
  name: string
}

const BASE_URL = getBaseUrl();

export const fetchTeachers = async () => {
  const response = await axios.get(`${BASE_URL}/api/teachers`);
  return response.data;
};

export const addTeacher = async (teacher: Teacher) => {
  const response = await axios.post(`${BASE_URL}/api/teachers`, teacher);
  return response.data;
};

export const deleteTeacher = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/api/teachers/${id}`);
  return response.data;
};