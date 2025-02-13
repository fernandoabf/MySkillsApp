import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
    FlatList
} from 'react-native';
import SkillCard from '../components/SkillCard';
import Button from '../components/Button';

interface SkillData {
    id: string;
    name: string;
}

export function Home() {
    const [newSkill, setNewSkill] = useState('')
    const [mySkills, setMySkills] = useState<SkillData[]>([])

    function handleAddNewSkill() {
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }
        setMySkills(oldState => [...oldState, data])
    }
    function handleRemoveSkill(id: string) {
        setMySkills(oldState => oldState.filter(
            skill => skill.id !== id
        ))

    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Welcome</Text>

            <TextInput
                style={styles.input}
                placeholder="New Skill"
                placeholderTextColor="#555"
                onChangeText={setNewSkill}
            />

            <Button 
                title ="Add" 
                onPress={handleAddNewSkill}
            />

            <Text style={[styles.title, { marginVertical: 50 }]}>
                My Skills
            </Text>

            <FlatList
                data={mySkills}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <SkillCard 
                        skill={item.name}
                        onPress={() => handleRemoveSkill(item.id)} 
                    />
                )}
                showsVerticalScrollIndicator={false}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#121015',
        paddingHorizontal: 30,
        paddingVertical: 70,
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#1F1E25',
        color: '#FFF',
        fontSize: 18,

        padding: Platform.OS === 'ios' ? 15 : 12,
        marginTop: 30,
        borderRadius: 7
    }

})