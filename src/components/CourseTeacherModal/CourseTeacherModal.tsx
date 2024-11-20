import React, { useEffect, useState } from 'react'
import { 
  Autocomplete, 
  Box, 
  Button, 
  Modal, 
  TextField 
} from '@mui/material';
import { 
  Course, 
  CourseTeacher, 
  fetchCourses, 
  fetchTeachers, 
  Teacher,
} from '../../api';

interface ModalProps {
  title: string,
  isOpen: boolean,
  onClose: () => void;
  onSubmit: (courseTeacher: CourseTeacher) => void;
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
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [course, setCourse] = useState<Course>();
  const [teacher, setTeacher] = useState<Teacher>();

  useEffect(() => {
    const onMount = async () => {
      await fetchData()  
    };
    onMount();
  }, [])

  const submit = () => {
    if (course && teacher) {
      const courseTeacher: CourseTeacher = {
        course,
        teacher
      };
      onSubmit(courseTeacher)
    }
  }

  const handleTeacherSelected = (e: any) => {
    const option = e.target.innerText;
    
    // find the id from the data array
    var student = teachers.find((d) => d.name === option); 
    if (student?.id) {
      setTeacher(student);
    }    
  }

  const handleCourseSelected = (e: any) => {
    const option = e.target.innerText;
    
    // find the id from the data array
    var course = courses.find((d) => d.name === option); 
    if (course?.id) {
      setCourse(course);
    }    
  }

  const fetchData = async () => {
    const coursesData = await fetchCourses();
    const teachersData = await fetchTeachers();

    setCourses(coursesData);
    setTeachers(teachersData);
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
            options={teachers}
            onChange={(e) => { handleTeacherSelected(e) }}
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
