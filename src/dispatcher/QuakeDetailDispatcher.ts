/**
 * QuakeDetailDispatcher class file.
 *
 * nodejs v6.10
 *
 * @copyright mediba inc.
 * @since 2017
 */
import { QuakeDetail } from "../definitions/quake";
import AbstractDispatcher from "./AbstractDispatcher";
import QuakeDetailTask from "../task/QuakeDetailTask";
import Logger from "../util/Logger";

/**
 * 地震詳細dispatcher
 * 
 * @package Dispatcher
 * @author Takuya Ono(t-ono@mediba.jp)
 */
export default class QuakeDetailDispatcher extends AbstractDispatcher {

    /**
     * dispatcher
     * 
     * @returns void
     */
    public dispatch(): void {

        // タスク（ビジネスロジック）
        const task: QuakeDetailTask = new QuakeDetailTask();

        // 構造体
        const run = (async () => {
            // ①バケットからjsonとる
            const elements: QuakeDetail[] = await task.parseJson(this.event.Records[0].s3);

            // ③内枠: 放り込まれた地震ID単位の処理軍
            const subTasks = (async (data: QuakeDetail) => {
                // entity生成
                await task.generateEntity(data);

                // validate
                await task.validate();

                // dataをsave
                task.saveEntity();

                // 画像を移動
                // task.moveImage();
            });

            // ②大枠: 非同期に1地震IDずつ放り込む（放り込みっぱなしで終了を待たない）
            elements.forEach(async (element: QuakeDetail) => {
                // ③に流し込み
                subTasks(element).catch((error: any) => {
                    // in Error（処理は続行）
                    Logger.warn(error);
                });
            });

            // 最後にjsonをバックアップに移動
            // task.backupJson();
        });

        // 実行（例外はよしなに）
        run().catch((error: any) => {
            const message = error.toString();
            this.fail(message);
        });
    }
}
