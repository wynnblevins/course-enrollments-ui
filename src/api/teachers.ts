import getBaseUrl from "../utils/axiosSetup";
import axios from "axios";

const BASE_URL = getBaseUrl();

export const fetchTeachers = async () => {
  return await axios.get(`${BASE_URL}/api/teachers`);
};