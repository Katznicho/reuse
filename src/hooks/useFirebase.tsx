import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser, registerUser, setAppIntro, updateAppIntro, updateIsLoggedIn, updateUserProfile } from '../redux/store/slices/UserSlice';
import { APP_USERS, PRODUCT_COLLECTION } from '../utils/constants/constants';

const USER_COLLECTION = "users";
const CATEGORY_COLLECTION = "categories";

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
        else {
          let userUid = user.uid;
          const userDoc = await firestore().collection(USER_COLLECTION).doc(userUid).get();
          if (userDoc.exists) {
            const user = userDoc.data();
            dispatch(setAppIntro());
            dispatch(loginUser({
              UID: userUid,
              fname: user?.firstName,
              lname: user?.lastName,
              email: user?.email,
              username: user?.username,
              community: user?.community,
              isVerified: false,
              phone: '',
              displayPicture: '',
              reuseType: ''
            }))

          }
          unsubscribe();
          resolve(user);
        }

      });
    });
  };


  const register = async (email: string, password: string, username: string, firstName: string, lastName: string, userType: String, communityName: string) => {
    try {
      const userCredentials = await auth().createUserWithEmailAndPassword(email, password);
      const userUid = userCredentials.user.uid;

      // Store additional user details in the "users" collection
      if (userType == APP_USERS.RECEIVER) {
        await firestore().collection(USER_COLLECTION).doc(userUid).set({
          email: email,
          username: username,
          userType: userType,
          communityName: communityName,
          firstName: "",
          lastName: "",
        });
        dispatch(registerUser({
          UID: userUid,
          fname: "",
          lname: "",
          email: email,
          username: username,
          community: communityName,
          isVerified: false,
          phone: '',
          displayPicture: '',
          reuseType: ''
        }))
      }
      else {
        await firestore().collection(USER_COLLECTION).doc(userUid).set({
          email: email,
          username: username,
          userType: userType,
          firstName: firstName,
          lastName: lastName,
          community: "",
        });
      }

      dispatch(updateIsLoggedIn(true));
      dispatch(updateAppIntro(false));


      return userCredentials.user;

    } catch (error) {
      return error;
    }
  }

  const login = async (email: string, password: string) => {
    try {
      let userCredentails = await auth().signInWithEmailAndPassword(email, password);
      const userUid = userCredentails.user.uid;
      const userDoc = await firestore().collection(USER_COLLECTION).doc(userUid).get();
      if (userDoc.exists) {
        const user = userDoc.data();
        dispatch(setAppIntro());
        dispatch(loginUser({
          UID: userUid,
          fname: user?.firstName,
          lname: user?.lastName,
          email: user?.email,
          username: user?.username,
          community: user?.community,
          isVerified: false,
          phone: '',
          displayPicture: '',
          reuseType: ''
        }))
        dispatch(updateIsLoggedIn(true));

      }
      return { user: userCredentails.user };

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  const logout = async () => {
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

      return error;
    }
  }

  const updateUserLocation = async (userId: string, latitude: string, longitude: string) => {
    try {
      await firestore().collection(USER_COLLECTION).doc(userId).update({
        latitude: latitude,
        longitude: longitude,
      });
    } catch (error) {

      return error;
    }
  }

  const updateUserDeviceId = async (userId: string, deviceId: string) => {
    try {
      await firestore().collection(USER_COLLECTION).doc(userId).update({
        deviceId: deviceId,
      });
    } catch (error) {
      throw error;
    }
  };

  const getUserDeviceId = async (userId: string) => {
    try {
      const userDoc = await firestore().collection(USER_COLLECTION).doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        const deviceId = userData?.deviceId; // Replace 'deviceId' with the actual field name
        return deviceId;
      } else {
        console.error('User document not found.');
        return null;
      }
    } catch (error) {
      console.error('Error getting user device ID:', error);
      throw error;
    }
  };




  const updateUserProfilePreferences = async (userId: string, reuser: string, gender: string, preferences: string[]): Promise<boolean | null> => {
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

      return null;
    }
  };

  const createDonationProduct = async (userId: string, product: any) => {
    try {
      await firestore().collection(PRODUCT_COLLECTION).add({
        ...product,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        rating: 4,
        userId: userId
      });
    } catch (error) {
      console.log("Error updating user credentials:", error);
      return error;
    }
  };

  const getAllProducts = async () => {
    try {
      const querySnapshot = await firestore().collection(PRODUCT_COLLECTION).get();
      const products: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each product document
        const productData = documentSnapshot.data();
        // Include the document ID as part of the product data
        products.push({ id: documentSnapshot.id, ...productData });
      });


      return products;
    } catch (error) {
      throw error;
    }
  };

  const getAllCategories = async () => {
    try {
      const querySnapshot = await firestore().collection(CATEGORY_COLLECTION).get();
      const categories: any = [];
      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each product document
        const data = documentSnapshot.data();
        // Include the document ID as part of the product data
        categories.push({ id: documentSnapshot.id, ...data });
      });
      return categories;

    } catch (error) {
      throw error;

    }



  }


  const getAllUsers = async () => {
    try {
      const querySnapshot = await firestore().collection(USER_COLLECTION).get();
      const users: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each product document
        const userData = documentSnapshot.data();
        // Include the document ID as part of the product data
        users.push({ id: documentSnapshot.id, ...userData });
      });

      return users;
    } catch (error) {
      throw error;
    }
  };

  const getAllDonors = async (userType = APP_USERS.DONOR) => {
    try {
      const querySnapshot = await firestore()
        .collection(USER_COLLECTION)
        .where('userType', '==', userType) // Replace 'userType' with the actual field name for user type
        .get();

      const donors: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each user document
        const userData = documentSnapshot.data();
        // Include the document ID as part of the user data
        donors.push({ id: documentSnapshot.id, ...userData });
      });

      return donors;
    } catch (error) {
      console.error('Error getting donors:', error);
      throw error;
    }
  };

  const getUserByUid = async (uid: any): Promise<any> => {
    try {
      const userDoc = await firestore()
        .collection(USER_COLLECTION)
        .doc(uid)
        .get();

      if (userDoc.exists) {
        // User document found, return its data
        return { id: userDoc.id, ...userDoc.data() };
      } else {
        // User document not found
        return null;
      }
    } catch (error) {
      throw error;
    }
  };



  const getProductsByUserId = async (userId: string) => {
    try {
      const querySnapshot = await firestore()
        .collection(PRODUCT_COLLECTION)
        .where('userId', '==', userId) // Replace 'userId' with the actual field name
        .get();

      const products: any = [];

      querySnapshot.forEach((documentSnapshot) => {
        // Get the data of each product document
        const productData = documentSnapshot.data();
        // Include the document ID as part of the product data
        products.push({ id: documentSnapshot.id, ...productData });
      });

      return products;
    } catch (error) {
      console.error('Error getting products by user ID:', error);
      throw error;
    }
  };



  return {
    register,
    login,
    forgotPassword,
    getUserDetails,
    getCurrentUser,
    updateUserProfilePreferences,
    logout,
    updateUserLocation,
    createDonationProduct,
    getAllProducts,
    getProductsByUserId,
    getAllUsers,
    getUserByUid,
    getAllDonors,
    getAllCategories,
    getUserDeviceId,
    updateUserDeviceId

    // Export other auth functions here if needed
  };
}
