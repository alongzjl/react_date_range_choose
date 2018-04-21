### ry-editable-bind

*   封装 编辑绑定 组件

#### 参数配置

| 属性               | 类型     | 描述           |
| -----------        | -------- | :------------- |
| config             | object   | 配置           |
| -> fnClick         | function | 点击           |
| -> fnCopy          | function | 复制           |
| -> sScaleVal       | string   | 缩放值         |
| -> iParentWidth    | number   | 父级宽度       |
| -> iParentHeight   | number   | 父级高度       |
| -> bRadio          | boolean  | 是否等比例缩放 |
| -> fnDragMove      | function | 拖拽移动       |
| -> aData           | array    | 数据           |
| -> iFocusDataIndex | number   | 选中索引       |
| -> oDockConfig     | object   | 标示线配置     |
| -> fnChangeDock    | function | 改变标示线     |
| -> bTextEdit       | boolean  | 是否文字编辑   |

#### code

```html
<ry-editable-bind
    config="{
        fnClick: fnClick,
        fnCopy: fnCopy,
        fScaleVal: fScaleVal,
        iParentWidth: ParentWidth,
        iParentHeight: ParentHeight,
        bRadio: radio,
        fnDragMove: fnDragMove,
        aData: ryRollScreenData,
        iFocusDataIndex: focusDataIndex,
        oDockConfig: dockConfig,
        fnChangeDock: changeDock,
        bTextEdit: textEdit
    }"
>
</ry-editable-bind>
```

```javascript
/**
 * [fnClick 点击]
 * @return {[type]}     [description]
 */
function fnClick() {

}

/**
 * [fnCopy 复制]
 * @return {[type]}     [description]
 */
function fnCopy() {

}

/**
 * [fnDragMove 拖拽移动]
 * @return {[type]}     [description]
 */
function fnDragMove() {

}

/**
 * [changeDock 改变标示线]
 * @return {[type]}     [description]
 */
function changeDock() {

}
```
