import getBaseUrl from "../utils/axiosSetup";
import axios from "axios";

export interface Course {
  id?: string,
  name: string
}

const BASE_URL = getBaseUrl();

export const fetchCourses = async () => {
  const response = await axios.get(`${BASE_URL}/api/courses`);
  return response.data;
};

export const addCourse = async (newCourse: Course) => {
  const response = await axios.post(`${BASE_URL}/api/courses`, newCourse);
  return response.data;
}

export const deleteCourse = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/api/courses/${id}`);
  return response.data;
};