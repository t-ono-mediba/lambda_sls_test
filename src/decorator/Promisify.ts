/**
 * decorator/Promisify file.
 * 
 * nodejs v6.10
 *
 * @copyright mediba inc.
 * @since 2017
 */

/**
 * Promisify
 * util.promisifyとか、別関数にして返すみたいなやつではない
 * 関数の実装時に、冗長的に何度も「new Promise」とか書くのめんどす
 * 
 * 使用例）
 * [定義側]
 * @Promisify
 * public execute(hoge: string): string {
 *     return "OK doodle";
 * }
 * 
 * [利用側]
 * const run = (async () => {
 *     const hoge = await new XXX().execute();
 *     console.log(hoge) // "OK doodle" 
 * });
 * 
 * @package Decorator
 * @author Takuya Ono(t-ono@mediba.jp)
 */ 
export const Promisify = (target: any, name: string, descriptor: PropertyDescriptor) => {
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
