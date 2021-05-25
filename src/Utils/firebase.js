import firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const usersDb = db.collection('users');

// const storage = firebase.storage();
// console.log('check', storage);
// const storageRef = storage.ref();

export const uploadImageToStorage = (fileList) => {
    const imgId = uuidv4();
    const storageRef = firebase.storage().ref();
    const ImgRef = storageRef.child(`uploadedImgs/${imgId}`);
    const task = ImgRef.put(fileList[0]);
    // task.then((snapshot) => {
    //     console.log('Uploaded a file');
    // });
    task.on(
        'state_changed',
        (snapshot) => {
            console.log('Uploaded a file');
        },
        (err) => {},
        () => {
            ImgRef.getDownloadURL().then((url) => {
                const ref = usersDb.doc('Fn5WOPtQ9DRYLSrCflzn');
                ref.update({
                    uploaded: firebase.firestore.FieldValue.arrayUnion({
                        src: url,
                        path: `uploadedImgs/${imgId}`,
                    }),
                }).then(() => {});
            });
        }
    );
};

export const showData = () => {
    const ref = usersDb.doc('Fn5WOPtQ9DRYLSrCflzn');
    console.log(ref);
};

export const showUploadedImages = (setUploadedImages) => {
    const ref = usersDb.doc('Fn5WOPtQ9DRYLSrCflzn');
    ref.get()
        .then((doc) => {
            if (doc.exists) {
                // console.log('This', doc.data());
                // console.log('This', doc.data().uploaded);
                setUploadedImages(doc.data().uploaded);
            } else {
                console.log('No such document');
            }
        })
        .catch((err) => {
            console.log('This error', err);
        });
};
