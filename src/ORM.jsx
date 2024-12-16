import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, deleteField } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCzBafJ3OEEfNtHM7kXIEpnedGlJ2bNo4I",
    authDomain: "personal-7f86b.firebaseapp.com",
    projectId: "personal-7f86b",
    storageBucket: "personal-7f86b.firebasestorage.app",
    messagingSenderId: "841997801423",
    appId: "1:841997801423:web:f849983b73acfdc6c424ba",
    measurementId: "G-7E35DS059C",
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getAbout() {
    const querySnapshot = await getDocs(collection(db, "About"));
    const abouts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return abouts[0];
}

export async function updateAbout(id, updatedAbout){
    try {
        const aboutRef = doc(db, "About", id);

        // If you want to delete `assignedTo` field, set it to FieldValue.delete()
        const updatedData = {
            text: updatedAbout
        };

        await updateDoc(aboutRef, updatedData);
        console.log("Document updated with ID: ", id);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

export async function getSkills() {
    const querySnapshot = await getDocs(collection(db, "Skills"));
    const skills = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return skills;
}

export async function createSkill(skill) {
    try {
        // Add a new document to the Skills collection
        const docRef = await addDoc(collection(db, "Skills"), skill);
        console.log("New skill added with ID:", docRef.id);
        return docRef.id; // Return the new skill's ID
    } catch (error) {
        console.error("Error adding new skill:", error);
    }
}

export async function deleteSkill(skillId) {
    try {
        // Reference the document in the Skills collection
        const skillDocRef = doc(db, "Skills", skillId);

        // Delete the document
        await deleteDoc(skillDocRef);

        console.log(`Skill with id ${skillId} has been successfully deleted.`);
    } catch (error) {
        console.error("Error deleting skill:", error);
    }
}

export async function createProject(project) {
    try {
        // Add a new document to the Skills collection
        const docRef = await addDoc(collection(db, "Projects"), project);
        console.log("New skill added with ID:", docRef.id);
        return docRef.id; // Return the new skill's ID
    } catch (error) {
        console.error("Error adding new skill:", error);
    }
}

export async function deleteProject(projectId) {
    try {
        // Reference the document in the Skills collection
        const projectDocRef = doc(db, "Projects", projectId);

        // Delete the document
        await deleteDoc(projectDocRef);

        console.log(`Skill with id ${projectId} has been successfully deleted.`);
    } catch (error) {
        console.error("Error deleting skill:", error);
    }
}

export async function createAward(award) {
    try {
        // Add a new document to the Skills collection
        const docRef = await addDoc(collection(db, "Awards"), award);
        console.log("New skill added with ID:", docRef.id);
        return docRef.id; // Return the new skill's ID
    } catch (error) {
        console.error("Error adding new skill:", error);
    }
}

export async function deleteAward(awardId) {
    try {
        // Reference the document in the Skills collection
        const docRef = doc(db, "Awards", awardId);

        // Delete the document
        await deleteDoc(docRef);

        console.log(`Skill with id ${awardId} has been successfully deleted.`);
    } catch (error) {
        console.error("Error deleting skill:", error);
    }
}