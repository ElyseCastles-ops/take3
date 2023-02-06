import firestore from "firebase/firestore";
class Box {
    name: string;
    starred: boolean;
    id: string;
    type: string;
    colors: Array<boolean>;
    fill: number;
    capacity: number;
    category: string;

    constructor(name: string, starred: boolean, type: string, colors: Array<boolean>, fill: number, capacity: number, id?: string, category?: string) {
        this.name = name;
        this.starred = starred;
        this.id = id || "";
        this.type = type;
        this.colors = colors;
        this.fill = fill;
        this.capacity = capacity;
        if (category) {
            this.category = category;
        }
        this.category = starred ? "STARRED" : ""
    }
}

export const boxConverter = {
    toFirestore(box: Box):  firestore.DocumentData {
        return {name: box.name, starred: box.starred, type: box.type, colors: box.colors, fill: box.fill, capacity: box.capacity, category: box.category}
    },
    fromFirestore(
        snapshot: firestore.QueryDocumentSnapshot,
        options: firestore.SnapshotOptions
    ): Box {
        const data = snapshot.data(options)!;;
        return new Box(data.name, data.starred, data.type, data.colors, data.fill, data.capacity, data.id, data.category)
    }
}

export const boxTypes = [
    {
        name: "Storage Box",
        key: "storage",
        capacity: 255
    },
    {
        name: "Standard Deck",
        key: "standard",
        capacity: 60
    },
    {
        name: "Commander Deck",
        key: "commander",
        capacity: 100
    },

]

export const categories = [
    "STARRED",
    "ALL"
]

export default Box;