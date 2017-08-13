/**
 * 地震詳細型定義
 * 
 * @copyright mediba inc.
 * @since 2017
 * @author Takuya Ono(t-ono@mediba.jp)
 */

 /**
  * 地震詳細のIF
  */
export declare interface QuakeDetail {
    updateTime: number;
    id: string;
    atime: string;
    maxrank: number;
    maxclass: string;
    spot: string;
    spotmag: string;
    spotdep: string;
    S7: QuakeLank;
    "S6+": QuakeLank;
    "S6-": QuakeLank;
    "S5+": QuakeLank;
    "S5-": QuakeLank;
    S4: QuakeLank;
    S3: QuakeLank;
    S2: QuakeLank;
    S1: QuakeLank;
    wave: string;
}

/**
 * QuakeLank
 */
declare interface QuakeLank {
    shindo: string;
    point: string;
}
