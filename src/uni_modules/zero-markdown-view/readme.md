# zero-markdown-view


## 一. 重要更新说明

### v2.0.4
- 新增点击代码块复制代码-仅小程序可用

### v2.0.1
- 兼容vue2,vue3

### v2.0.0
- 省去了 npm install marked
- 省去了 npm install highlight.js
- 使用mp-html自带的插件,重新生成uniapp包,大幅减少插件体积
传送门: [优化思路及详细过程](https://juejin.cn/post/7160995270476431373/) https://juejin.cn/post/7160995270476431373/

## 二. 使用方法

**符合`easycom`组件模式, 导入 `uni_modules` 后直接使用即可 **

```html
<template>
	<view class="container">
		<!-- 默认用法 直接传入md文本即可-->
	<zero-markdown-view :markdown="content"></zero-markdown-view>
	</view>
</template>
<script>
	
	export default {
		data() {
			return {
				content: "\n# 一级标题\n\n## 二级标题\n\n### 三级标题\n\n### 1.2 无序列表\n\n无序列表的使用，在符号`-`后加空格使用。如下：\n- 无序列表 1\n- 无序列表 2\n  - 无序列表 2.1\n  - 无序列表 2.2\n\n**由于微信原因，最多支持到二级列表**。\n\n### 1.3 有序列表\n\n1. 有序列表 1\n2. 有序列表 2\n\n\n### 1.4 粗体和斜体\n\n**这个是粗体**\n\n_这个是斜体_\n\n**_这个是粗体加斜体_**\n\n\n### 1.5 链接\n\n对于该论述，欢迎读者查阅之前发过的文章，[你是《未来世界的幸存者》么？](https://mp.weixin.qq.com/s/s5IhxV2ooX3JN_X416nidA)\n\n### 1.6 引用\n\n> ### 一级引用示例\n> \n> 读一本好书，就是在和高尚的人谈话。 **——歌德**\n\n### 1.7 分割线\n\n可以在一行中用三个以上的减号来建立一个分隔线，同时需要在分隔线的上面空一行。如下：\n\n---\n\n### 1.8 删除线\n\n删除线的使用，在需要删除的文字前后各使用两个`~`，如下：\n\n~~这是要被删除的内容。~~\n\n### 1.9 表格\n\n| 姓名       | 年龄 |         工作 |\n| :--------- | :--: | -----------: |\n| 作者     |  18  |     web |\n| zerojs   |  20  |  前端 |\n| 太菜了 |  22  | 躺平 |\n\n\n## 2. 特殊语法\n\n### 2.1 脚注\n\n脚注与链接的区别如下所示：\n\n```markdown\n链接：[文字](链接)\n脚注：[文字](脚注解释 \"脚注名字\")\n```\n### 2.2 代码块\n\n```js\nconsole.log(\"1\");\n\nsetTimeout(function () {\n  console.log(\"2\");\n  process.nextTick(function () {\n    console.log(\"3\");\n  });\n  new Promise(function (resolve) {\n    console.log(\"4\");\n    resolve();\n  }).then(function () {\n    console.log(\"5\");\n  });\n});\n```\n\ndiff 不能同时和其他语言的高亮同时显示，且需要调整代码主题为微信代码主题以外的代码主题才能看到 diff 效果，使用效果如下:\n\n```diff\n+ 新增项\n- 删除项\n```\n\n**其他主题不带行号，可自定义是否换行，代码大小与当前编辑器一致**\n\n\n\n## 3 其他语法\n\n### 3.1 HTML\n\n支持原生 HTML 语法，请写内联样式，如下：\n\n<span style=\"display:block;text-align:right;color:orangered;\">橙色居右</span>\n<span style=\"display:block;text-align:center;color:orangered;\">橙色居中</span>\n\n### 3.2 UML\n\n不支持，推荐使用开源工具`https://draw.io/`制作后再导入图片"
			}
		},
		created() {
		},
		computed: {
			// 流式输出时代码块处理 , 这时候请使用 msgContent 传入组件中
			msgContent() {
				if (!this.content) {
					return 
				}
				let htmlString = ''
				// 判断markdown中代码块标识符的数量是否为偶数
				if (this.content.split("```").length % 2) {
					let content = this.content
					if (content[content.length - 1] != '\n') {
						content += '\n'
					}
					htmlString = content
				} else {
					htmlString = this.content
				}
				return htmlString
			}
		},
		methods: {
		
		},
	}
</script>
	<style lang="scss" scoped>
	</style>
```

## 三. 参数说明

|参数		|类型	|默认值		|描述					|
|--			|--		|--			|--						|
|markdown	|String	|			|markdown文本			|
|themeColor	|String	|'#007AFF'	|主题色					|
|codeBgColor|String	|'#2d2d2d'	|代码块背景色	(不建议修改)	|



## 四. 注意事项

### 关于代码块流式输出闪烁,可以尝试 给代码块后增加 `\n`


```javascript
		computed: {
			// 流式输出时代码块处理 , 这时候请使用 msgContent 传入组件中
			msgContent() {
				if (!this.content) {
					return 
				}
				let htmlString = ''
				// 判断markdown中代码块标识符的数量是否为偶数
				if (this.content.split("```").length % 2) {
					let content = this.content
					if (content[content.length - 1] != '\n') {
						content += '\n'
					}
					htmlString = content
				} else {
					htmlString = this.content
				}
				return htmlString
			}
		},
```



### 如何关闭点击代码块复制功能?

找到组件文件夹 `zero-markdown-view`-`mp-html`-`highlight`-`config.js`

**把 `copyByClickCode` 改成 false 即可**
```
export default {
  copyByClickCode: true, // 点击代码块复制
  showLanguageName: true, // 是否在代码块右上角显示语言的名称
  showLineNumber: false // 是否显示行号
}
```

### 感谢 mp-html 插件

插件地址: [https://ext.dcloud.net.cn/plugin?id=805](https://ext.dcloud.net.cn/plugin?id=805)

文档地址: [https://jin-yufeng.gitee.io/mp-html/#/overview/quickstart](https://jin-yufeng.gitee.io/mp-html/#/overview/quickstart)


插件预览:
![code](https://img.zerojs.cn/mweb/we_code.jpg)


> 小程序搜索: zerojs零技术

> 预览的小程序不一定能及时更新当前插件
