import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, 
    setDoc, 
    getFirestore, 
    getDocs, 
    query, 
    where, 
    DocumentData, 
    DocumentReference, 
    doc, 
    updateDoc, 
    addDoc, 
    writeBatch, 
    Firestore, 
    getDoc, 
    deleteDoc, 
    collectionGroup } from "firebase/firestore";
import { boxConverter } from "../pages/boxes/box";
import { cardConverter } from "../pages/cards/card";
//import { loadAllBoxes } from "../pages/boxes/boxActions";


export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState()
    const [pending, setPending] = useState(true)

    useEffect(() => {
        const currentUser = auth.onAuthStateChanged((authUser) => {
            setUser(authUser)
            setPending(false)
        })

        //return currentUser;
    }, [])


    //SIGNUP
    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //LOGIN
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signup = async(email, password, dispatch, boxLimit) => {
        //TODO: Add box limit and current quantity
        let userCredentials = null;
        try { 
          userCredentials = await createUserWithEmailAndPassword(auth, email, password);
          console.info("USER CREDETIALS", userCredentials.user);
          await setDoc(doc(db, "users", `${userCredentials.user.uid}`), {
            uid: userCredentials.user.uid,
            email: email,
            password: password,
            boxLimit: boxLimit
          });
        }
        catch(error) {
          console.error(error)
        }
      
      }

    //LOGOUT
    const logout = () => {
        return signOut(auth)
    }

    //FORGOT PASSWORD
    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    //ADD CARDS.... etc

    //ADD OR UPDATE BATCH OF CARDS
    const addOrUpdateCards = async (newCards, updateCards, box) => {
        const boxDocRef = doc(db, "users", `${user?.uid}`, "boxes",`${box.id}`).withConverter(boxConverter)
        const batch = writeBatch(db);
        newCards.map((card) => {
            var docRef = doc(collection(boxDocRef, "cards")).withConverter(cardConverter);
            card.id = docRef.id
            batch.set(docRef, card)
        })
        updateCards.map((card) => {
            var docRef = doc(collection(boxDocRef, "cards"), `${card.id}`).withConverter(cardConverter);
            batch.update(docRef, {"foil": card.foil, "quantity": card.quantity})
        })
        await batch.commit()
    }

    //SEARCH FOR CARD - DOES NOT WORK 
    const searchCard = async (term) => {
        const boxes = query(collectionGroup(db, "cards",), where('user', '==', user.uid)).withConverter(boxConverter);
        const querySnapshot = await getDocs(boxes);
        let boxList = []
        debugger
        querySnapshot.forEach(doc => {
            boxList.push(doc.data())
            console.log("BOX DATA", doc.data())
        });
        
        return boxList;

        //dispatch(loadAllBoxes(boxList))
    }


    //GET ALL BOXES
    const getBoxes = async () => {
        
        const docRef = doc(db, "users", `${user?.uid}`);

        const q = query(collection(db, `users/${user?.uid}/boxes`)).withConverter(boxConverter);
        const querySnapshot = await getDocs(q);

        let boxes = await querySnapshot.docs;
        let boxList = [];

        boxes.forEach(doc => {
            boxList.push(doc.data());
        });
        return boxList;
    }

    //GET SINGLE BOX
    const getBox = async (boxId) => {
        const docRef = doc(db, `users/${user?.uid}/boxes`, `${boxId}`).withConverter(boxConverter);
        const docSnap = await getDoc(docRef);
      
        if (docSnap.exists()) {
          const box = docSnap.data();
          return box;
          //dispatch(updateSelectedBox(box))
        }
      }

    //CREATE NEW STORAGE OR STANDARD BOX
    const createNewBox = async (box) => {
        const ref = collection(db, "users", `${user?.uid}`, "boxes").withConverter(boxConverter);
        const boxDocRef = await addDoc(ref, box);
        const timestamp = await updateDoc(boxDocRef, {id: boxDocRef.id});
        return timestamp;
        //getBoxes(dispatch)
    }

    //CREATE NEW COMMANDER BOX
    const createNewCommanderBox = async (box, commander) => {
        const ref = collection(db, "users", `${user?.uid}`, "boxes").withConverter(boxConverter)
        const boxDocRef = await addDoc(ref, box);
        const timestamp =  updateDoc(boxDocRef, {id: boxDocRef.id})
        const updatedBox = box;
        updatedBox.id = boxDocRef.id;
        addOrUpdateCards([commander], [], updatedBox);
        //getBoxes(dispatch);
    }

    //UPDATE BOX VALUE
    const updateBox = async (box, updateVals) => {
        const boxRef = doc(db,`users/${user?.uid}/boxes`,box.id);
        //console.log("BOX REF", boxRef)
        await updateDoc(boxRef, updateVals)
    }

    //DELETE BOX
    const deleteBox = async (box)=> {
        console.log("DELETE BOX", box.id)
        await deleteDoc(doc(db,`users/${user?.uid}/boxes`,box.id));
        //getBoxes(dispatch)
    }

    //GET ALL CARDS
    const getCards = async (boxId) => {
        const q = query(collection(db, `users/${user?.uid}/boxes/${boxId}/cards`)).withConverter(cardConverter);
        const querySnapshot = await getDocs(q);

        let cards = await querySnapshot.docs;
        let cardList = []

        cards.forEach(doc => {
            cardList.push(doc.data())
        });
        return cardList
        //dispatch(loadCards(cardList))
    }

    const deleteCard = async(card, box) => {
        console.log("DELETE CARD", card.id)
        const res = await deleteDoc(doc(db,`users/${user?.uid}/boxes/${box.id}/cards`,card.id));
        return res;
        //getCards(box.id, dispatch)
    }

    const updateSingleCard = async(card, box, updateVals) => {
        //TODO: complete this method - updates fine
        const cardRef = doc(db,`users/${user?.uid}/boxes/${box.id}/cards`,card.id)
        await updateDoc(cardRef, updateVals)
    }


    if(pending) {
        return <>Loading...</>
    }

    return (
        <AuthContext.Provider value={{
            user, 
            register, 
            login,
            signup, 
            logout, 
            forgotPassword, 
            getBoxes, 
            getCards,
            createNewBox,
            createNewCommanderBox,
            deleteBox,
            updateBox,
            searchCard,
            getBox,
            deleteCard,
            updateSingleCard,
            addOrUpdateCards
            }}>
            {children}
        </AuthContext.Provider>
    )
}