import React from "react";

const TaskItem = ({
  task,
  tasks,
  setTasks,
}: {
  task: { id: number; text: string; done: boolean };
  tasks: { id: number; text: string; done: boolean }[];
  setTasks: (tasks: { id: number; text: string; done: boolean }[]) => void;
}) => {
  const deleteTask = () => {
    const taskToDelete = tasks.findIndex(
      (taskToFind: { id: number; text: string; done: boolean }) =>
        taskToFind.id === task.id
    );

    const copy = [...tasks];
    copy.splice(taskToDelete, 1);
    setTasks(copy);
  };

  const handleDone = () => {
    const copy = [...tasks];
    const taskToUpdate = copy.find(
      (element: { id: number; text: string; done: boolean }) => {
        return element.id === task.id;
      }
    );
    if (taskToUpdate) {
      taskToUpdate.done = !taskToUpdate.done;
    }
    setTasks(copy);
  };
  return (
    <div className="flex items-center justify-between p-4 bg-black-50 rounded-md border border-gray-200">
      <span
        className={`flex-1 ${
          task.done ? "line-through text-gray-500" : "text-gray-800"
        }`}>
        {task.text}
      </span>
      <div className="flex space-x-2 ml-4">
        <button
          onClick={handleDone}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors">
          {task.done ? "Undo" : "Done"}
        </button>
        <button
          onClick={deleteTask}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
