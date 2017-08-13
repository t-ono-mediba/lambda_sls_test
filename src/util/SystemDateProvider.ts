/**
 * SystemDateProvider class file.
 *
 * nodejs v6.10
 *
 * @copyright mediba inc.
 * @since 2017
 */

/**
 * システム日付提供クラス
 * 
 * @package Util
 * @author Takuya Ono(t-ono@mediba.jp)
 */
export default class SystemDateProvider {

    /**
     * @var string 日付
     */
    private static _datetime: string;

    /**
     * 
     * @param datetime 
     */
    public static setDateTime(datetime: string): void {
        //
    }

    /**
     * 
     */
    /*
    public static getDateTime(): string {

        if (this._datetime === undefined) {
            return Date.now().toLocaleString();
        }
    }*/
}
