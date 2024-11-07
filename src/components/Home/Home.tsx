import React from 'react'

const Home = () => {
  return (
    <div style={{ margin: '30px' }}>
      <h1 style={{ textAlign: 'center' }}>About The Course Enrollments Project</h1>
      <p>This application is a pretend enrollment system for a college.This application is a combination of React 
        frontend project (https://github.com/wynnblevins/course-enrollments-ui) and a Java/Spring rest API 
        (https://github.com/wynnblevins/CourseEnrollment).</p>
      <p>This application is a pretend enrollment systemfor a college. You can create students, teachers, and courses, then go 
        over to the enrollments and class instructors pages to enroll students in courses and assign teachers to courses.</p>
      <p>The backend for this project is hosted on render (https://render.com) and it talks to a database thats hosted within
        Aiven (https://aiven.io/).  All of this hosting is done on the "free" or "hobby" tiers.  What this means is that the servers
        for this project are stopped when not in use.  With that in mind, your initial interactions with the application may seem 
        delayed or laggy.  Please be patient.  The backend simply needs to wake up, then the application will function normally.
      </p>
    </div>
  )
};

export default Home
