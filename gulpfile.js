/*
* @Author: Wei Jie
* @Date:   2017-04-19 10:34:34
 * @Last modified by:   Liao Hui
 * @Last modified time: 2017-09-08T16:51:31+08:00
*/

'use strict';
var gulp = require('gulp');
var sftp = require('gulp-sftp');


['rd', 'qa', 'dist'].forEach(function(item) {
    gulp.task('sftp-' + item, function () {
        runPublish(item);
    });
});


function runPublish(hj) {
    return gulp.src(hj + '/**')
        .pipe(sftp({
            host: '192.168.1.222',
            user: 'rongyi',
            pass: 'rongyi',
            // remotePath: '/home/jfuser/tt',
            remotePath: '/home/rongyi/cmsfrontend/webrootrd52/ry_create_store_static'
        }));
}
