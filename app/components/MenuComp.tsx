import React from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const MenuComp = () => {
    const navigation = useNavigation(); // Hook to access navigation

    return (
        <View style={styles.menuBar}>
            <Pressable
                style={styles.menuButton}
                onPress={() => navigation.navigate('Overview')}
            >
                <Text style={styles.menuButtonText}>Overview</Text>
            </Pressable>
            <Pressable
                style={styles.menuButton}
                onPress={() => navigation.navigate('AddTask')}
            >
                <Text style={styles.menuButtonText}>New Task</Text>
            </Pressable>
            <Pressable
                style={styles.menuButton}
                onPress={() => navigation.navigate('DoneTasks')}
            >
                <Text style={styles.menuButtonText}>Completed</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    menuBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#1320bf',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    menuButton: {
        alignItems: 'center',
        padding: 10,
    },
    menuButtonText: {
        color: '#fff',
        fontSize: 18,
        paddingVertical: 5,
    },
});
