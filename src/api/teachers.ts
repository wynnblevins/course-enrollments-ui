import getBaseUrl from "../utils/axiosSetup";
import axios from "axios";

export interface Teacher {
  id?: string,
  name: string
}

const BASE_URL = getBaseUrl();

export const fetchTeachers = async () => {
  return await axios.get(`${BASE_URL}/api/teachers`);
};

export const addTeacher = async (teacher: Teacher) => {
  return await axios.post(`${BASE_URL}/api/teachers`, teacher);
};