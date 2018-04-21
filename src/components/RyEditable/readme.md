### ry-editable

*   封装 编辑 组件

#### 参数配置

| 属性             | 类型     | 描述           |
| -----------      | -------- | :------------- |
| config           | object   | 配置           |
| -> bMove         | boolean  | 是否移动       |
| -> iRadio        | number   | 是否等比例     |
| -> bFocus        | boolean  | 是否获取焦点   |
| -> iScaleVal     | number   | 是否缩放       |
| -> iWidth        | number   | 宽度           |
| -> iHeight       | number   | 高度           |
| -> iParentWidth  | number   | 父级宽度       |
| -> iParentHeight | number   | 父级高度       |

#### code

```html
<ry-editable
    config="{
        bMove: false,
        bResize: false,
        iRadio: iRadio,
        bFocus: false,
        iScaleVal: scaleVal,
        iWidth: width,
        iHeight: height,
        iParentWidth: ParentWidth,
        iParentHeight: ParentHeight
    }"
>
</ry-editable>
```

```javascript

```
