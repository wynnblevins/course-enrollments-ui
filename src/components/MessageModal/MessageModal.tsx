import React from 'react'
import { Box, Button, Modal } from '@mui/material';

interface ModalProps {
  title: string,
  message: string,
  isOpen: boolean,
  onCancel: () => void;
  onConfirm: () => void;
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

const MessageModal = (props: ModalProps) => {
  const { onCancel, onConfirm,isOpen, title, message } = props;
  
  return (
    <div>
      <Modal open={isOpen}>
        <Box sx={boxStyle}>
          <h1 className='text-xl font-bold'>{title}</h1>
          <p>{message}</p>
          <Button type='button' onClick={() => { onConfirm() }}>OK</Button>
          <Button type='button' onClick={() => { onCancel() }}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default MessageModal;
