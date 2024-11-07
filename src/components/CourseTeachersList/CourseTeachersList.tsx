
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton, Modal } from '@mui/material';
import StudentModal from '../StudentModal/StudentModal';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchCourseTeachers, CourseTeacher, deleteCourseTeacher, addCourseTeacher } from '../../api';
import CourseTeacherModal from '../CourseTeacherModal/CourseTeacherModal';

export default function CourseTeachersList() {
  const [courseTeachers, setCourseTeachers] = React.useState<CourseTeacher[]>([]);
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
    const teachers = await fetchCourseTeachers();
    setCourseTeachers(teachers);
  };

  const onAddCourseTeacher = async (courseTeacher: CourseTeacher) => {
    await addCourseTeacher(courseTeacher);
    setShowAddModal(false);
    await fetchData();
  };

  const onDeleteCourseTeacher = async (courseTeacherId: string) => {
    await deleteCourseTeacher(courseTeacherId);
    await fetchData();
  };

  return (
    <>
      <CourseTeacherModal
        title='Add New Class Instructor' 
        isOpen={showAddModal}
        onClose={onClose}
        onSubmit={onAddCourseTeacher} />
      <h2 style={{ float: 'left' }}>Class Instructors</h2>
      <Button style={{ float: 'right', marginTop: '15px' }} 
        type='button' 
        onClick={() => setShowAddModal(true)}>
          Add
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="class instructors list">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Teacher</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courseTeachers?.map((courseTeacher: CourseTeacher) => (
              <TableRow
                key={courseTeacher.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="td" scope="row">
                  {courseTeacher.id}
                </TableCell>
                <TableCell component="td" scope="row">
                  {courseTeacher.course.name}
                </TableCell>
                <TableCell component="td" scope="row">
                  {courseTeacher.teacher.name}
                </TableCell>
                <TableCell align='right' component="td" scope='row'>
                <IconButton 
                  onClick={() => { onDeleteCourseTeacher(courseTeacher.id!) }} 
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
