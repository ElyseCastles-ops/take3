import firestore from "firebase/firestore";
class Card {
    name: string;
    id: string;
    quantity: number;
    foil: number;
    commander: boolean;

    constructor(name: string, quantity: number, foil: number, commander: boolean, id?: string,) {
        this.name = name;
        this.id = id || "";
        this.quantity = quantity;
        this.foil = foil;
        this.commander = commander;
    }
}

export const cardConverter = {
    toFirestore(card: Card):  firestore.DocumentData {
        return {name: card.name, id: card.id, quantity: card.quantity, foil: card.foil, commander: card.commander}
    },
    fromFirestore(
        snapshot: firestore.QueryDocumentSnapshot,
        options: firestore.SnapshotOptions
    ): Card {
        const data = snapshot.data(options)!;;
        return new Card(data.name, data.quantity, data.foil, data.commander, data.id)
    }
}

export default Card;