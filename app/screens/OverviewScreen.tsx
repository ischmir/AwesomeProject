import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { TaskItem } from '../components/TaskItem';
import { useTasks } from '../contexts/Tasks.Context';
import { SearchComp } from '../components/SearchComp';
import { MenuComp } from '../components/MenuComp';

const Overview = ({ navigation }) => {
    const { tasks, clearTasks } = useTasks();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTasks = tasks.filter(task =>
        !task.completed &&
        (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         task.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <SafeAreaView style={styles.background}>

            {/* Search Bar */}
            <View style={styles.inputContainer}>
                <SearchComp searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </View>

            <View style={styles.seperator} />

            {/* Task List */}
            {tasks.length === 0 ? (
                <Text style={styles.errorNoTasks}>No tasks available</Text>
            ) : (
                <FlatList
                    style={styles.tasksContainer}
                    data={filteredTasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TaskItem
                            id={item.id}
                            title={item.title}
                            task={item}
                            onPressGoToDetails={() =>
                                navigation.navigate('TaskDetails', { task: item })
                            }
                        />
                    )}
                />
            )}

            {/* Clear All Tasks Button */}
            {tasks.length > 0 && (
                <Button title="Clear All Tasks" onPress={clearTasks} />
            )}

            {/* View Completed Tasks Button */}
            <Button
                title="View Completed Tasks"
                onPress={() => navigation.navigate('DoneTasks')}
            />

            {/* Menu Bar */}
            <MenuComp />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#f8f8f8',
        flex: 1,
    },
    seperator: {
        height: 6,
        backgroundColor: '#1320bf',
    },
    tasksContainer: {
        padding: 10,
    },
    errorNoTasks: {
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Overview;
