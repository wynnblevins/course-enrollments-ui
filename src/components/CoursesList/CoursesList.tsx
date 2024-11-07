
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import StudentModal from '../StudentModal/StudentModal';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchStudents, addStudent, Student, deleteStudent, fetchCourses, Course, addCourse, deleteCourse } from '../../api';
import CourseModal from '../CourseModal/CourseModal';

export default function CoursesList() {
  const [courses, setCourses] = React.useState<any>(null);
  const [showAddModal, setShowAddModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    const onMount = async () => {
      await fetchData();
    }
    onMount();
  }, []);
  
  const onClose = () => {
    setShowAddModal(false);
  };

  const fetchData = async () => {
    const coursesData = await fetchCourses();
    setCourses(coursesData)
  };

  const onAddNewCourse = async (course: Course) => {
    await addCourse(course);
    setShowAddModal(false);
    await fetchData();
  };

  const onDeleteCourse = async (courseId: string) => {
    
    
    await deleteCourse(courseId);
    await fetchData();
  };

  return (
    <>
      <CourseModal
        title='Add New Course' 
        isOpen={showAddModal}
        onClose={onClose}
        onSubmit={onAddNewCourse} />
      <h2 style={{ float: 'left' }}>Courses</h2>
      <Button style={{ float: 'right', marginTop: '15px' }} 
        type='button' 
        onClick={() => setShowAddModal(true)}>
          Add
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="students list">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses?.map((course: Course) => (
              <TableRow
                key={course.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="td" scope="row">
                  {course.id}
                </TableCell>
                <TableCell component="td" scope="row">
                  {course.name}
                </TableCell>
                <TableCell align='right' component="td" scope='row'>
                <IconButton 
                  onClick={() => { onDeleteCourse(course.id!) }} 
                  aria-label="delete" 
                  size="large">
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
