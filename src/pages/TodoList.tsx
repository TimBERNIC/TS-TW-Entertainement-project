import React, { useState } from "react";
import TaskItem from "../components/TaskItem";

import "../App.css";

function TodoList() {
  interface task {
    id: number;
    text: string;
    done: boolean;
  }

  const [tasks, setTasks] = useState<task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTasks([...tasks, { id: tasks.length + 1, text: newTask, done: false }]);
  };

  return (
    <div className="container mx-auto max-w-md p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ajouter une tâche..."
        />
        <button className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Add
        </button>
      </form>
      <div className="mt-6 space-y-2">
        {tasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              task={task}
              tasks={tasks}
              setTasks={setTasks}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TodoList;
