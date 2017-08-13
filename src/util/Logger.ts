/**
 * Logger class file.
 * どうせconsole.logしかしないし、取り替える事もないから
 * このオブジェクト固定にするわ
 * 
 * nodejs v6.10
 *
 * @copyright mediba inc.
 * @since 2017
 */

/**
 * logger
 * 
 * @package Util
 * @author Takuya Ono(t-ono@mediba.jp)
 */
export default class Logger {

    /**
     * @var string debugモード
     */
    private static readonly MODE_DEBUG = "[debug]";

    /**
     * @var string infoモード
     */
    private static readonly MODE_INFO  = "[info]";

    /**
     * @var string warnモード
     */
    private static readonly MODE_WARN =  "[warn]";

    /**
     * @var string errorモード
     */
    private static readonly MODE_ERROR = "[error]";

    /**
     * @var string fatalモード
     */
    private static readonly MODE_FATAL = "[fatal]";

    /**
     * debugログ
     * 
     * @param any message メッセージ
     * 
     * @returns void
     */
    public static debug(message: any) {
        this._log(`${this.MODE_DEBUG}${message.toString()}`);
    }

    /**
     * infoログ
     * 
     * @param any message メッセージ
     * 
     * @returns void
     */
    public static info(message: any) {
        this._log(`${this.MODE_INFO}${message.toString()}`);
    }
    
    /**
     * warnログ
     * 
     * @param any message メッセージ
     * 
     * @returns void
     */
    public static warn(message: any) {
        this._log(`${this.MODE_WARN}${message.toString()}`);
    }

    /**
     * errorログ
     * 
     * @param any message メッセージ
     * 
     * @returns void
     */
    public static error(message: any) {
        this._log(`${this.MODE_ERROR}${message.toString()}`);
    }

    /**
     * fatalログ
     * 
     * @param any message メッセージ
     * 
     * @returns void
     */
    public static fatal(message: any) {
        this._log(`${this.MODE_FATAL}${message.toString()}`);
    }
    
    /**
     * logる
     * 
     * @param string message メッセージ
     */
    private static _log(message: string) {
        console.log(message);
    }
}
