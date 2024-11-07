import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentsList from './components/StudentsList/StudentsList';
import TeachersList from './components/TeachersList/TeachersList';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Grid from '@mui/material/Grid2';
import CourseTeachersList from './components/CourseTeachersList/CourseTeachersList';
import CoursesList from './components/CoursesList/CoursesList';
import EnrollmentsList from './components/EnrollmentsList/EnrollmentsList';


const App = () => {
  
  return (
    <div>
      <Navbar></Navbar>
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Routes>
          <Route path="/" element={
            <Home/>
          }></Route>
          <Route path="/home" element={
            <Home/>
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
