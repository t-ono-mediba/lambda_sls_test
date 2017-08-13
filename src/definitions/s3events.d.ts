/**
 * lambda S3handler型定義
 * 
 * @copyright mediba inc.
 * @since 2017
 * @author Takuya Ono(t-ono@mediba.jp)
 */

/**
 * S3 event
 */
export declare interface S3Event {
    Records: Array<Record>
}
 
/**
 * record
 */
declare interface Record {
    eventVersion: string;
    eventSource: string;
    awsRegion: string;
    eventTime: string;
    eventName: string;
    userIdentity: UserIdentity;
    requestParameters: RequestParameters;
    responseElements: ResponseElements;
    s3: S3;
}
 
/**
 * UserIdentity
 */
declare interface UserIdentity {
    principalId: string;
}
 
/**
 * RequestParameters
 */
declare interface RequestParameters {
    sourceIPAddress: string;
}
 
/**
 * ResponseElements
 */
declare interface ResponseElements {
    "x-amz-request-id": string;
    "x-amz-id-2": string;
}
 
/**
 * S3
 */
declare interface S3 {
    s3SchemaVersion: string;
    configurationId: string;
    bucket: Bucket;
    object: Object;
}
 
/**
 * Object
 */
declare interface Object {
    key: string;
    size: number;
    eTag: string;
    versionId: string,
    sequencer: string,
}
 
/**
 * Bucket
 */
declare interface Bucket {
    name: string;
    ownerIdentity: UserIdentity;
    arn: string;
}