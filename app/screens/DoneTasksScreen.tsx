import React from 'react';
import { Text, FlatList, StyleSheet, SafeAreaView, Button } from 'react-native';
import { useTasks } from '../contexts/Tasks.Context';
import { TaskItem } from '../components/TaskItem';
import { MenuComp } from '../components/MenuComp';

const DoneTasksScreen = ({ navigation }) => {
    const { tasks, toggleTaskCompleted, clearCompletedTasks } = useTasks();

    // Filter completed tasks
    const completedTasks = tasks.filter((task) => task.completed);

    return (
        <SafeAreaView style={styles.container}>
            {completedTasks.length === 0 ? (
                <Text style={styles.noTasksText}>No completed tasks</Text>
            ) : (
                <FlatList
                    data={completedTasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TaskItem
                            id={item.id}
                            title={item.title}
                            task={item}
                            completed={item.completed}
                            onPressGoToDetails={() =>
                                navigation.navigate('TaskDetails', { task: item })
                            } // Fixed syntax error
                            onToggleCompleted={() => toggleTaskCompleted(item.id)} // Add toggle functionality
                        />
                    )}
                />
            )}
            <Button
                title="Clear All Completed Tasks"
                color="red"
                onPress={clearCompletedTasks}
            />
            <MenuComp />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 16,
        marginTop: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    noTasksText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default DoneTasksScreen;
