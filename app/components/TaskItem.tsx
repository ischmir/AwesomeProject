import React from 'react';
import { Button, StyleSheet, Text, Pressable, View } from 'react-native';
import { useTasks } from '../contexts/Tasks.Context';

export const TaskItem = (props: any) => {

    /** Components logic */
    const { id, title, onPressGoToDetails, completed, task } = props;
    const { toggleTaskCompleted } = useTasks();

    /** Check if task is overdue */
    const isOverdue = new Date(task.dueDate) < new Date();

    return (
        <Pressable style={[styles.task]} onPress={onPressGoToDetails}>
            <View style={styles.taskItem}>
                <Text style={[styles.taskText, completed && styles.completedText, isOverdue && styles.overdueTask]}>
                    {title}
                </Text>
                <Text style={[styles.dueDate]}>
                    Due Date: {new Date(task.dueDate).toDateString()}
                </Text>
            </View>
            <Button
                title={completed ? 'Undo' : 'Done'}
                onPress={() => toggleTaskCompleted(id)}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    task: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        margin: 10,
    },
    completedTask: {
        backgroundColor: '#d3d3d3', // Grey background for completed tasks
    },
    overdueTask: {
        backgroundColor: '#ffe6e6',
    },
    taskItem: {
        flex: 1,
        justifyContent: 'center',
    },
    taskText: {
        fontSize: 17,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#a9a9a9',
    },
    overdueText: {
        color: '#ff4d4d',
    },
    dueDate: {
        fontSize: 14,
        color: '#666',
    },
});
