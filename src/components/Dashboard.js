import React from "react";
import Header from "./Header";
import StudentTabs from "./StudentTabs";
import AdminTabs from "./AdminTabs.js";

const Dashboard = () => {
  return (
    
      
      <div className="dash-container">
        <h1>Dashboard</h1>
        <Header />
        <StudentTabs />
        <AdminTabs />
      </div>
    
  );
};

export default Dashboard;
