import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { firebaseConfig } from './firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import 'firebase/auth';
// import * as admin from 'firebase-admin';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const usersDb = db.collection('users');
const cardsDb = db.collection('cards');

// const storage = firebase.storage();
// console.log('check', storage);
// const storageRef = storage.ref();

export const uploadImageToStorage = (fileList, userId, callback) => {
    const imgId = uuidv4();
    const storageRef = firebase.storage().ref();
    const ImgRef = storageRef.child(`uploadedImgs/${imgId}`);
    const task = ImgRef.put(fileList[0]);
    task.on(
        'state_changed',
        (snapshot) => {},
        (err) => {},
        () => {
            ImgRef.getDownloadURL().then((url) => {
                const ref = usersDb.doc(userId);
                ref.update({
                    uploadedImages: firebase.firestore.FieldValue.arrayUnion({
                        src: url,
                        path: `uploadedImgs/${imgId}`,
                        id: imgId,
                    }),
                }).then(() => {
                    window.alert('照片上傳成功');
                    callback();
                });
            });
        }
    );
};

export const showUploadedImages = (setUploadedImages, userId) => {
    const ref = usersDb.doc(userId);
    ref.get()
        .then((doc) => {
            if (doc.exists) {
                setUploadedImages(doc.data().uploadedImages);
            } else {
                console.log('No such document');
            }
        })
        .catch((err) => {
            console.log('This error', err);
        });
};

export const deleteUploadedImage = (imgId, userId, callback) => {
    const ref = firebase.storage().ref().child(`uploadedImgs/${imgId}`);
    ref.delete().then(() => {
        const userRef = usersDb.doc(userId);
        userRef
            .get()
            .then((doc) => {
                const UploadedImagesArr = doc
                    .data()
                    .uploadedImages.filter((image) => image.id !== imgId);
                userRef
                    .update({
                        uploadedImages: UploadedImagesArr,
                    })
                    .then(() => {
                        window.alert('成功刪除該照片');
                        callback();
                    });
            })
            .catch((err) => {
                console.log('刪除失敗', err);
            });
    });
};
// export const showUploadedImages = (setUploadedImages, userId) => {
//     const ref = usersDb.doc(userId);
//     ref.get()
//         .then((doc) => {
//             if (doc.exists) {
//                 setUploadedImages(doc.data().uploadedImages);
//             } else {
//                 console.log('No such document');
//             }
//         })
//         .catch((err) => {
//             console.log('This error', err);
//         });
// };

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
                window.history.go(0);
            });
        })
        .catch((err) => {
            if (err.code === 'auth/email-already-in-use') {
                window.alert('此帳號已註冊');
            } else {
                window.alert('密碼需要大於6個字元');
            }
        });
};

export const nativeLogin = (email, password, successCallback, failCallback) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            // window.history.go(0);
            successCallback();
        })
        .catch((err) => {
            failCallback();
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

export const saveAsTemplate = (cardId) => {
    const cardRef = cardsDb.doc(cardId);
    cardRef.update({ isSample: true }).then(() => {
        window.alert('已成功設為範本');
    });
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
        cardName: '未命名卡片',
        default:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAJYCAYAAABM7LCIAAAgAElEQVR4Xu3dBXSr2XnvYaWUMjOmmDIzQ8qcctpVZmZmZmbmNm1TbsrMnDIzMzPkrp9ud6/ia1vSa9nnzJlHa501M2e8bfnRq/3f9H26x4Mf/OAHbzwIECBAgMCRAvcQIEeK+XICBAgQ2AoIEIVAgAABAiMBATJi04gAAQIEBIgaIECAAIGRgAAZsWlEgAABAgJEDRAgQIDASECAjNg0IkCAAAEBogYIECBAYCQgQEZsGhEgQICAAFEDBAgQIDASECAjNo0IECBAQICoAQIECBAYCQiQEZtGBAgQICBA1AABAgQIjAQEyIhNIwIECBAQIGqAAAECBEYCAmTEphEBAgQICBA1QIAAAQIjAQEyYtOIAAECBASIGiBAgACBkYAAGbFpRIAAAQICRA0QIECAwEhAgIzYNCJAgAABAaIGCBAgQGAkIEBGbBoRIECAgABRAwQIECAwEhAgIzaNCBAgQECAqAECBAgQGAkIkBGbRgQIECAgQNQAAQIECIwEBMiITSMCBAgQECBqgAABAgRGAgJkxKYRAQIECAgQNUCAAAECIwEBMmLTiAABAgQEiBogQIAAgZGAABmxaUSAAAECAkQNECBAgMBIQICM2DQiQIAAAQGiBggQIEBgJCBARmwaESBAgIAAUQMECBAgMBIQICM2jQgQIEBAgKgBAgQIEBgJCJARm0YECBAgIEDUAAECBAiMBATIiE0jAgQIEBAgaoAAAQIERgICZMSmEQECBAgIEDVAgAABAiMBATJi04gAAQIEBIgaIECAAIGRgAAZsWlEgAABAgJEDRAgQIDASECAjNg0IkCAAAEBogYIECBAYCQgQEZsGhEgQICAAFEDBAgQIDASECAjNo0IECBAQICoAQIECBAYCQiQEZtGBAgQICBA1AABAgQIjAQEyIhNIwIECBAQIGqAAAECBEYCAmTEphEBAgQICBA1QIAAAQIjAQEyYtOIAAECBASIGiBAgACBkYAAGbFpRIAAAQICRA0QIECAwEhAgIzYNCJAgAABAaIGCBAgQGAkIEBGbBoRIECAgABRAwQIECAwEhAgIzaNCBAgQECAqAECBAgQGAkIkBGbRgQIECAgQNQAAQIECIwEBMiITSMCBAgQECBqgAABAgRGAgJkxKYRAQIECAgQNUCAAAECIwEBMmLTiAABAgQEiBogQIAAgZGAABmxaUSAAAECAkQNECBAgMBIQICM2DQiQIAAAQGiBggQIEBgJCBARmwaESBAgIAAUQMECBAgMBIQICM2jQgQIEBAgKgBAgQIEBgJCJARm0YECBAgIEDUAAECBAiMBATIiE0jAgQIEBAgaoAAAQIERgICZMSmEQECBAgIEDVAgAABAiMBATJi04gAAQIEBIgaIECAAIGRgAAZsWlEgAABAgJEDRAgQIDASECAjNg0IkCAAAEBogYIECBAYCQgQEZsGhEgQICAAFEDBAgQIDASECAjNo0IECBAQICoAQIECBAYCQiQEZtGBAgQICBA1AABAgQIjAQEyIhNIwIECBAQIGqAAAECBEYCAmTEphEBAgQICBA1QIAAAQIjAQEyYtOIAAECBASIGiBAgACBkYAAGbFpRIAAAQICRA0QIECAwEhAgIzYNCJAgAABAaIGCBAgQGAkIEBGbBoRIECAgABRAwQIECAwEhAgIzaNCBAgQECAqAECBAgQGAkIkBGbRgQIECAgQNQAAQIECIwEBMiITSMCBAgQECBqgAABAgRGAgJkxKYRAQIECAgQNUCAAAECIwEBMmLTiAABAgQEiBogQIAAgZGAABmxaUSAAAECAkQNECBAgMBIQICM2DQiQIAAAQGiBggQIEBgJCBARmwaESBAgIAAUQMECBAgMBIQICM2jQgQIEBAgKgBAgQIEBgJCJARm0YECBAgIEDUAAECBAiMBATIiE0jAgQIEBAgaoAAAQIERgICZMSmEQECBAgIEDVAgAABAiMBATJi04gAAQIEBIgaIECAAIGRgAAZsWlEgAABAgJEDRAgQIDASECAjNg0IkCAAAEBogYIECBAYCQgQEZsGhEgQICAAFEDBAgQIDASECAjNo0IECBAQICoAQIECBAYCQiQEZtGBAgQICBA1AABAgQIjAQEyIhNIwIECBAQIGqAAAECBEYCAmTEphEBAgQICBA1QIAAAQIjAQEyYtOIAAECBASIGiBAgACBkYAAGbFpRIAAAQICRA0QIECAwEhAgIzYNCJAgAABAaIGCBAgQGAkIEBGbBoRIECAgABRAwQIECAwEhAgIzaNCBAgQECAqAECBAgQGAkIkBGbRgQIECAgQNQAAQIECIwEBMiITSMCBAgQECBqgAABAgRGAgJkxKYR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CBAgIEDUAAECBAiMBATIiE0jAgQIEBAgaoAAAQIERgICZMSmEQECBAgIEDVAgAABAiMBATJi04gAAQIEBIgaIECAAIGRgAAZsWlEgAABAgJEDRAgQIDASECAjNg0IkCAAAEBogYIECBAYCQgQEZsGhEgQICAAFEDBAgQIDASECAjNo0IECBAQICoAQIECBAYCQiQEZtGBAgQICBA1AABAgQIjAQEyIhNIwIECBAQIGqAAAECBEYCAmTEphEBAgQICBA1QIAAAQIjAQEyYtOIAAECBASIGiBAgACBkYAAGbFpRIAAAQICRA0QIECAwEhAgIzYNCJAgAABAaIGCBAgQGAkIEBGbBoRIECAgABRAwQIECAwEhAgIzaNCBAgQECAqAECBAgQGAkIkBGbRgQIECAgQNQAAQIECIwEBMiITSMCBAgQECBqgAABAgRGAgJkxKYRAQIECAgQNUCAAAECIwEBMmLTiAABAgQEiBogQIAAgZGAABmxaUSAAAECAkQNECBAgMBIQICM2DQiQIAAAQGiBggQIEBgJCBARmwaESBAgIAAUQMECBAgMBIQICM2jQgQIEBAgKgBAgQIEBgJCJARm0YECBAgIEDUAAECBAiMBATIiE0jAgQIEBAgaoAAAQIERgICZMSmEQECBAgIEDVAgAABAiMBATJi04gAAQIEBIgaIECAAIGRgAAZsWlEgAABAgJEDRAgQIDASECAjNg0IkCAAAEBogYIECBAYCQgQEZsGhEgQICAAFEDBAgQIDASECAjNo0IECBAQICoAQIECBAYCQiQEZtGBAgQICBA1AABAgQIjAQEyIhNIwIECBAQIGqAAAECBEYCAmTEphEBAgQICBA1QIAAAQIjAQEyYtOIAAECBASIGiBAgACBkYAAGbFpRIAAAQICRA0QIECAwEhAgIzYNCJAgAABAaIGCBAgQGAkIEBGbBoRIECAgABRAwQIECAwEhAgIzaNCBAgQECAqAECBAgQGAkIkBGbRgQIECAgQNQAAQIECIwEBMiITSMCBAgQECBqgAABAgRGAgJkxKYRAQIECAgQNUCAAAECIwEBMmLTiAABAgQEiBogQIAAgZGAABmxaUSAAAECAkQNECBAgMBIQICM2DQiQIAAAQGiBggQIEBgJCBARmwaESBAgIAAUQMECBAgMBIQICM2jQgQIEBAgKgBAgQIEBgJCJARm0YECBAgIEDUAAECBAiMBATIiE0jAgQIEBAgaoAAAQIERgICZMSmEQECBAgIEDVAgAABAiMBATJi04gAAQIEBIgaIECAAIGRgAAZsWlEgAABAgJEDRAgQIDASECAjNg0IkCAAAEBogYIECBAYCQgQEZsGhEgQICAAFEDBAgQIDASECAjNo0IECBAQICoAQIECBAYCQiQEZtGBAgQICBA1AABAgQIjAQEyIhNIwIECBAQIGqAAAECBEYCAmTEphEBAgQICBA1QIAAAQIjAQEyYtOIAAECBASIGiBAgACBkYAAGbFpRIAAAQICRA0QIECAwEhAgIzYNCJAgAABAaIGCBAgQGAkIEBGbBoRIECAgABRAwQIECAwEhAgIzaNCBAgQECAqAECBAgQGAkIkBGbRgQIECAgQNQAAQIECIwEBMiITSMCBAgQECBqgAABAgRGAgJkxKYRAQIECAgQNUCAAAECIwEBMmLTiAABAgQEiBogQIAAgZGAABmxaUSAAAECAkQNECBAgMBIQICM2DQiQIAAAQGiBggQIEBgJCBARmwaESBAgIAAUQMECBAgMBIQICM2jQgQIEBAgKgBAgQIEBgJCJARm0YECBAgIEDUAAECBAiMBATIiE0jAgQIEBAgaoAAAQIERgICZMSmEQECBAgIEDVAgAABAiMBATJi04gAAQIEBIgaIECAAIGRgAAZsWlEgAABAgJEDRAgQIDASECAjNg0IkCAAAEBogYIECBAYCQgQEZsGhEgQICAAFEDBAgQIDASECAjNo0IECBAQICoAQIECBAYCQiQEZtGBAgQICBA1AABAgQIjAQEyIhNIwIECBAQIGqAAAECBEYCAmTEphEBAgQICBA1QIAAAQIjAQEyYtOIAAECBASIGiBAgACBkYAAGbFpRIAAAQICRA0QIECAwEhAgIzYNCJAgAABAaIGCBAgQGAkIEBGbBoRIECAgABRAwQIECAwEhAgIzaNCBAgQECAqAECBAgQGAkIkBGbRgQIECAgQNQAAQIECIwEBMiITSMCBAgQECBqgAABAgRGAgJkxKYRAQIECAgQNUCAAAECIwEBMmLTiAABAgQEiBogQIAAgZGAABmxaUSAAAECAkQNECBAgMBIQICM2DQiQIAAAQGiBggQIEBgJCBARmwaESBAgIAAUQMECBAgMBIQICM2jQgQIEBAgKgBAgQIEBgJCJARm0YECBAgIEDUAAECBAiMBATIiE0jAgQIEBAgaoAAAQIERgICZMSmEQECBAgIEDVAgAABAiMBATJi04gAAQIEBIgaIECAAIGRgAAZsWlEgAABAgJEDRAgQIDASECAjNg0IkCAAAEBogYIECBAYCQgQEZsGhEgQICAAFEDBAgQIDASECAjNo0IECBAQICoAQIECBAYCQiQEZtGBAgQICBA1AABAgQIjAQEyIhNIwIECBAQIGqAAAECBEYCAmTEphEBAgQICBA1QIAAAQIjAQEyYtOIAAECBASIGiBAgACBkYAAGbFpRIAAAQICRA0QIECAwEhAgIzYNCJAgAABAaIGCBAgQGAkIEBGbBoRIECAgABRAwQIECAwEhAgIzaNCBAgQECAqAECBAgQGAkIkBGbRgQIECAgQNQAAQIECIwEBMiITSMCBAgQECBqgAABAgRGAgJkxKYRAQIECAgQNUCAAAECIwEBMmLTiAABAgQEiBogQIAAgZGAABmxaUSAAAECAkQNECBAgMBIQICM2DQiQIAAAQGiBggQIEBgJCBARmwaESBAgIAAUQMECBAgMBIQICM2jQgQIEBAgKgBAgQIEBgJCJARm0YECBAgIEDUAAECBAiMBATIiE0jAgQIEBAgaoAAAQIERgICZMSmEQECBAgIEDVAgAABAiMBATJi04gAAQIEBIgaIECAAIGRgAAZsWlEgAABAgJEDRAgQIDASECAjNg0IkCAAAEBogYIECBAYCQgQEZsGhEgQICAAFEDBAgQIDASECAjNo0IECBAQICoAQIECBAYCQiQEZtGBAgQICBA1AABAgQIjAQEyIhNIwIECBAQIGqAAAECBEYCAmTEphEBAgQICBA1QIAAAQIjAQEyYtOIAAECBASIGiBAgACBkYAAGbFpRIAAAQICRA0QIECAwEhAgIzYNCJAgAABAaIGCBAgQGAkIEBGbBoRIECAgABRAwQIECAwEhAgIzaNCBAgQECAqAECBAgQGAkIkBGbRgQIECAgQNQAAQIECIwEBMiITSMCBAgQECBqgAABAgRGAgJkxKYRAQIECAgQNUCAAAECIwEBMmLTiAABAgQEiBogQIAAgZGAABmxaUSAAAECAkQNECBAgMBIQICM2DQiQIAAAQGiBggQIEBgJCBARmwaESBAgIAAUQMECBAgMBIQICM2jQgQIEBAgKgBAgQIEBgJCJARm0YECBAgIEDUAAECBAiMBATIiE0jAgQIEBAgaoAAAQIERgICZMSmEQECBAgIEDVAgAABAiMBATJi04gAAQIEBIgaIECAAIGRgAAZsWlEgAABAgJEDRAgQIDASECAjNg0IkCAAAEBogYIECBAYCQgQEZsGhEgQICAAFEDBAgQIDASECAjNo0IECBAQICoAQIECBAYCQiQEZtGBAgQICBA1AABAgQIjAQEyIhNIwIECBAQIGqAAAECBEYCAmTEphEBAgQICBA1QIAAAQIjAQEyYtOIAAECBASIGiBAgACBkYAAGbFpRIAAAQICRA0QIECAwEhAgIzYNCJAgAABAaIGCBAgQGAkIEBGbBoRIECAgABRAwQIECAwEhAgIzaNCBAgQECAqAECBAgQGAkIkBGbRgQIECAgQNQAAQIECIwEBMiITSMCBAgQECBqgAABAgRGAgJkxKYRAQIECAgQNUCAAAECIwEBMmLTiAABAgQEiBogQIAAgZGAABmxaUSAAAECAkQNECBAgMBIQICM2DQiQIAAAQGiBggQIEBgJCBARmwaESBAgIAAUQMECBAgMBIQICM2jQgQIEBAgKgBAgQIEBgJCJARm0YECBAgIEDUAAECBAiMBATIiE0jAgQIEBAgaoAAAQIERgICZMSmEQECBAj8H8KuvkJcnZzQAAAAAElFTkSuQmCC',
    }).then(() => {
        const userRef = usersDb.doc(userId);
        userRef.update({
            cards: firebase.firestore.FieldValue.arrayUnion({
                id: cardDetails.id,
                cardName: '未命名卡片',
            }),
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
        .then(() => {
            window.alert('saved!!!');
        });
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
        const cardNameInit = dataFromFirebase.cardName;
        callback(
            coverDataInit,
            leftInnerDataInit,
            rightInnerDataInit,
            snapshotInit,
            cardNameInit
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

// this problem
// export const subscribe = (callback, userId) => {
//     const unsubscribe = usersDb.doc(userId).onSnapshot((doc) => {
//         callback(doc.data().cards);
//     });
//     return unsubscribe;
// };
// export const subscribe = (userId) => {
//     usersDb.doc(userId).onSnapshot((doc) => {
//         console.log(doc.data().cards);
//     });
// };

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

export const changeCardName = (userId, cardId, newCardName) => {
    const cardRef = cardsDb.doc(cardId);
    const userRef = usersDb.doc(userId);
    cardRef.update({ cardName: newCardName });

    userRef
        .get()
        .then((doc) => {
            const newCardsArr = [];
            doc.data().cards.map((card) => {
                if (card.id === cardId) {
                    card.cardName = newCardName;
                    newCardsArr.push(card);
                } else {
                    newCardsArr.push(card);
                }
                return null;
            });
            userRef.update({ cards: newCardsArr });
        })
        .then(() => {
            window.alert('更新成功');
        });
};

export const deleteCard = async (userId, cardId, callback) => {
    const userRef = usersDb.doc(userId);
    const cardRef = cardsDb.doc(cardId);
    await cardRef.delete().then(() => {});
    await userRef.get().then((doc) => {
        userRef.update({
            cards: doc.data().cards.filter((card) => card.id !== cardId),
        });
    });
    callback();
};

// export const deleteCard = (userId, cardId, callback) => {
//     const userRef = usersDb.doc(userId);
//     const cardRef = cardsDb.doc(cardId);
//     cardRef.delete().then(() => {});
//     userRef
//         .get()
//         .then((doc) => {
//             userRef.update({
//                 cards: doc.data().cards.filter((card) => card.id !== cardId),
//             });
//         })
//         .then(() => callback());
// };

// get personal profile
export const getDataForProfile = async (
    userId,
    setProfileName,
    setProfileEmail,
    setProfilePhoto
) => {
    const userRef = await usersDb.doc(userId);
    userRef.get().then((doc) => {
        setProfileName(doc.data().name);
        setProfileEmail(doc.data().email);
        if (doc.data().profile) {
            setProfilePhoto(doc.data().profile);
        }
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
            window.alert('卡片已經寄出!!!');
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

export const getCardUser = (cardId, setCardUser) => {
    const cardRef = cardsDb.doc(cardId);
    cardRef.get().then((doc) => {
        setCardUser(doc.data().author);
    });
};
