class ResolveCollection {

    constructor() {
        this.collector = [];
    }

    collect(key, value) {
        this.collector.push([key, value]);
    }

    getCollection() {
        return this.collector;
    }

    clear() {
        this.collector = [];
    }
}

/*

var taskA = new Promise(function(resolve, reject) {
    //    setTimeout(() => {
        console.log('taskA');
        resolve();
//    }, 10);
});

var taskB = new Promise(function(resolve, reject) {
    console.log('taskB');
    resolve();
});

var taskC = new Promise(function(resolve, reject) {
    console.log('taskC');
    resolve();
});

var taskD = new Promise(function(resolve, reject) {
    console.log('taskD');
    resolve();
});

var taskE = new Promise((resolve, reject) => {
    console.log('taskE');
    resolve();
});
    
Promise.all([taskE, taskA, taskB])
    .then(() => Promise.all([taskC, taskD])) 
    .catch((e) => {
        console.log(e);
    });
*/

/*
Promise.all([
    new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('taskA');
            resolve();
        }, 20)
    }),
    new Promise((resolve, reject) => {
        console.log('taskB');
        resolve();
    }),
])
.then(() => Promise.all([
    new Promise((resolve, reject) => {
        console.log('taskC');
        resolve();
    }),
    new Promise((resolve, reject) => {
        console.log('taskD');
        resolve();
    }),    
]))
*/


class HogeA {

    constructor(collector) {
        this.collector = collector;
    }

    processA() {
        return new Promise((resolve, reject) => {
            console.log('HogeA');
            this.collector.collect('hogeAKey', 'hogeAValue');
            resolve();
        });
    }

    processB() {
        return new Promise((resolve, reject) => {
            console.log('HogeB');
            this.collector.collect('hogeBKey', 'hogeBValue');
            resolve();
        });
    }

    processC() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('HogeC');
                this.collector.collect('hogeCKey', 'hogeCValue');
                resolve();
            }, 10)
        });
    }

    processD() {
        return new Promise((resolve, reject) => {
            console.log('HogeD');
            //reject('rejectD');
            throw new Error('hogehoge');
        });
    }
}

class HogeB extends HogeA {

/*    constructor(collector) {
        super(collector);
    }
*/
    processE() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('HogeE');
                this.collector.collect('hogeEKey', 'hogeEValue');
                resolve();
            }, 10)
        });
    }    
}

const collector = new ResolveCollection();
const hogeA = new HogeA(collector);
const hogeB = new HogeB(collector);
//console.log(clazz);

Promise.all([hogeB.processE(), hogeA.processC(), hogeA.processA()])
    .then(() => Promise.all([hogeA.processD(), hogeA.processB(), hogeA.processC()]))
    .catch((e) => {
        console.log(e.message);
        console.log(collector.getCollection());
    });