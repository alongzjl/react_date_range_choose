/*
 * @Author: weijie
 * @Date:   2017-09-28 10:47:07
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-03-30T11:47:05+08:00
 */
angular
    .module('cmsDirective')
    .directive('ryRollScreenConfigWeb', ryRollScreenConfigWeb);

/**
 * [ryRollScreenConfigWeb 易拉宝右侧网页配置项指令]
 * @return {[type]} [description]
 */
function ryRollScreenConfigWeb() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            focusItem: '='
        },
        template: __inline('./ry-roll-screen-config-web.html'),
        controller: ryRollScreenConfigWebCtrl,
        controllerAs: 'vm'
    };

    /**
     * [ryRollScreenConfigWebCtrl 易拉宝右侧网页配置项指令控制器]
     * @param  {[type]} $scope                 [作用域]
     * @param  {[type]} Constant               [常量服务]
     * @param  {[type]} MaterialSelect         [素材选择服务]
     * @param  {[type]} RollScreenUtil         [电子易拉宝公共函数服务]
     * @return {[type]}                        [description]
     */
    function ryRollScreenConfigWebCtrl() {
        // const vm = this;
    }
}
