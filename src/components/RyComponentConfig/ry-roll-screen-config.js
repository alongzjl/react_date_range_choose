/*
 * @Author: weijie
 * @Date:   2017-09-28 10:47:07
 * @Last Modified by: lishengpeng
 * @Last Modified time: 2018-04-17 17:09:20
 */
angular
    .module('cmsDirective')
    .directive('ryRollScreenConfig', ryRollScreenConfig);

/**
 * [ryRollScreenConfig 易拉宝右侧配置项指令]
 * @return {[type]} [description]
 */
function ryRollScreenConfig() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            focusItem: '=',
            focusIndex: '=',
            components: '=',
            range: '=',
            scaleVal: '=',
            mallId: '='
        },
        template: __inline('./ry-roll-screen-config.html'),
        controller: ryRollScreenConfigCtrl,
        controllerAs: 'vm'
    };

    /**
     * [ryRollScreenConfigCtrl 易拉宝右侧配置项控制器]
     * @param  {[type]} $scope                 [作用域]
     * @param  {[type]} Constant               [常量]
     * @param  {[type]} MaterialSelect         [素材选择服务]
     * @param  {[type]} RollScreenUtil         [电子易拉宝公共函数服务]
     * @return {[type]}                        [description]
     */
    function ryRollScreenConfigCtrl($scope, Constant, MaterialSelect, RollScreenUtil) {
        const vm = this;

        vm.changeWeatherStyle = changeWeatherStyle;
        vm.selectColor = selectColor;
        vm.selectDate = selectDate;
        vm.selectTime = selectTime;
        vm.changeStyle = changeStyle;
        vm.changeRadio = changeRadio;
        vm.checkInterval = checkInterval;
        vm.changeMaterial = changeMaterial;
        vm.deleteMaterial = deleteMaterial;
        vm.changeText = changeText;

        $scope.weatherColors = Constant.weatherColors;
        $scope.weatherStyles = Constant.weatherStyles;
        $scope.dateFormats = Constant.dateFormats;
        $scope.timeFormats = Constant.timeFormats;

        /**
         * [changeText 改变文字修改]
         * @param  {[type]} key [样式变化的键]
         * @param  {[type]} val [样式变化的新值]
         * @return {[type]}     [description]
         */
        function changeText(key, val) {
            $scope.$applyAsync(() => {
                $scope.focusItem.detailMap[key] = val;
            });
        }

        /**
         * [changeMaterial 修改素材变化函数]
         * @param  {[type]} purpose [动作]
         * @param  {[type]} type    [类型]
         * @param  {[type]} index   [索引]
         * @return {[type]}         [description]
         */
        function changeMaterial(purpose, type, index) {
            let isMultiple = purpose === 'add';
            MaterialSelect.open($scope.mallId, isMultiple).then(res => {
                let pure = [];
                if ($scope.focusItem.dataList) {
                    res.forEach(item => {
                        let index = $scope.focusItem.dataList.findIndex(x => x.id == item.id);
                        if (index == -1) {
                            pure.push(item);
                        }
                    });
                } else {
                    pure = res;
                }
                if (isMultiple) {
                    $scope.focusItem.dataList = ($scope.focusItem.dataList || []).concat(pure);
                } else {
                    if (pure.length) {
                        $scope.focusItem.dataList[index] = pure[0];
                    }
                }
                $scope.focusItem.hasPic = $scope.focusItem.dataList.some(x => x.type == 1);
                $scope.focusItem.hasVideo = $scope.focusItem.dataList.some(x => x.type == 2);
                if ($scope.focusItem.interval === undefined) {
                    $scope.focusItem.interval = 0;
                }
            });
        }

        /**
         * [deleteMaterial 删除素材]
         * @param  {[type]} index [索引]
         * @return {[type]}       [description]
         */
        function deleteMaterial(index) {
            $scope.focusItem.dataList.splice(index, 1);
            $scope.focusItem.hasPic = $scope.focusItem.dataList.some(x => x.type == 1);
            $scope.focusItem.hasVideo = $scope.focusItem.dataList.some(x => x.type == 2);
        }

        /**
         * [checkInterval 单帧播放时长检测函数]
         * @return {[type]} [description]
         */
        function checkInterval() {
            let temp, val;

            if ($scope.focusItem.interval === null) {
                $scope.focusItem.interval = 0;
            }
            val = Math.round($scope.focusItem.interval);
            temp = val < 0 ? 0 : val > 60 ? 60 : val;
            $scope.focusItem.interval = temp;
        }

        /**
         * [arrMove 数组移动]
         * @param  {[type]} arr       [数组]
         * @param  {[type]} old_index [旧索引]
         * @param  {[type]} new_index [新索引]
         * @return {[type]}           [description]
         */
        function arrMove(arr, old_index, new_index) {
            if (new_index >= arr.length) {
                var k = new_index - arr.length;
                while (k-- + 1) {
                    arr.push(undefined);
                }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr; // for testing purposes
        }

        /**
         * [getFocusIndex 获取图层索引]
         * @return {[type]} [description]
         */
        function getFocusIndex() {
            return $scope.components.findIndex((item) => {
                return item.index === $scope.focusIndex;
            });
        }

        /**
         * [changeStyle 右边form改变，来改变图层信息]
         * @param  {[type]} type [类型]
         * @return {[type]}      [description]
         */
        function changeStyle(type) {
            let focusIndex = getFocusIndex();
            const item = $scope.components[focusIndex];
            let rangeType = 'style' + type.replace(/^[a-z]/, function($0) {
                return $0.toUpperCase();
            });
            let formVal = $scope.range[rangeType];
            let newVal = formVal || 0;

            if ($scope.range.radio) {
                let radio = item.width / item.height;
                if (type === 'width') {
                    item.height = newVal / radio;
                    $scope.range.styleHeight = formVal / radio;
                } else if (type === 'height') {
                    item.width = newVal * radio;
                    $scope.range.styleWidth = formVal * radio;
                }
            }

            item[type] = newVal;
        }

        /**
         * [changeRadio 是否按比率]
         * @return {[type]} [description]
         */
        function changeRadio() {
            let focusIndex = getFocusIndex();

            $scope.components[focusIndex].radio = $scope.range.radio;
        }

        /**
         * [selectColor 日期天气组件选颜色]
         * @param  {[type]} item [选择日期天气对象]
         * @return {[type]}      [description]
         */
        function selectColor(item) {
            let detailMap = $scope.focusItem.detailMap;
            detailMap.selectedWeatherTheme = item.val;
            detailMap.strongColor = $scope.weatherColors[item.val - 1].strong;
            detailMap.weakColor = $scope.weatherColors[item.val - 1].weak;
        }

        /**
         * [selectDate 日期天气组件选日期]
         * @return {[type]} [description]
         */
        function selectDate() {
            let detailMap = $scope.focusItem.detailMap;
            detailMap.dateFormat = $scope.dateFormats[detailMap.selectedDateFormat - 1].text;
        }

        /**
         * [selectTime 日期天气组件选时间]
         * @return {[type]} [description]
         */
        function selectTime() {
            let detailMap = $scope.focusItem.detailMap;
            detailMap.timeFormat = $scope.timeFormats[detailMap.selectedTimeFormat - 1].text;
        }

        /**
         * [changeWeatherStyle 改变天气样式]
         * @return {[type]} [description]
         */
        function changeWeatherStyle() {
            $scope.$applyAsync(() => {
                RollScreenUtil.changeWeatherStyle($scope);
            });
        }
    }
}
