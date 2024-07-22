import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import React from "react";
import { FormData } from "../components/RegisterForm";

const DashboardPage = () => {
  const [user, setUser] = useState<FormData | null>();

  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       const res = await fetch("/api/user");
  //       if (res.ok) {
  //         const data: FormData = await res.json();
  //         setUser(data.user);
  //       }
  //     };
  //     fetchUser();
  //   }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {user ? <p>Welcome</p> : <p>Loading...</p>}
      </div>
    </Layout>
  );
};

export default DashboardPage;
