/*
 * @Author: Liao Hui
 * @Date:   2017-08-28 18:56:41
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T13:23:10+08:00
 */

export {
    setRangeStyleUtil,
    setFocusIndexUtil
};

/**
 * [setRangeStyleUtil 设置样式范围]
 * @param {[type]} item   [每项]
 * @param {[type]} $scope [作用域]
 * @return {[type]}       [description]
 */
function setRangeStyleUtil(item, $scope) {
    if (item) {
        $scope.range.styleTop = item.top ? Math.round(item.top) : 0;
        $scope.range.styleLeft = item.left ? Math.round(item.left) : 0;
        $scope.range.styleWidth = item.width ? Math.round(item.width) : 0;
        $scope.range.styleHeight = item.height ? Math.round(item.height) : 0;
        $scope.range.radio = item.radio;
        adjustTopLeft({
            width: item.width,
            height: item.height
        }, $scope);
    }
}

/**
 * [setFocusIndexUtil 选中图层]
 * @param {[type]} index [索引]
 * @param {[type]} vm    [vm]
 * @return {[type]}      [description]
 */
function setFocusIndexUtil(index, vm) {
    const realIndex = vm.ryRollScreenData.findIndex((item) => {
        return item.index === index;
    });
    const item = vm.ryRollScreenData[realIndex];

    if (!item) {
        vm.focusDataIndex = -1;
        return;
    }

    vm.focusItem = item;
    if (vm.focusItem.type == 8 && vm.focusItem.dataList) {
        vm.focusItem.hasPic = vm.focusItem.dataList.some(x => x.type == 1);
        vm.focusItem.hasVideo = vm.focusItem.dataList.some(x => x.type == 2);
    }
    vm.focusDataIndex = index;

    initData(item, vm);
}

/**
 * [initData 初始化数据]
 * @param  {[type]} item [每项]
 * @param  {[type]} vm   [vm]
 * @return {[type]}      [description]
 */
function initData(item, vm) {
    switch (item.type) {
        case 4:
            if (!item.detailMap) {
                item.detailMap = {};
                item.detailMap.is24Hour = true;
                item.detailMap.selectedWeatherStyle = vm.weatherStyles[0].val;
                item.detailMap.selectedWeatherTheme = vm.weatherColors[7].val;
                item.detailMap.selectedDateFormat = vm.dateFormats[0].val;
                item.detailMap.selectedTimeFormat = vm.timeFormats[0].val;
                item.detailMap.menuOpen = false;
                item.detailMap.strongColor = vm.weatherColors[7].strong;
                item.detailMap.weakColor = vm.weatherColors[7].weak;
                item.detailMap.dateFormat = vm.dateFormats[0].text;
                item.detailMap.timeFormat = vm.timeFormats[0].text;
            }
            break;
        case 5:
            if (!item.detailMap) {
                item.detailMap = {};
                item.detailMap.url = "";
            }
            break;
        case 8:
            if (!item.dataList) {
                item.dataList = [];
            }
            break;
        case 9:
            if (!item.detailMap) {
                item.detailMap = {
                    color: '#000000',
                    fontSize: 24
                };
            }
            break;
        default:
            break;
    }
}

/**
 * [adjustTopLeft 调整组件的边距，超出范围时移动到边界]
 * @param  {[type]} item  [每项]
 * @param {[type]} $scope [作用域]
 * @return {[type]}       [description]
 */
function adjustTopLeft(item, $scope) {
    if ($scope.range.styleTop + item.height > $scope.range.height) {
        $scope.focusItem.top = $scope.range.height - item.height;
        $scope.range.styleTop = Math.round($scope.range.height - item.height);
    }
    if ($scope.range.styleLeft + item.width > $scope.range.width) {
        $scope.focusItem.left = $scope.range.width - item.width;
        $scope.range.styleLeft = Math.round($scope.range.width - item.width);
    }
}
