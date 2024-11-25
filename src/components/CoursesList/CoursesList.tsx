
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
import { 
  fetchStudents, 
  addStudent, 
  Student, 
  deleteStudent, 
  fetchCourses, 
  Course, 
  addCourse, 
  deleteCourse,
  fetchEnrollments,
  fetchEnrollmentsByCourseId, 
  deleteAllForCourse as deleteAllEnrollmentsForCourse,
  deleteAllCourseTeachersByCourse,
  fetchCourseTeachersByCourse,
} from '../../api';
import CourseModal from '../CourseModal/CourseModal';
import MessageModal from '../MessageModal/MessageModal';

export default function CoursesList() {
  const [courses, setCourses] = React.useState<any>(null);
  const [showAddModal, setShowAddModal] = React.useState<boolean>(false);
  const [showMessageModal, setShowMessageModal] = React.useState<boolean>(false);
  const deleteModalText = "This course has at least one enrollment and/or teacher assignment.  Deleting this course will also delete all course enrollments and teacher assignments.  Do you wish to continue?";
  
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

  const closeModal = () => {
    setShowMessageModal(false);
  };

  const performDelete = async (courseId: string) => {
    try {
      await deleteAllEnrollmentsForCourse(courseId);
    } catch (e: any) {
      console.error(`Unable to delete course enrollments for course ID ${courseId}`, e);
    }

    try {
      await deleteAllCourseTeachersByCourse(courseId);
    } catch (e: any) {
      console.error(`Unable to delete course teacher record for course ID ${courseId}`, e);
    }

    setShowMessageModal(false);

    try {
      await deleteCourse(courseId);
    } catch (e: any) {
      console.error(`Unable to delete course with ID ${courseId}`, e);
    }

    await fetchData();
  };

  const onDeleteCourseClick = async (courseId: string) => {
    const enrollmentsForCourse = await fetchEnrollmentsByCourseId(courseId);
    const teachingAssignmentsForCourse = await fetchCourseTeachersByCourse(courseId);

    if (enrollmentsForCourse.length || teachingAssignmentsForCourse.length) {
      setShowMessageModal(true);
    } else {
      performDelete(courseId); 
    }
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
              <>
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
                      onClick={() => { onDeleteCourseClick(course.id!) }} 
                      aria-label="delete" 
                      size="large">
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                  <MessageModal 
                    title={"Course Has Enrollments"}
                    message={deleteModalText}
                    isOpen={showMessageModal} 
                    onCancel={() => { closeModal() }}
                    onConfirm={() => { 
                      performDelete(course.id as string);
                    }}
                  ></MessageModal>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
