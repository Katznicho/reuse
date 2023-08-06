import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser, registerUser, setAppIntro, updateUserProfile } from '../redux/store/slices/UserSlice';

const USER_COLLECTION = "users";

export const useFirebase = () => {
    const dispatch = useDispatch<any>();

     // Function to get the current logged-in user
     const getCurrentUser = () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = auth().onAuthStateChanged(async (user) => {
                if (!user) {
                    unsubscribe();
                    resolve(null);
                }
                else{
                    let userUid= user.uid;
                    const userDoc = await firestore().collection(USER_COLLECTION).doc(userUid).get();
                    if (userDoc.exists) {
                        const user = userDoc.data();
                        dispatch(setAppIntro());
                        dispatch(loginUser({
                            UID: userUid,
                            fname:user?.firstName,
                            lname: user?.lastName,
                            email: user?.email,
                            username: user?.username,
                        }))

                    }
                    unsubscribe();
                    resolve(user);
                }

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
             

              dispatch(registerUser({
                  UID: userUid,
                  fname:firstName,
                  lname: lastName,
                  email: email,
                  username: username,
              }))


              return userCredentials.user;

        } catch (error) {
            return null;
        }
    }

    const login = async (email: string, password: string) => {
        try {
            let userCredentails =  await auth().signInWithEmailAndPassword(email, password);
            const userUid = userCredentails.user.uid;
            const userDoc = await firestore().collection(USER_COLLECTION).doc(userUid).get();
            if (userDoc.exists) {
                const user = userDoc.data();
                dispatch(setAppIntro());
                dispatch(loginUser({
                    UID: userUid,
                    fname:user?.firstName,
                    lname: user?.lastName,
                    email: user?.email,
                    username: user?.username,
                }))

            }
            return userCredentails.user;

        } catch (error) {
            // console.log(error);
            return null;
        }
    }

     const logout = async()=>{
         try {
             await auth().signOut();
             dispatch(logoutUser());
         } catch (error) {

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

    const updateUserProfilePreferences = async (userId: string, reuser: string, gender:string, preferences: string[]):Promise<boolean | null> => {
        try {
            await firestore().collection(USER_COLLECTION).doc(userId).update({
                gender: gender,
                reuser: reuser,
                preferences: preferences,
            });
             dispatch(updateUserProfile({
                gender, 
                preferences,
                reuser
             }))

             return true;


        } catch (error) {
            // console.log("Error updating user credentials:", error);
            return null;
        }
    };

    // Add more auth functions if needed (e.g., logout, update profile, etc.)

    return {
        register,
        login,
        forgotPassword,
        getUserDetails,
        getCurrentUser,
        updateUserProfilePreferences,
        logout

        // Export other auth functions here if needed
    };
}
