import getBaseUrl from "../utils/axiosSetup";
import axios from "axios";
import { Course } from "./courses";
import { Teacher } from "./teachers";

export interface CourseTeacher {
  id?: string,
  course: Course,
  teacher: Teacher
}

const BASE_URL = getBaseUrl();

export const fetchCourseTeachers = async () => {
  const response = await axios.get(`${BASE_URL}/api/courseTeachers`);
  return response.data;
};

export const fetchCourseTeachersByTeacher = async (teacherId: string) => {
  const response = await axios.get(`${BASE_URL}/api/courseTeachers/teachers/${teacherId}`);
  return response.data;
};

export const fetchCourseTeachersByCourse = async (courseId: string) => {
  const response = await axios.get(`${BASE_URL}/api/courseTeachers/courses/${courseId}`);
  return response.data;
};

export const addCourseTeacher = async (courseTeacher: CourseTeacher) => {
  const response = await axios.post(`${BASE_URL}/api/courseTeachers`, courseTeacher);
  return response.data;
};

export const deleteCourseTeacher = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/api/courseTeachers/${id}`);
  return response.data;
};

export const deleteAllCourseTeachersForTeacher = async (teacherId: string) => {
  const response = await axios.delete(`${BASE_URL}/api/courseTeachers/teachers/${teacherId}`);
  return response.data;
};

export const deleteAllCourseTeachersByCourse = async (courseId: string) => {
  const response = await axios.delete(`${BASE_URL}/api/courseTeachers/courses/${courseId}`);
  return response.data;
};