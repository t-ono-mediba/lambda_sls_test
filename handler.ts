/**
 * @return any
 */
export function dispose (event: any, context: any, callback: Function): any {
    console.log(event);
    return callback(null, 'Hello from dispose');
};

/**
 * @return any
 */
export function regist (event: any, context: any, callback: Function): any {
    console.log(event);
    return callback(null, 'Hello from regist');
};