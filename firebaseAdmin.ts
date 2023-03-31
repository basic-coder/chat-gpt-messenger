const admin = require('firebase-admin');
const {getApps} = require('firebase-admin/app');

const serviceAccountKey = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
)


if(!getApps().length){
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey)
    })
}

const adminDb = admin.firestore();
export {adminDb};