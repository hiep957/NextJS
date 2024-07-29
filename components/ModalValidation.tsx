import React from 'react';
import { Modal, Box, Button, Typography, TextField } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ModalValidationProps {
  open: boolean;
  handleClose: () => void;
  otp: string;
  setOtp: (otp: string) => void;
  verifyOTP: () => void;
}

export default function ModalValidation({ 
  open, 
  handleClose, 
  otp, 
  setOtp, 
  verifyOTP 
}: ModalValidationProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...style,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Bạn cần nhập mã OTP để xác thực
        </Typography>
        <TextField 
          id="standard-basic" 
          label="Nhập mã OTP" 
          variant="standard" 
          fullWidth 
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button 
          variant="contained" 
          onClick={verifyOTP}
          sx={{ mt: 2 }}
        >
          Xác nhận
        </Button>
      </Box>
    </Modal>
  );
}