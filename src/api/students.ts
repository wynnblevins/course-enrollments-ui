import getBaseUrl from "../utils/axiosSetup";
import axios from "axios";

export interface Student {
  id?: string,
  name: string
}

const BASE_URL = getBaseUrl();

export const fetchStudents = async () => {
  return await axios.get(`${BASE_URL}/api/students`);
};

export const addStudent = async (newStudent: Student) => {
  return await axios.post(`${BASE_URL}/api/students`, newStudent);
}