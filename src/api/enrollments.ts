import getBaseUrl from "../utils/axiosSetup";
import axios from "axios";
import { Course } from "./courses";
import { Student } from './students';

export interface Enrollment {
  id?: string,
  course: Course,
  student: Student
}

const BASE_URL = getBaseUrl();

export const fetchEnrollments = async () => {
  const response = await axios.get(`${BASE_URL}/api/enrollments`);
  return response.data;
};

export const addEnrollment = async (newEnrollment: Enrollment) => {
  const response = await axios.post(`${BASE_URL}/api/enrollments`, newEnrollment);
  return response.data;
}

export const deleteEnrollment = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/api/enrollments/${id}`);
  return response.data;
};