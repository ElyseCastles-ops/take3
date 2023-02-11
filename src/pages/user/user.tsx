import firestore from "firebase/firestore";
class User {
    email: string;
    uid: string;
    boxLimit: Number;

    constructor(email: string, uid: string, boxLimit: Number) {
        this.email = email;
        this.uid = uid;
        this.boxLimit = boxLimit;
    }
}

export const userConverter = {
    toFirestore(user: User):  firestore.DocumentData {
        return {email: user.email, uid: user.uid, boxLimit: user.boxLimit}
    },
    fromFirestore(
        snapshot: firestore.QueryDocumentSnapshot,
        options: firestore.SnapshotOptions
    ): User {
        const data = snapshot.data(options)!;;
        return new User(data.email, data.uid, data.boxLimit)
    }
}

export default User;