import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import { Student } from '../../api';

interface ModalProps {
  title: string,
  isOpen: boolean,
  onClose: () => void;
  onSubmit: (student: Student) => void;
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

export default function AddStudentModal(props: ModalProps) {
  const { onClose, onSubmit, isOpen, title } = props;
  
  const [name, setName] = React.useState('');

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.target.value);
  }

  const submit = async () => {
    const newStudent: Student = { name };
    await onSubmit(newStudent);
  };

  return (
    <div>
      <Modal open={isOpen}>
        <Box sx={boxStyle}>
          <h1 className='text-xl font-bold'>{title}</h1>
          <Input type='Text' id='nameInput' 
            onChange={(e) => onNameChange(e)}
            style={{ display: 'block' }}></Input>
          <Button type='button' onClick={() => { onClose() }}>Close</Button>
          <Button type='button' onClick={() => { submit() }}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}