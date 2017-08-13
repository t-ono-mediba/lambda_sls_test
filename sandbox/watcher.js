/**
 * lambda-localを起動する
 */
const config = require('config');
const path = require('path');
const lambdaLocal = require('lambda-local');
const chokidar = require('chokidar');

const bucketPath = path.join(__dirname, config.get('local.bucket'));

// 監視フォルダー
const watchQuakeFolder = `${bucketPath}/quake`;
const watchWarnFolder = `${bucketPath}/warn`;

// Lambda スクリプト名
const eventQuakeScript = '../built/quake.js';
const eventWarnScript = '../built/warn.js';


// Lambd にイベントを送る
const sendEvent = (req, callback) => {
    console.log('Added file:', req.File);

    let eventScript = '';

    switch (req.Type) {
        case 'quake':
            eventScript = eventQuakeScript;
            break;
        case 'warn':
            eventScript = eventWarnScript;
            break;
        default:
    }

    lambdaLocal.execute({
        lambdaPath: eventScript,
        event: { // ダミーイベントなのでローカル環境での必須項目のみセット
            Records: [{
                s3: {
                    bucket: {
                        name: bucketPath,
                    },
                    object: {
                        key: req.File.replace(`${bucketPath}/`, ''),
                        size: 1,
                    },
                },
            }],
        },
        callback: (err, result) => {
            if (err) callback('Error:', err);
            callback(null, result);
        },
    });
};

// /quake フォルダーを監視
chokidar.watch((watchQuakeFolder), {
    ignored: /[/\\]\./,
    ignoreInitial: true,
}).on('add', (addedFilePath) => {
    console.log(addedFilePath);
    sendEvent({ File: addedFilePath, Type: 'quake' }, (err, res) => {
        if (err) return console.log('Error:', err);
        console.log('Success:', res);
    });
});

// warn フォルダーを監視
chokidar.watch((watchWarnFolder), {
    ignored: /[/\\]\./,
    ignoreInitial: true,
}).on('add', (addedFilePath) => {
    sendEvent({ File: addedFilePath, Type: 'warn' }, (err, res) => {
        if (err) return console.log('Error:', err);
        console.log('Success:', res);
    });
});
