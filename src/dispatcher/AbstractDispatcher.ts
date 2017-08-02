/**
 * dispatcher抽象クラス
 * こいつを継承実装する
 * 
 * @copyright mediba inc.
 * @since 2017
 */
export default abstract class AbstractDispatcher {

    /**
     * dispatcher
     * 
     * @returns void
     */
    abstract dispatch(): void;
}