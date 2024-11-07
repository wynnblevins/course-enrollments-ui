import axios from "axios";

const getBaseUrl = () => {
  let url;
  switch(process.env.NODE_ENV) {
    case 'production':
      url = 'https://course-enrollment-0-0-3.onrender.com';
      break;
    case 'development':
      url = 'http://localhost:8080'
      break;
    default:
      url = 'http://localhost:8080';
  }

  return url;
}

export default getBaseUrl;