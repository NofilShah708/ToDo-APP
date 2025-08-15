import React, { useState, useEffect } from "react";
import axios from "axios";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    background: "linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%)",
    padding: "2rem",
    gap: "2rem",
    flexWrap: "wrap",
  },
  form: {
    background: "#fff",
    padding: "2.5rem 2rem",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(60, 60, 120, 0.15)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  label: {
    fontWeight: 600,
    color: "#333",
    marginBottom: "0.5rem",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    background: "#f9fafb",
    fontSize: "1rem",
    marginTop: "0.25rem",
    resize: "none",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    background: "#f9fafb",
    fontSize: "1rem",
    marginTop: "0.25rem",
    minHeight: "80px",
    maxHeight: "200px",
    resize: "none",
    outline: "none",
  },
  submitBtn: {
    background: "linear-gradient(90deg, #4f8cff 0%, #38b6ff 100%)",
    color: "#fff",
    border: "none",
    padding: "0.9rem 0",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "0.5rem",
    boxShadow: "0 2px 8px rgba(79, 140, 255, 0.08)",
    transition: "background 0.2s, transform 0.1s",
  },
  taskList: {
    background: "#fff",
    padding: "2rem 1.5rem",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(60, 60, 120, 0.10)",
    width: "100%",
    maxWidth: "400px",
    minHeight: "300px",
  },
  taskItem: {
    background: "#f9fafb",
    borderRadius: "10px",
    padding: "1rem",
    marginBottom: "1rem",
    boxShadow: "0 2px 8px rgba(60, 60, 120, 0.05)",
  },
  tasktittle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
    backgroundColor: "transparent",
    color: "#4f8cff",
  },
  taskDesc: {
    marginBottom: "0.5rem",
    backgroundColor: "transparent",
    color: "#333",
  },

  taskDate: {
    marginBottom: "0.5rem",
    backgroundColor: "transparent",
    color: "#888",
    textAlign: "right",
    fontSize: "0.95rem",
  },
  actionBtn: {
    background: "#4f8cff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "0.5rem 1rem",
    marginRight: "0.5rem",
    cursor: "pointer",
    fontWeight: 600,
    transition: "background 0.2s",
  },
  deleteBtn: {
    background: "#ff4f4f",
  },
};

const TaskForm = () => {
  const [task, setTask] = useState({
    tittle: "",
    description: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.tittle || !task.description || !task.dueDate) {
      alert("Please fill in all fields");
      return;
    }

    axios
      .post("http://localhost:3001/api/tasks", task)
      .then((response) => {
        console.log("Task added successfully:", response.data);
        setTask({
          tittle: "",
          description: "",
          dueDate: "",
        });
        // Refresh task list after adding
        fetchTasks();
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        alert("Error adding task. Please try again.");
      });
  };

  const [tasks, setTasks] = useState([]);

  const handleCompleteTask = (taskId) => {
    axios
      .delete(`http://localhost:3001/api/tasks/${taskId}`)
      .then((response) => {
        console.log("Task deleted successfully:", response.data);
        // Refresh task list after deleting
        fetchTasks();
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        alert("Error deleting task. Please try again.");
      });
  };
  const handleDeleteTask = (taskId) => {
    axios
      .delete(`http://localhost:3001/api/tasks/${taskId}`)
      .then((response) => {
        console.log("Task deleted successfully:", response.data);
        // Refresh task list after deleting
        fetchTasks();
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        alert("Error deleting task. Please try again.");
      });
  };

  const fetchTasks = () => {
    axios
      .get("http://localhost:3001/api/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label htmlFor="tittle" style={styles.label}>
            Task Name:
          </label>
          <input
            type="text"
            id="tittle"
            name="tittle"
            value={task.tittle}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label htmlFor="description" style={styles.label}>
            Task Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
            style={styles.textarea}
          ></textarea>
        </div>
        <div>
          <label htmlFor="dueDate" style={styles.label}>
            Due Date:
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.submitBtn}>
          Add Task
        </button>
      </form>
      {tasks.length === 0 ? (
        <h2
          style={{
            color: "#888",
            textAlign: "center",
            width: "100%",
            marginTop: "2rem",
          }}
        >
          No task found
        </h2>
      ) : (
        <div style={styles.taskList}>
          <h2 style={{ color: "#4f8cff", marginBottom: "1rem" }}>Task List</h2>
          {tasks.map((task) => (
            <div key={task._id} style={styles.taskItem}>
              <h1 style={styles.tasktittle}>{task.tittle}</h1>
              <p style={styles.taskDesc}>{task.description}</p>
              <p style={styles.taskDate}>{task.dueDate}</p>
              <button
                style={styles.actionBtn}
                onClick={() => {
                  handleCompleteTask(task._id);
                }}
              >
                Complete Task
              </button>
              <button
                style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                onClick={() => {
                  handleDeleteTask(task._id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskForm;
