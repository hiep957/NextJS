import React from "react";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <LoginForm />
      </div>
    </Layout>
  );
};
export default LoginPage;