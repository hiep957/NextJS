import React from 'react';
import Layout from '../components/Layout';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default RegisterPage;