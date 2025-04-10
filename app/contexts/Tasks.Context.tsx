import React, { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = {
    id: string;
    title: string;
    desc: string;
    dueDate: string;
}

interface TaskContextInterface {
    tasks: Task[];  // array with strings
    addTask: (task: string, desc: string) => void; //function to add task to the list
    removeTask: (taskToRemove: string) => void; //function to remove task from list
    clearTasks: () => void; //function removes all tasks from list
}


const TaskContext = createContext<TaskContextInterface>({
    tasks: [],
    addTask: () => { },
    removeTask: () => { },
    clearTasks: () => { },
});

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const loadTasks = async () => {
          const storedTasks = await AsyncStorage.getItem('tasks');
          if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
          }
        };
        loadTasks();
      }, []);

      // Save tasks in AsyncStorage
    useEffect(() => {
        const saveTasks = async () => {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        };
        saveTasks();
    }, [tasks]);

    // Add Task
    const addTask = (title: string, desc: string, dueDate: string) => {
        const newTask: Task = { id: Date.now().toString(), title, desc, dueDate  }; // Generate a unique uuid
        setTasks([...tasks, newTask]); // Add the new task to the tasks array
        console.log('Task with has been added.');
    };

    // Remove task
    const removeTask = (taskToRemoveId: string) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskToRemoveId));
    console.log(`Task with id ${taskToRemoveId} has been deleted.`);
};
    // Delete all tasks
    const clearTasks = async () => {
        setTasks([]);
        await AsyncStorage.removeItem('tasks');
    };

    return (
        <TaskContext.Provider value={({tasks, addTask, removeTask, clearTasks })} >
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);
