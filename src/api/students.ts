import getBaseUrl from "../utils/axiosSetup";
import axios from "axios";

export interface Student {
  id?: string,
  name: string
}

const BASE_URL = getBaseUrl();

export const fetchStudents = async () => {
  const response = await axios.get(`${BASE_URL}/api/students`);
  return response.data;
};

export const addStudent = async (newStudent: Student) => {
  const response = await axios.post(`${BASE_URL}/api/students`, newStudent);
  return response.data;
}

export const deleteStudent = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/api/students/${id}`);
  return response.data;
};