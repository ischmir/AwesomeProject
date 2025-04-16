import React, { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = {
    id: string;
    title: string;
    desc: string;
    dueDate: string;
    completed: boolean;
}

interface TaskContextInterface {
    tasks: Task[];
    addTask: (task: string, desc: string) => void;
    toggleTaskCompleted: (taskId: string) => void;
    removeTask: (taskToRemove: string) => void;
    clearTasks: () => void;
}


const TaskContext = createContext<TaskContextInterface>({
    tasks: [],
    addTask: () => { },
    toggleTaskCompleted: () => {},
    removeTask: () => { },
    clearTasks: () => { },
});

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    {/* Get Tasks from AsyncStorage */}
    useEffect(() => {
        const loadTasks = async () => {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        };
        loadTasks();
    }, []);

    {/* Save Tasks */}
    useEffect(() => {
        const saveTasks = async () => {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        };
        saveTasks();
    }, [tasks]);

    {/* Add Task */}
    const addTask = (title: string, desc: string, dueDate: string) => {
        const newTask: Task = { id: Date.now().toString(), title, desc, dueDate, completed: false };
        setTasks([...tasks, newTask]);
        console.log('Task has been added.');
    };
    {/* Toggle Task Completion */}
    const toggleTaskCompleted = (taskId: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
        console.log(`Task with id ${taskId} toggled.`);
    };

    {/* Delete a Single Task */}
    const removeTask = (taskToRemoveId: string) => {
        setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskToRemoveId));
        console.log(`Task with id ${taskToRemoveId} has been deleted.`);
    };

    {/* Clear All Tasks that are not done */}
    const clearTasks = async () => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.completed));
        await AsyncStorage.setItem(
            'tasks',
            JSON.stringify(tasks.filter((task) => task.completed))
        );
        console.log('Cleared all incomplete tasks.');
    };

    {/* Clear All Tasks that are done */}
        const clearCompletedTasks = () => {
        setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
        console.log('All completed tasks have been removed.');
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                toggleTaskCompleted,
                removeTask,
                clearTasks,
                clearCompletedTasks
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);
