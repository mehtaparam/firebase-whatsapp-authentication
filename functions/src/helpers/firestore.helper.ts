import * as firebaseAdmin from 'firebase-admin';

export const getNewFireStoreID = (collectionPath: string) => {
    return firebaseAdmin.firestore().collection(collectionPath).doc().id;
}

export const getServerTimestamp = () => {
    return firebaseAdmin.firestore.FieldValue.serverTimestamp();
}

export default {
    getNewFireStoreID
};

