import firebase from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/auth';

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

// export const

export const nativeSignup = (name, email, password) => {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
            const ref = usersDb.doc(email);
            ref.set({
                name,
                email,
                cards: [],
                uploadedImages: [],
            }).then(() => {
                console.log('成功註冊!!!');
            });
        })
        .catch((err) => {
            if (err.code === 'auth/email-already-in-use') {
                console.log('此帳號已註冊');
            } else {
                console.log('密碼需要大於6個字元');
            }
        });
};

export const nativeLogin = (email, password) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            window.history.go(0);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const nativeLogout = () => {
    firebase
        .auth()
        .signOut()
        .then(
            () => {
                console.log('logout successfully');
            },
            (err) => {
                console.log('logout fail', err);
            }
        );
};

// canvas part
