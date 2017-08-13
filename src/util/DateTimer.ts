/**
 * DateTimer class file.
 *
 * nodejs v6.10
 *
 * @copyright mediba inc.
 * @since 2017
 */

import SystemDateProvider from "./SystemDateProvider";

/**
 * 日付クラス
 * 
 * @package Util
 * @author Takuya Ono(t-ono@mediba.jp)
 */
export default class DateTimer extends Date {

    /**
     * コンストラクタ
     * 
     * @param datetime 日付
     */
    public constructor(datetime?: string) {
/*
        // 未指定の場合に、provider経由で取ってくる
        if (datetime === undefined) {
            datetime = SystemDateProvider.getDateTime();
        }
*/
        super(datetime);
    }
}
