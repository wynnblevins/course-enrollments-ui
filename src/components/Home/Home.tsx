import React from 'react'
import { CircularProgress, LinearProgress } from '@mui/material';

interface HomeProps {
  started: boolean;
}

const Home = (props: HomeProps) => {
  const { started } = props;

  console.log(started);

  return (
    <div style={{ margin: '30px' }}>
      { started ? <></> : (
        <div>
          <LinearProgress />
          <span style={{ textAlign: 'center' }}>Loading...</span>
        </div> 
      )}
      <h1 style={{ textAlign: 'center' }}>About The Course Enrollments Project</h1>
      <p>This application is a pretend enrollment system for a college.  The app is a combination of React 
        frontend project (https://github.com/wynnblevins/course-enrollments-ui) and a Java/Spring rest API 
        (https://github.com/wynnblevins/CourseEnrollment).</p>
      <p>You can create students, teachers, and courses, then go over to the enrollments and class instructors 
        pages to enroll students in courses and assign teachers to courses.</p>
      <p>The backend for this project is hosted on render (https://render.com) and it talks to a database thats hosted within
        Aiven (https://aiven.io/).  All of this hosting is done on the "free" or "hobby" tiers.  What this means is that the servers
        for this project are stopped when not in use.  With that in mind, your initial interactions with the application may seem 
        delayed or laggy.  Please be patient.  The backend simply needs to "wake up", then the application will function normally.  This
        process could take between five to ten minutes.  Once the backend has started, the page links in the blue navbar (ie home, students,
        teachers, etc) will become enabled and you will be able to use the application normally.
      </p>
    </div>
  )
};

export default Home
