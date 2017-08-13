/**
 * AbstractDispatcher class file.
 *
 * nodejs v6.10
 *
 * @copyright mediba inc.
 * @since 2017
 */
import { Context } from "aws-lambda";
import { S3Event } from "../definitions/s3events";

/**
 * dispatcher抽象クラス
 * こいつを継承実装する
 * 
 * @package Dispatcher
 * @author Takuya Ono(t-ono@mediba.jp)
 */
export default abstract class AbstractDispatcher {

    /**
     * @var {S3Event} S3Event
     */
    protected event: S3Event;

    /**
     * @var {Context} Context
     */
    protected context: Context;

    /**
     * @var string 失敗時メッセージ
     */
    private _failMessage: string;

    /**
     * @var boolean 成功フラグ
     */
    private _isSuccess: boolean;

    /**
     * コンストラクタ
     * 
     * @param event {S3Event} S3Event
     * @param context {Context} Context
     */
    public constructor(event: S3Event, context: Context) {
        this.event   = event;
        this.context = context;

        this._isSuccess = true;
    }

    /**
     * dispatcher
     * 
     * @returns void
     */
    public abstract dispatch(): void;

    /**
     * 成功したか判定
     * 
     * @returns boolean
     */
    public isSuccess(): boolean {
        return this._isSuccess;
    }

    /**
     * 失敗したときのやつ
     * 
     * @param message 
     * 
     * @returns void
     */
    protected fail(message: string): void {
        this._failMessage = message;
        this._isSuccess = false;
    }
}
