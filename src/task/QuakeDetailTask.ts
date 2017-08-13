/**
 * QuakeDetailTask class file.
 * 
 * nodejs v6.10
 *
 * @copyright mediba inc.
 * @since 2017
 */

import * as aws from "aws-sdk";
import { S3 } from "../definitions/s3events";
import { QuakeDetail, QuakeLank } from "../definitions/quake";
import AbstractTask from "./AbstractTask";
import EarthquakeDynamoEntity from "../entity/dynamodb/EarthquakeDynamoEntity";

/**
 * 地震詳細タスク
 * 
 * @package Task
 * @author Takuya Ono(t-ono@mediba.jp)
 */ 
export default class QuakeDetailTask extends AbstractTask {

    /**
     * @var EarthquakeDynamoEntity entity
     */
    private _entity: EarthquakeDynamoEntity;

    /**
     * jsonをパースしてリストを返す
     * 
     * @param S3 WNIのパケット
     * 
     * @returns QuakeDetail[] 
     * @throws Error
     */
    public async parseJson(s3: S3): Promise<QuakeDetail[]> {

        const srcBucket = s3.bucket.name;
        const srcKey = s3.object.key;
        const srcS3 = new aws.S3();
        
        const data = await srcS3.getObject({Bucket: srcBucket, Key: srcKey}).promise();

        if (data.Body === undefined) {
            throw new Error(`${srcBucket}/${srcKey}の中身の取得に失敗しました。`);
        }

        return JSON.parse(data.Body.toString()) as QuakeDetail[];
    }

    /**
     * entityに突っ込む
     * 
     * @param data QuakeDetail 地震詳細IFの1地震単位
     * 
     * @returns void
     */
    public generateEntity(data: QuakeDetail): void {

        const entity = new EarthquakeDynamoEntity();

        entity.QuakeId  = data.id;
        entity.Atime    = data.atime;
        entity.MaxClass = data.maxclass;
        entity.MaxRank  = data.maxrank.toString();
        entity.Spot     = data.spot;
        entity.SpotMag  = data.spotmag;
        entity.SpotDep  = data.spotdep;
        entity.Wave     = data.wave;
        entity.Details  = new Array<QuakeLank>();

        if (data.S7 !== undefined) {
            entity.Details.push(data.S7);
        }

        if (data["S6+"] !== undefined) {
            entity.Details.push(data["S6+"]);
        }

        if (data["S6-"] !== undefined) {
            entity.Details.push(data["S6-"]);
        }

        if (data["S5+"] !== undefined) {
            entity.Details.push(data["S5+"]);
        }

        if (data["S5-"] !== undefined) {
            entity.Details.push(data["S5-"]);
        }

        if (data.S4 !== undefined) {
            entity.Details.push(data.S4);
        }

        if (data.S3 !== undefined) {
            entity.Details.push(data.S3);
        }

        if (data.S2 !== undefined) {
            entity.Details.push(data.S2);
        }

        if (data.S1 !== undefined) {
            entity.Details.push(data.S1);
        }
        
        this._entity = entity;
    }

    /**
     * validate
     * 
     * @returns void
     * @throws Error
     */
    public validate(): void {
        this._entity.validate().then((error) => {
            throw new Error(error.toString());
        });
    }
    
    /**
     * save
     * 
     * @returns void
     */
    public saveEntity(): void {

        // Atimeのフォーマットを変更
        
        // 有効期限を決めておく
        // save
        this._entity.save().catch((error) => {
            //
        });
    }
}
