import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';

const USER_COLLECTION = "users";

export const useFirebase = () => {
    const dispatch = useDispatch<any>();

     // Function to get the current logged-in user
     const getCurrentUser = () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = auth().onAuthStateChanged((user) => {
                unsubscribe();
                resolve(user);
            });
        });
    };


    const register = async (email: string, password: string, username: string, firstName: string, lastName: string) => {
        try {
            const userCredentials = await auth().createUserWithEmailAndPassword(email, password);
            const userUid = userCredentials.user.uid;

            // Store additional user details in the "users" collection
            await firestore().collection(USER_COLLECTION).doc(userUid).set({
                email: email,
                username: username,
                firstName: firstName,
                lastName: lastName,
            });

             dispatch()

            // You can dispatch an action here to handle the user state in Redux if needed
            // For example:
            // dispatch({ type: 'USER_REGISTER_SUCCESS', user: { email, username, firstName, lastName } });

        } catch (error) {
            console.log(error);
        }
    }

    const login = async (email: string, password: string) => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
            // Handle successful login (e.g., dispatch an action to update Redux state)
            // For example:
            // dispatch({ type: 'USER_LOGIN_SUCCESS', user: { email } });

        } catch (error) {
            console.log(error);
        }
    }

    const forgotPassword = async (email: string) => {
        try {
            await auth().sendPasswordResetEmail(email);
            // Handle successful password reset request
            // For example:
            // dispatch({ type: 'FORGOT_PASSWORD_SUCCESS' });

        } catch (error) {
            console.log(error);
        }
    }

    const getUserDetails = async (userId: string) => {
        try {
            const userDoc = await firestore().collection(USER_COLLECTION).doc(userId).get();
            if (userDoc.exists) {
                return userDoc.data();
            } else {
                console.log("User not found.");
                return null;
            }

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const updateUserCredentials = async (userId: string, reuser: string, gender:string, preferences: string[]) => {
        try {
            await firestore().collection(USER_COLLECTION).doc(userId).update({
                gender: gender,
                reuser: reuser,
                preferences: preferences,
            });

            // You can dispatch an action here to update Redux state or handle the updated user data
            // For example:
            // dispatch({ type: 'UPDATE_USER_SUCCESS', user: { gender, age, preferences } });

        } catch (error) {
            console.log("Error updating user credentials:", error);
        }
    };

    // Add more auth functions if needed (e.g., logout, update profile, etc.)

    return {
        register,
        login,
        forgotPassword,
        getUserDetails,
        getCurrentUser,
        updateUserCredentials
        // Export other auth functions here if needed
    };
}
