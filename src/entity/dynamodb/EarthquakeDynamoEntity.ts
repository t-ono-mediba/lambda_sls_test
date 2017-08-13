/**
 * EarthquakeDynamoEntity class file.
 *
 * nodejs v6.10
 *
 * @copyright mediba inc.
 * @since 2017
 */

import { Decorator, Query } from "dynamo-types";
import { QuakeLank } from "../../definitions/quake";
import { IsNotEmpty, Max, Min, ValidationArguments } from "class-validator";
import AbstractDynamoEntity from "./AbstractDynamoEntity";

/**
 * Earthquakeテーブルのdynamo処理
 * 
 * @package DynamoDb
 * @author Takuya Ono(t-ono@mediba.jp)
 */
@Decorator.Table({ name: "Earthquake" })
export default class EarthquakeDynamoEntity extends AbstractDynamoEntity {

    /**
     * @var string 地震テーブル用識別子
     */
    public static readonly IDENTIFIRE_KEY: string = "Quake";

    /**
     * @var Query.Writer writer
     */
    @Decorator.Writer()
    public static readonly writer: Query.Writer<EarthquakeDynamoEntity>;

    /**
     * @var Query.FullPrimaryKey primaryKey
     */
    @Decorator.FullPrimaryKey("QuakeId", "UpdateTime")
    public static readonly primaryKey: Query.FullPrimaryKey<EarthquakeDynamoEntity, string, string>;    
    
    /**
     * @var string 地震ID
     */
    @IsNotEmpty({
        message: "[id]地震IDがありません。",
    })
    @Decorator.Attribute()
    public QuakeId: string;

    /**
     * @var string 発生時間
     */
    @IsNotEmpty({
        message: "[atime]発生時間がありません。",
    })
    @Decorator.Attribute()
    public Atime: string;

    /**
     * @var string 最大震度ランク
     */
    @Min(1, { message: (args: ValidationArguments) => {
        return `[maxlank]発生時間の値が正しくありません。[${args.value}]`;
    }})
    @Max(2, { message: (args: ValidationArguments) => {
        return `[maxlank]発生時間の値が正しくありません。[${args.value}]`;
    }})
    @Decorator.Attribute()
    public MaxRank: string;

    /**
     * @var string 最大震度(日本語表記)
     */
    @IsNotEmpty({
        message: "[maxclass]最大震度(日本語表記)がありません。",
    })    
    @Decorator.Attribute()
    public MaxClass: string;

    /**
     * @var string 震源地
     */
    @Decorator.Attribute()
    public Spot: string;

    /**
     * @var string 地震の規模（マグニチュード）
     */
    @Decorator.Attribute()
    public SpotMag: string;

    /**
     * @var string 震源の深さ
     */    
    @Decorator.Attribute()
    public SpotDep: string;

    /**
     * @var Set 地震観測地リスト
     */
    @Decorator.Attribute()
    public Details: QuakeLank[];

    /**
     * @var string 津波付加文
     */
    @Decorator.Attribute()
    public Wave: string;

    /**
     * @var string 更新時間
     */
    @IsNotEmpty({
        message: "[update_time]更新日付がありません。",
    })
    @Decorator.Attribute()
    public UpdateTime: number;
}
