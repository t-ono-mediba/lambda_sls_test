/**
 * AbstractDynamoEntity class file.
 *
 * nodejs v6.10
 *
 * @copyright mediba inc.
 * @since 2017
 */

import { Table, Decorator } from "dynamo-types";
import { validate, ValidatorOptions, ValidationError } from "class-validator";

/**
 * dynamo処理
 * 
 * @package Entity
 * @author Takuya Ono(t-ono@mediba.jp)
 */
export default abstract class AbstractDynamoEntity extends Table {

    /**
     * @var string 有効期限
     */
    @Decorator.Attribute({ timeToLive: true })
    public Expires: number;

    /**
     * validation
     * 
     * @param options ValidatorOptions
     * 
     * @returns Promise<ValidationError[]>
     */
    public validate(options?: ValidatorOptions): Promise<ValidationError[]> {
        return validate(this, options);
    }
}
