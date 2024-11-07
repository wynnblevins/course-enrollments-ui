import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, Input, Modal, TextField } from '@mui/material';
import { Course, CourseTeacher, Enrollment, fetchCourses, fetchStudents, fetchTeachers, Teacher, addEnrollment, Student } from '../../api';

interface ModalProps {
  title: string,
  isOpen: boolean,
  onClose: () => void;
  onSubmit: (enrollment: Enrollment) => void;
}

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EnrollmentModal = (props: ModalProps) => {
  const { onClose, onSubmit, isOpen, title } = props;
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [course, setCourse] = useState<Course>();
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    const onMount = async () => {
      await fetchData()  
    };
    onMount();
  }, [])

  const submit = () => {
    if (course && student) {
      const newEnrollment: Enrollment = {
        course,
        student
      };
      onSubmit(newEnrollment)
    }
  }

  const handleStudentSelected = (e: any) => {
    const option = e.target.innerText;
    
    // find the id from the data array
    var student = students.find((d) => { 
      return d.name === option
    }); 
    if (student?.id) {
      setStudent(student);
    }    
  }

  const handleCourseSelected = (e: any) => {
    const option = e.target.innerText;
    
    // find the id from the data array
    var course = courses.find((d) => { 
      return d.name === option
    }); 
    if (course?.id) {
      setCourse(course);
    }    
  }

  const fetchData = async () => {
    const coursesData = await fetchCourses();
    const studentsData = await fetchStudents();

    setCourses(coursesData);
    setStudents(studentsData);
  };

  return (
    <div>
      <Modal open={isOpen}>
        <Box sx={boxStyle}>
          <h1 className='text-xl font-bold'>{title}</h1>
          <Autocomplete
            disablePortal 
            options={courses}
            getOptionLabel={(option) => option.name}
            onChange={(e) => { handleCourseSelected(e) }}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Course" />}
          />
          <Autocomplete
            disablePortal 
            options={students}
            onChange={(e) => { handleStudentSelected(e) }}
            getOptionLabel={(option) => option.name}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Teacher" />}
          />
          <Button type='button' onClick={() => { onClose() }}>Close</Button>
          <Button type='button' onClick={() => { submit() }}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default EnrollmentModal;
