import React from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { useTasks } from '../contexts/Tasks.Context';

export const TaskItem = (props: any) => {

    /** Components logic */
    const { id, title, onPressGoToDetails, completed, task } = props;
    const { toggleTaskCompleted } = useTasks();

    /** Determine the color of the dueMarker based on the due date */
    const getDueMarkerColor = () => {
        const now = new Date();
        const dueDate = new Date(task.dueDate);
        const timeDifference = dueDate.getTime() - now.getTime(); // Difference in milliseconds

        if (timeDifference < 0) {
            return '#DB2929'; // Overdue
        } else if (timeDifference <= 24 * 60 * 60 * 1000) {
            return '#DBB229'; // Less than 24 hours
        } else {
            return '#44A950'; // More than 24 hours
        }
    };

    return (
        <Pressable style={[styles.task]} onPress={onPressGoToDetails}>
            <View style={[styles.dueMarker, { backgroundColor: getDueMarkerColor() }]}/>
            <View style={styles.taskItem}>
                <Text style={[styles.taskText]}>
                    {title}
                </Text>
                <Text style={[styles.dueDate]}>
                    Due Date: {new Date(task.dueDate).toDateString()}
                </Text>
            </View>
            <Pressable
                style={[styles.doneButton]}
                onPress={() => toggleTaskCompleted(id)}
            >
                <Text style={[styles.doneButtonText]}>
                    {completed ? 'Undo' : 'Done'}
                </Text>
            </Pressable>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    task: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        margin: 10,
    },
    completedTask: {
        backgroundColor: '#d3d3d3', // Grey background for completed tasks
    },
    dueMarker: {
        backgroundColor: 'red',
        width: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 0,
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 10,
    },
    taskItem: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
    },
    taskText: {
        fontSize: 17,
        paddingTop: 10,
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
        paddingTop: 5,
        paddingBottom: 10,
    },
    doneButton: {
        backgroundColor: '#1320bf',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    doneButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
