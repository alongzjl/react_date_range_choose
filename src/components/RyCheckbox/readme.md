### ry-checkbox

* 复选框

#### config配置

| 属性        | 类型       | 描述                   |
| --------- | -------- | -------------------- |
| click     | function | 点击时触发的函数             |
| ng-model  | boolean  | 默认是否选中，和外面的ngModel双绑 |
| read-only | boolean  | 是否只读                 |

#### code 一个单选框

```html
<ry-checkbox ng-model="vm.isAble">可用</ry-checkbox>
```

```javascript
vm.isAble = false;
```


#### code 多个复选框
```html
<div class="ui-dib" ng-repeat="item in vm.checkboxList track by $index">
    <ry-checkbox ng-model="item.checked" read-only="item.isDefault">{{item.text}}</ry-checkbox>
</div>
```

```javascript
vm.checkboxList = [{
	value: 1,
	checked: false,
    isDefault: false,
	text: '周一'
},
{
	value: 2,
  	isDefault: false,
	checked: false,
	text: '周二'
}];
```
