# zb-dropdown-menu 向下弹出的菜单列表

### 微信=》 19550102670 拉进群

### 友情链接
#### 在线预览点击 —— [企业级、通用型中后台前端解决方案 ](http://182.61.5.190:8889/)
#### vue-admin-perfect —— [企业级、通用型中后台前端解决方案（基于vue3.0+TS+Element-Plus  最新版，同时支持电脑，手机，平板)](https://github.com/zouzhibin/vue-admin-perfect)


### DropdownMenu Props 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |是否必须|
| ------ | ------ | ------ | ------ | ------ |------ |
| active-color | 菜单标题和选项的选中态颜色 | string |-- | #ee0a24 |必须 |
| z-index | 选项数组 | 	菜单栏 z-index 层级,一个页面存在多个下拉选项的时候可以通过这个设置	 |number/string | -- | |


### DropdownItem Props 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |是否必须|
| ------ | ------ | ------ | ------ | ------ |------ |
| value | 当前选中项对应的 value，可以通过v-model双向绑定 | number ,string |-- | -- |必须 |
| options | 选项数组 | Option[]	 |-- | -- |必须 |
| name | 必须指定，判断唯一值,不能重复 | String|Number	 |-- | -- |必须 |


##3 DropdownItem Events 
| 参数 | 说明 | 回调参数 | 
| ------ | ------ | ------ | ------ | ------ |------ |
| change | 点击选项导致 value 变化时触发 | item |

### 注意 小程序没有window对象，需要自己在外层进行手动关闭
```
  this.$refs.dropdown.close()
```

### 使用示例
```
<zb-dropdown-menu  style="width: 100%">
  <zb-dropdown-item  
      name="first"  
      :options="option" 
      v-model="value1" 
      @change="change1"
      ></zb-dropdown-item>
  <zb-dropdown-item
    name="two"  
    :options="option2" 
    v-model="value2" 
    @change="change2"
    ></zb-dropdown-item>
</zb-dropdown-menu>
```

### 数据格式
```
option: [
        {
            text: '全部商品',
            value: 0
        },
        {
            text: '新款商品',
            value: 1
        },
        {
            text: '活动商品',
            value: 2
        },
    ],
```

