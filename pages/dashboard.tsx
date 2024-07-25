import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar,
  CircularProgress
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { People, AttachMoney, ShoppingCart, TrendingUp } from '@mui/icons-material';

const DashboardPage = () => {
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate user data fetching
    setTimeout(() => {
      setUser({ name: 'John Doe', role: 'Admin' });
      setIsLoading(false);
    }, 1500);
  }, []);

  const stats = [
    { title: 'Total Users', value: '1,234', icon: <People />, color: 'bg-blue-100 text-blue-800' },
    { title: 'Total Revenue', value: '$56,789', icon: <AttachMoney />, color: 'bg-green-100 text-green-800' },
    { title: 'Total Orders', value: '890', icon: <ShoppingCart />, color: 'bg-yellow-100 text-yellow-800' },
    { title: 'Growth', value: '+23%', icon: <TrendingUp />, color: 'bg-red-100 text-red-800' },
  ];

  const chartData = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  ];

  const recentActivities = [
    { id: 1, user: 'Alice', action: 'Created a new post', time: '2 hours ago' },
    { id: 2, user: 'Bob', action: 'Updated profile picture', time: '4 hours ago' },
    { id: 3, user: 'Charlie', action: 'Commented on a post', time: '1 day ago' },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <Typography variant="h4" component="h1" gutterBottom className="font-bold">
          Dashboard
        </Typography>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : (
          <>
            <Typography variant="h6" gutterBottom className="mt-4">
              Welcome back
            </Typography>
            
            <Grid container spacing={4} className="mt-4">
              {stats.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper className={`p-4 ${item.color}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <Typography variant="subtitle2">{item.title}</Typography>
                        <Typography variant="h4">{item.value}</Typography>
                      </div>
                      {item.icon}
                    </div>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={4} className="mt-4">
              <Grid item xs={12} md={8}>
                <Paper className="p-4">
                  <Typography variant="h6" gutterBottom>Monthly Overview</Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pv" fill="#8884d8" />
                      <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className="p-4">
                  <Typography variant="h6" gutterBottom>Recent Activities</Typography>
                  <List>
                    {recentActivities.map((activity) => (
                      <ListItem key={activity.id}>
                        <ListItemAvatar>
                          <Avatar>{activity.user[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={activity.action}
                          secondary={activity.time}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;