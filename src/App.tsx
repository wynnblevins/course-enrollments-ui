import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudentsList from './components/StudentsList/StudentsList';
import TeachersList from './components/TeachersList/TeachersList';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Grid from '@mui/material/Grid2';

const App = () => {
  return (
    <div className="App">
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
        </Routes>    
      </Grid>
    </div>
  )
};

export default App
