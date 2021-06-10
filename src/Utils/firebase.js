import firebase from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/auth';
import { fabric } from 'fabric';
// import * as admin from 'firebase-admin';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const usersDb = db.collection('users');
const cardsDb = db.collection('cards');

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
// export const createNewCard = (cardDetails, userId) => {
//     const ref = cardsDb.doc(cardDetails.id);
//     ref.set({
//         data: JSON.stringify({
//             version: '4.4.0',
//             objects: [],
//             background: '#fff',
//         }),
//         author: userId,
//         basicSetting: cardDetails,
//         uploaded: [],
//         isSample: false,
//     }).then(() => {
//         const userRef = usersDb.doc(userId);
//         userRef.update({
//             cards: firebase.firestore.FieldValue.arrayUnion(cardDetails.id),
//         });
//         document.location.href = `/edit/${cardDetails.id}`;
//     });
// };

export const createNewCard = (cardDetails, userId) => {
    const ref = cardsDb.doc(cardDetails.id);
    ref.set({
        coverData: JSON.stringify({
            version: '4.4.0',
            objects: [],
            background: '#fff',
        }),
        leftInnerData: JSON.stringify({
            version: '4.4.0',
            objects: [],
            background: '#fff',
        }),
        rightInnerData: JSON.stringify({
            version: '4.4.0',
            objects: [],
            background: '#fff',
        }),
        author: userId,
        basicSetting: cardDetails,
        uploaded: [],
        isSample: false,
    }).then(() => {
        const userRef = usersDb.doc(userId);
        userRef.update({
            cards: firebase.firestore.FieldValue.arrayUnion(cardDetails.id),
        });
        document.location.href = `/edit/${cardDetails.id}`;
    });
};

export const navToEditCard = (cardId) => {
    const ref = cardsDb.doc(cardId);
    ref.get().then(() => {
        document.location.href = `/edit/${cardId}`;
    });
};

export const navToPreviewCard = (cardId) => {
    const ref = cardsDb.doc(cardId);
    ref.get().then(() => {
        document.location.href = `/show/${cardId}`;
    });
};

export const navToSendCard = (userId) => {
    const ref = cardsDb.doc(userId);
    ref.get().then(() => {
        document.location.href = `/send/${userId}`;
    });
};

export const navToMainPage = (userId) => {
    const ref = cardsDb.doc(userId);
    ref.get().then(() => {
        document.location.href = `/main/${userId}`;
    });
};

// export const updateSavedCardData = (canvas, cardId, dataUrl) => {
//     const canvasData = JSON.stringify(canvas);
//     const cardRef = cardsDb.doc(cardId);
//     cardRef
//         .update({
//             data: canvasData,
//             snapshot: dataUrl,
//         })
//         .then(() => {});
// };

// export const saveDataUrl = (canvas, cardId) => {
//     // let exportCard;
//     // if (JSON.stringify(canvas === '{}')) {
//     //     exportCard = document.getElementById('c');
//     // } else {
//     //     exportCard = canvas;
//     // }
//     const dataUrl = canvas.toDataURL('image/png', 1);
//     // console.log(dataUrl);
//     updateSavedCardData(canvas, cardId, dataUrl);
// };

export const updateSavedCardData = (
    cover,
    leftInner,
    rightInner,
    cardId,
    coverUrl,
    leftInnerUrl,
    rightInnerUrl
) => {
    const coverData = JSON.stringify(cover);
    const leftInnerData = JSON.stringify(leftInner);
    const rightInnerData = JSON.stringify(rightInner);
    const cardRef = cardsDb.doc(cardId);
    cardRef
        .update({
            coverData: coverData,
            leftInnerData: leftInnerData,
            rightInnerData: rightInnerData,
            snapshot: coverUrl,
            leftInnerSnapshot: leftInnerUrl,
            rightInnerSnapshot: rightInnerUrl,
        })
        .then(() => {});
};

export const saveDataUrl = (cover, leftInner, rightInner, cardId) => {
    const coverUrl = cover.toDataURL('image/png', 1);
    const leftInnerUrl = leftInner.toDataURL('image/png', 1);
    const rightInnerUrl = rightInner.toDataURL('image/png', 1);
    updateSavedCardData(
        cover,
        leftInner,
        rightInner,
        cardId,
        coverUrl,
        leftInnerUrl,
        rightInnerUrl
    );
};

// export const loadCanvas = (cardId, callback) => {
//     const cardRef = cardsDb.doc(cardId);
//     cardRef.get().then((doc) => {
//         const dataFromFirebase = doc.data();
//         const cardDataInit = JSON.parse(dataFromFirebase.data);
//         const snapshotInit = dataFromFirebase.snapshot
//             ? dataFromFirebase.snapshot
//             : null;
//         callback(cardDataInit, snapshotInit);
//     });
// };

export const loadCanvas = (cardId, callback) => {
    const cardRef = cardsDb.doc(cardId);
    cardRef.get().then((doc) => {
        const dataFromFirebase = doc.data();
        const coverDataInit = JSON.parse(dataFromFirebase.coverData);
        const leftInnerDataInit = JSON.parse(dataFromFirebase.leftInnerData);
        const rightInnerDataInit = JSON.parse(dataFromFirebase.rightInnerData);
        const snapshotInit = dataFromFirebase.snapshot
            ? dataFromFirebase.snapshot
            : null;
        callback(
            coverDataInit,
            leftInnerDataInit,
            rightInnerDataInit,
            snapshotInit
        );
    });
};

// explore part
export const mapDataForExplore = (userId) => {
    return cardsDb.get().then((snapshot) => {
        const cards = [];
        snapshot.forEach((doc) => {
            if (doc.data().author === userId) {
                cards.push(doc.data());
            }
        });
        return Promise.all(cards);
    });
};

export const mapExampleDataForExplore = () => {
    return cardsDb.get().then((snapshot) => {
        const cards = [];
        snapshot.forEach((doc) => {
            if (doc.data().isSample) {
                cards.push(doc.data());
            }
        });
        return Promise.all(cards);
    });
};
// export const mapDataForExplore = (arr, callback) => {
//     return cardsDb.get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             if (doc.data().snapshot) {
//                 // callback([...arr, doc.data().snapshot]);
//                 console.log(doc.data());
//             }
//         });
//     });
// };

// export const mapDataForExplore = (currentUserId, cards, allUsers) => {
//     const cardsArr = [];
//     cards.forEach((card) => {

//     })
// }

// get personal profile
export const getDataForProfile = (userId, setProfileName, setProfileEmail) => {
    const userRef = usersDb.doc(userId);
    userRef.get().then((doc) => {
        setProfileName(doc.data().name);
        setProfileEmail(doc.data().email);
    });
};

// send email
export const sendMail = (url, email, name, author) => {
    firebase
        .firestore()
        .collection('mail')
        .add({
            to: email,
            message: {
                subject: `${name}您好，您有一張來自${author}卡片!`,
                text: 'This is the plaintext section of the email body.',
                html: `
                <h1>恭喜獲得卡片一張</h1>
                <p>點擊以下連結檢視</p>
                <a href=${url}>${url}</a>`,
            },
        })
        .then(() => {
            console.log('Email has been sent!!!');
        });
};

export const mapDataForOptions = (userId) => {
    return cardsDb.get().then((snapshot) => {
        const options = [];
        snapshot.forEach((doc) => {
            if (doc.data().author === userId) {
                options.push(doc.data());
            }
        });
        return Promise.all(options);
    });
};

// show page func
export const getAllSnapshots = (
    cardId,
    setCoverSnapshot,
    setLeftInnerSnapshot,
    setRightInnerSnapshot
) => {
    const cardRef = cardsDb.doc(cardId);
    cardRef.get().then((doc) => {
        setCoverSnapshot(doc.data().snapshot);
        setLeftInnerSnapshot(doc.data().leftInnerSnapshot);
        setRightInnerSnapshot(doc.data().rightInnerSnapshot);
    });
};
