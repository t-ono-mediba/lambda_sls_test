/*
import * as fs from "fs";

const hoge: any = JSON.parse(fs.readFileSync("/Users/onotakuya/Desktop/IF/quake.json").toString());
// console.log(hoge);

const letme = ((data: any) => {

    return new Promise((resolve) => {
        return setTimeout(() => {
            console.log(`${data.id} ===============終了`);
            return data.id;
        }, 10);
    });
});

const fufufu = (async (data: any) => {
    // console.log(data);
    data.forEach((lele: any) => {
         // console.log(lele);
        console.log(`${lele.id} ===============開始`);

        let res = letme(lele);
        console.log(`${res} returned`);
    });
});

fufufu(hoge);

*/
/*
const Promisefy = (target: any, name: string, descriptor: PropertyDescriptor) => {

    const delegate: any = descriptor.value;

    // なんかよくわからんけど・・・
    // descriptor.value = () => { じゃバグる
    // （argumentsの値がぶっ壊れる・・・）
    descriptor.value = function() {
        return new Promise((resolve, reject) => {
            try {
                const result = delegate.apply(this, arguments);
                resolve(result);
            } catch (e) {
                reject(e.toString());
            }
        });
    };

    return descriptor;
};

class HogeHoge {

    @Promisefy
    public execute(hofe: string): string {
        return `OK_${hofe}`;
    }
}

const rrr = (async () => { 
    const ggg = await new HogeHoge().execute("abcd");
    console.log(ggg);
});

rrr();
*/
/*
class Calc {
  @debug
  add (a: number, b: number): number{
    return a + b;
  }
}

new Calc().add(1, 4);
*/

const date = new Date("2016/04/04 22:00:00");
console.log(date.toLocaleString());
console.log(date.toLocaleDateString());

console.log(Date.now().toLocaleString());
