import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { PlusCircle } from "lucide-react";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (task) => {
    setEditingTask(task);
  };

  const finishEditing = (id, newText) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
    setEditingTask(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 dark:text-gray-200 rounded-2xl shadow-xl p-6 transition-all">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-t-2xl text-white text-center">
        <h1 className="text-3xl font-bold">Todo List</h1>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="flex-grow bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-l-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white p-3 rounded-r-full hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <PlusCircle size={24} />
          </button>
        </div>
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              isEditing={editingTask && editingTask.id === task.id}
              onDelete={() => deleteTask(task.id)}
              onToggle={() => toggleTask(task.id)}
              onStartEdit={() => startEditing(task)}
              onFinishEdit={(newText) => finishEditing(task.id, newText)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
