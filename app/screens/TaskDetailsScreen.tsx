import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

const TaskDetails = ({ route }) => {
    const { task } = route.params; // Access the passed task

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.desc}>{task.desc}</Text>
            <Text style={styles.dueDate}>Due Date: {new Date(task.dueDate).toDateString()}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    desc: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    dueDate: {
        fontSize: 16,
        color: '#333',
    },
});

export default TaskDetails;
