import React from "react";
import TaskForm from "./page/TaskForm";
import Navbar from "./page/Navbar";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <TaskForm />
    </div>
  );
};

export default App;
