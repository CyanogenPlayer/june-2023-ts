const random = (min = 500, max = 2000): number => {
    return Math.round(Math.random() * (max - min) + min)
}

const energy = 3000;

type Cb = (err: string, data?: number) => void;

const msg = (msg: string, en: number): void => {
    console.log(msg);
    console.log(`залишилось ${en}`);
    console.log('---------------------------');
}

// const wakeUp = (en: number, cb: Cb): void => {
//     setTimeout(() => {
//         en -= random();
//
//         if (en <= 0) {
//             cb('Вмер так і не прокинувшись');
//         } else {
//             msg('Прокинувся', en);
//             cb(null, en);
//         }
//     }, random())
// };
//
// const eat = (en: number, cb: Cb): void => {
//     setTimeout(() => {
//         en += random();
//         msg('поїв', en);
//         cb(null, en);
//     }, random())
// };
//
// const goToWork = (en: number, cb: Cb): void => {
//     setTimeout(() => {
//         en -= random();
//
//         if (en <= 0) {
//             cb('Вмер так і не дійшовши до роботи');
//         } else {
//             msg('Дойшов', en);
//             cb(null, en);
//         }
//     }, random())
// };
//
// const work = (en: number, cb: Cb): void => {
//     setTimeout(() => {
//         en -= random();
//
//         if (en <= 0) {
//             cb('Вмер на роботі');
//         } else {
//             msg('попрацював', en);
//             cb(null, en);
//         }
//     }, random())
// };
//
// const dinner = (en: number, cb: Cb): void => {
//     setTimeout(() => {
//         en += random();
//         msg('поїв', en);
//         cb(null, en);
//     }, random())
// };
//
// const goToHome = (en: number, cb: Cb): void => {
//     setTimeout(() => {
//         en -= random();
//
//         if (en <= 0) {
//             cb('Вмер так і не дійшовши додому');
//         } else {
//             msg('Дойшов', en);
//             cb(null, en);
//         }
//     }, random())
// };
//
// // wakeUp(energy, (err, data) => {});
// // eat(energy, (err, data) => {});
// // goToWork(energy, (err, data) => {});
// // work(energy, (err, data) => {});
// // dinner(energy, (err, data) => {});
// // work(energy, (err, data) => {});
// // goToHome(energy, (err, data) => {});
//
// wakeUp(energy, (err, data) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//
//     eat(data, (err1, data1) => {
//         goToWork(data1, (err2, data2) => {
//             if (err2) {
//                 console.log(err2);
//                 return;
//             }
//
//             work(data2,(err3, data3) => {
//                 if (err3) {
//                     console.log(err3);
//                     return;
//                 }
//
//                 dinner(data3, (err4, data4) => {
//                     work(data4, (err5, data5) => {
//                         if (err5) {
//                             console.log(err5);
//                             return;
//                         }
//
//                         goToHome(data5, (err6, data6) => {
//                             if (err6) {
//                                 console.log(err6);
//                             }
//                         });
//                     });
//                 });
//             });
//         });
//     });
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const wakeUp = (en: number): Promise<number> => new Promise<number>((resolve, reject) => {
    setTimeout(() => {
        en -= random();

        if (en <= 0) {
            reject('Вмер так і не прокинувшись');
            return;
        }
        msg('Прокинувся', en);
        resolve(en);
    }, random())
});

const eat = (en: number): Promise<number> => new Promise<number>((resolve) => {
    setTimeout(() => {
        en += random();
        msg('поїв', en);
        resolve(en);
    }, random())
});

const goToWork = (en: number): Promise<number> => new Promise<number>((resolve, reject) => {
    setTimeout(() => {
        en -= random();

        if (en <= 0) {
            reject('Вмер так і не дійшовши до роботи');
            return
        }
        msg('Дойшов', en);
        resolve(en);
    }, random())
});

const work = (en: number): Promise<number> => new Promise<number>((resolve, reject) => {
    setTimeout(() => {
        en -= random();

        if (en <= 0) {
            reject('Вмер на роботі')
            return
        }
        msg('попрацював', en);
        resolve(en);
    }, random())
});

const dinner = (en: number): Promise<number> => new Promise<number>((resolve) => {
    setTimeout(() => {
        en += random();
        msg('поїв', en);
        resolve(en);
    }, random())
});

const goToHome = (en: number): Promise<number> => new Promise<number>((resolve, reject) => {
    setTimeout(() => {
        en -= random();

        if (en <= 0) {
            reject('Вмер так і не дійшовши додому');
            return;
        }
        msg('Дойшов', en);
        resolve(en);
    }, random())
});

// wakeUp(energy)
//     .then(en => eat(en))
//     .then(en => goToWork(en))
//     .then(en => work(en))
//     .then(en => dinner(en))
//     .then(en => work(en))
//     .then(en => goToHome(en))
//     .catch(err => console.log(err));

const start = async (): Promise<void> => {
    try {
        let en = await wakeUp(energy);
        en = await eat(en);
        en = await goToWork(en);
        en = await work(en);
        en = await dinner(en);
        en = await work(en);
        await goToHome(en);
    } catch (e) {
        console.log(e);
    }
}

start();
