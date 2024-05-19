import { fontawsomeScript } from "./components/default.mjs";
import { createHeader } from "./components/header.mjs";
import { loggedInEvents } from "./components/loginState.mjs";



function userDataLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
        try {
            // Parse the JSON string back to an object
            const userData = JSON.parse(userDataString);
            console.log('Logged in user data',userData);
            return userData;
        } catch (error) {
            console.error('Failed to parse userData from local storage:', error);
            return null;
        }
    }
    return null;
}

userDataLocalStorage()

