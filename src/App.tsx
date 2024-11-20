import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentsList from './components/StudentsList/StudentsList';
import TeachersList from './components/TeachersList/TeachersList';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Grid from '@mui/material/Grid2';
import CourseTeachersList from './components/CourseTeachersList/CourseTeachersList';
import CoursesList from './components/CoursesList/CoursesList';
import EnrollmentsList from './components/EnrollmentsList/EnrollmentsList';
import { fetchStudents } from './api';

interface AppState {
  started: boolean
}

const App = () => {
  const [appState, setAppState] = useState<AppState>({
    started: false
  })
  
  useEffect(() => {
    // Because we're on the render "free" tier, our app is stopped 
    // when we're not using it.  This is really just a super quick
    // dirty way to tell if backend has started running yet.
    const checkBackendStatus = () => {
      // every ten seconds, check for a response from the server
      const intervalID = setInterval(async () => {
        const studentsData = await fetchStudents();
        if (studentsData) {
          // we got a response, mark the app as started and enable navs
          setAppState({
            ...appState,
            started: true
          });
          clearInterval(intervalID);
        }
      }, 10000);
    };
    checkBackendStatus();
  }, []);

  return (
    <div>
      <Navbar started={appState.started}></Navbar>
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Routes>
          <Route path="/course-enrollments-ui" element={
            <Home started={appState.started}/>
          }></Route>
          <Route path="/home" element={
            <Home started={appState.started}/>
          }></Route>
          <Route path='/students' element={  
            <Grid size={{xs: 8}}>
              <StudentsList/>
            </Grid>          
          }></Route>
          <Route path='/teachers' element={
            <Grid size={{xs: 8}}>
              <TeachersList/>
            </Grid>
          }></Route>
          <Route path='/courses' element={
            <Grid size={{xs: 8}}>
              <CoursesList />
            </Grid>
          }></Route>
          <Route path='/enrollments' element={
            <Grid size={{xs: 8}}>
              <EnrollmentsList/>
            </Grid>
          }></Route>
          <Route path='/Class Instructors' element={
            <Grid size={{xs: 8}}>
              <CourseTeachersList />
            </Grid>
          }></Route>
        </Routes>    
      </Grid>
    </div>
  )
};

export default App
