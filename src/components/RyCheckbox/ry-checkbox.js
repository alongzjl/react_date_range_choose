/*
* @Author: weijie
* @Date:   2017-08-16 18:35:01
* @Last Modified by:   wangxiang
* @Last Modified time: 2018-01-09 12:00:29
*/
angular.module('cmsDirective')
    .directive('ryCheckbox', ryCheckbox);

/**
 * [ryCheckbox 复选框指令]
 * @return {[type]} [description]
 */
function ryCheckbox() {
    return {
        restrict: 'EA',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            readOnly: '=',
            click: '&'
        },
        template: __inline('./ry-checkbox.html'),
        transclude: true,
        replace: true
    };
}
