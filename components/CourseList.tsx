import React from 'react';
import { Typography, Box, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import { School, CheckCircleOutline } from '@mui/icons-material';

const CourseList: React.FC = () => {
  const courses = [
    { id: 1, title: 'HTML & CSS Fundamentals', duration: '4 weeks' },
    { id: 2, title: 'JavaScript Essentials', duration: '6 weeks' },
    { id: 3, title: 'React.js for Beginners', duration: '8 weeks' },
  ];

  return (
    <Box className="p-6 border rounded-lg shadow-md bg-white w-full">
      <Typography variant="h5" className="mb-4 font-bold text-gray-800">
        Khóa học nổi bật
      </Typography>
      <List className="mb-6">
        {courses.map((course) => (
          <ListItem key={course.id} className="mb-2 bg-gray-50 rounded-md">
            <ListItemIcon>
              <School className="text-blue-500" />
            </ListItemIcon>
            <ListItemText
              primary={course.title}
              secondary={`Thời gian: ${course.duration}`}
              primaryTypographyProps={{ className: "font-semibold" }}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="body1" className="mb-4 text-gray-700">
        Các khóa học của chúng tôi cung cấp:
      </Typography>
      <List className="mb-6">
        {['Bài giảng video chất lượng cao', 'Dự án thực tế', 'Hỗ trợ 1-1 từ giảng viên', 'Chứng chỉ sau khi hoàn thành'].map((item, index) => (
          <ListItem key={index} className="py-1">
            <ListItemIcon>
              <CheckCircleOutline className="text-green-500" />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        className="mt-4 bg-blue-600 hover:bg-blue-700"
      >
        Đăng ký ngay
      </Button>
    </Box>
  );
};

export default CourseList;