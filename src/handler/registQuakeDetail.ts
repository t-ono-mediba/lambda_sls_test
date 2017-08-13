/**
 * registQuakeDetail file.
 *
 * nodejs v6.10
 *
 * @copyright mediba inc.
 * @since 2017
 */
import { Callback, Context } from "aws-lambda";
import { S3Event } from "../definitions/s3events";
import QuakeDetailDispatcher from "../dispatcher/QuakeDetailDispatcher";

/**
 * 地震詳細ハンドラー
 * webpackされて built/quake.jsになる
 * 
 * @package handler
 * @author Takuya Ono(t-ono@mediba.jp)
 */
export function handler(event: S3Event, context: Context, callback: Callback) {

    const dispatcher: QuakeDetailDispatcher = new QuakeDetailDispatcher(event, context);
    dispatcher.dispatch();
    
    callback(undefined, JSON.stringify("Hello from dispose"));

    return;
}
