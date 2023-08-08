<!-- uniapp vue3 markdown解析 -->
<template>
<view class="ua__markdown"><rich-text space="nbsp" :nodes="parseNodes(source)" @itemclick="handleItemClick"></rich-text></view>
</template>

<script setup>
import './restyle.css'
import { ref, computed } from 'vue'
	import MarkdownIt from './lib/markdown-it.min.js'
import hljs from './lib/highlight/uni-highlight.min.js'
import './lib/highlight/atom-one-dark.css'
import parseHtml from './lib/html-parser.js'
	const props = defineProps({
		// 解析内容
	source: String,
	  showLine: { type: [Boolean, String], default: true }
	})
	
	let copyCodeData = []
 const markdown = MarkdownIt({
		 html: true,
	 highlight: function(str, lang) {
		let preCode = ""
		try {
		preCode = hljs.highlightAuto(str).value
		} catch (err) {
		preCode = markdown.utils.escapeHtml(str);
			}
		const lines = preCode.split(/\n/).slice(0, -1)
		// 添加自定义行号
	let html = lines.map((item, index) => {
		if( item == ''){
			return ''
			}
				return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item +'</li>'
			}).join('')
		if(props.showLine) {
			html = '<ol style="padding: 0px 30px;">' + html + '</ol>'
			}else {
		html = '<ol style="padding: 0px 7px;list-style:none;">' + html + '</ol>'
			}
	copyCodeData.push(str)
		let htmlCode = `<div class="markdown-wrap">`
				// #ifndef MP-WEIXIN
			htmlCode += `<div style="color: #aaa;text-align: right;font-size: 12px;padding:8px;">`
					htmlCode += `${lang}<a class="copy-btn" code-data-index="${copyCodeData.length - 1}" style="margin-left: 8px;">复制代码</a>`
					htmlCode += `</div>`
				// #endif
		htmlCode += `<pre class="hljs" style="padding:10px 8px 0;margin-bottom:5px;overflow: auto;display: block;border-radius: 5px;"><code>${html}</code></pre>`;
			htmlCode += '</div>'
	return htmlCode
	}
	})
const parseNodes = (value) => {
	 if(!value) return
		 // 解析<br />到\n
	  value = value.replace(/<br>|<br\/>|<br \/>/g, "\n")
	value = value.replace(/&nbsp;/g, " ")
		 let htmlString = ''
	if (value.split("```").length % 2) {
		let mdtext = value
		if(mdtext[mdtext.length-1] != '\n'){
		mdtext += '\n'
			}
	  htmlString = markdown.render(mdtext)
		} else {
		htmlString = markdown.render(value)
		}
		// 解决小程序表格边框型失效问题
htmlString = htmlString.replace(/<table/g, `<table class="table"`)
		htmlString = htmlString.replace(/<tr/g, `<tr class="tr"`)
	htmlString = htmlString.replace(/<th>/g, `<th class="th">`)
htmlString = htmlString.replace(/<td/g, `<td class="td"`)
	htmlString = htmlString.replace(/<hr>|<hr\/>|<hr \/>/g, `<hr class="hr">`)

		// #ifndef APP-NVUE
		return htmlString
		// #endif
		
		// 将htmlString转成htmlArray，反之使用rich-text解析
		// #ifdef APP-NVUE
	return parseHtml(htmlString)
		// #endif
	}
	
// 复制代码
const handleItemClick = (e) => {
	let {attrs} = e.detail.node
let {"code-data-index":codeDataIndex,"class":className} = attrs
	if(className == 'copy-btn'){
	uni.setClipboardData({
		data: copyCodeData[codeDataIndex],showToast: false,
		success() {
			uni.showToast({
				title: '复制成功',icon: 'none'
				});
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
.ua__markdown {
	  font-size: 14px;line-height: 1.5;
	  h1,h2,h3,h4,h5,h6 {
	       font-family: inherit;font-weight: 500;line-height: 1.1;color: inherit;
	    }
	  h1,h2,h3 {margin-top: 20px;margin-bottom: 10px}
	   h4,h5,h6 {margin-top: 10px;margin-bottom: 10px}
	    .h1,h1 {font-size: 36px
	    }
	   .h2,h2 {font-size: 30px
	    }
	  .h3,h3 {font-size: 24px
	    }
	  .h4,h4 {font-size: 18px
	    }
	    .h5,h5 {font-size: 14px
	    }
	  .h6,h6 {font-size: 12px
	    }
	 a {
	     background-color: transparent;color: #2196f3;
	        text-decoration: none;
	    }
	 hr, ::v-deep .hr {
	   margin-top: 20px;margin-bottom: 20px; border: 0; border-top: 1px solid #e5e5e5;
	    }
	    img { max-width: 35%;
	    }
	  p {margin: 0 0 10px}
	  em {
	      font-style: italic; font-weight: inherit;
	    }
	 ol,ul {
	        margin-top: 0; margin-bottom: 10px;padding-left: 40px;
	    }
	  ol ol,ol ul,ul ol,ul ul {margin-bottom: 0;
	    }
	ol ol, ul ol {list-style-type: lower-roman;
	    }
	   ol ol ol, ul ul ol {list-style-type: lower-alpha;
	    }
	 dl {
	    margin-top: 0;margin-bottom: 20px;
	    }
	  dt {font-weight: 600;
	    }
	dt, dd {line-height: 1.4;
	    }
	 .task-list-item { list-style-type: none;
	    }
	 .task-list-item input {
	        margin: 0 .2em .25em -1.6em;vertical-align: middle;
	    }
	    pre {
	       position: relative; z-index: 11;
	    }
	    code,kbd,pre,samp { font-family: Menlo,Monaco,Consolas,"Courier New",monospace;}
	    code:not(.hljs) {
	    padding: 2px 4px;font-size: 90%;color: #c7254e;background-color: #ffe7ee;border-radius: 4px;
	    }
code:empty {display: none;
		}
	  pre code.hljs {
	      color: var(--vg__text-1); border-radius: 16px; background: var(--vg__bg-1);font-size: 12px;
	    }
.markdown-wrap {
			font-size: 12px;margin-bottom: 10px;
		}
	    pre.code-block-wrapper {background: #2b2b2b;color: #f8f8f2;border-radius: 4px;overflow-x: auto;
	        padding: 1em;
	        position: relative;
	    }
	   pre.code-block-wrapper code {
	        padding: auto;
	        font-size: inherit;
	        color: inherit;
	        background-color: inherit;
	        border-radius: 0;
	    }
	    .code-block-header__copy {
	        font-size: 16px;margin-left: 5px;
	    }
	 abbr[data-original-title],abbr[title] {
	        cursor: help;border-bottom: 1px dotted #777;
	    }
	    blockquote {
	     padding: 10px 20px;margin: 0 0 20px;font-size: 17.5px;
	        border-left: 5px solid #e5e5e5;
	    }
	 blockquote ol:last-child,blockquote p:last-child,blockquote ul:last-child {
	        margin-bottom: 0
	    }
	blockquote .small,blockquote footer,blockquote small {
	      display: block;font-size: 80%;line-height: 1.42857143;color: #777
	    }
	  blockquote .small:before,blockquote footer:before,blockquote small:before {
	        content: '\2014 \00A0'
	    }
	    .blockquote-reverse,blockquote.pull-right {
	        padding-right: 15px; padding-left: 0;
	     text-align: right;border-right: 5px solid #eee;border-left: 0
	    }
	  .blockquote-reverse .small:before,.blockquote-reverse footer:before,.blockquote-reverse small:before,blockquote.pull-right .small:before,blockquote.pull-right footer:before,blockquote.pull-right small:before {
	        content: ''
	    }
	  .blockquote-reverse .small:after,.blockquote-reverse footer:after,.blockquote-reverse small:after,blockquote.pull-right .small:after,blockquote.pull-right footer:after,blockquote.pull-right small:after {
	        content: '\00A0 \2014'
	    }
	   .footnotes {
	      -moz-column-count: 2;
	        -webkit-column-count: 2;
	     column-count: 2
	    }
	    .footnotes-list {padding-left: 2em}
	   table, ::v-deep .table {
	    border-spacing: 0;border-collapse: collapse; width: 100%;max-width: 65em; overflow: auto;margin-top: 0;
	        margin-bottom: 16px;
	    }
	  table tr, ::v-deep .table .tr {
	   border-top: 1px solid #e5e5e5;
	    }
	    table th, table td, ::v-deep .table .th, ::v-deep .table .td {
	  padding: 6px 13px;border: 1px solid #e5e5e5;
	    }
	    table th, ::v-deep .table .th {
	      font-weight: 600;background-color: #eee;
	    }
	    .hljs[class*=language-]:before {
	    position: absolute; z-index: 3;top: .8em; right: 1em; font-size: .8em; color: #999;
	    }
	    .hljs[class~=language-js]:before {
     content: "js"
    }
    .hljs[class~=language-ts]:before {
        content: "ts"
    }
    .hljs[class~=language-html]:before {
        content: "html"
}
.hljs[class~=language-md]:before {
    content: "md"
}
.hljs[class~=language-vue]:before {
    content: "vue"
}
.hljs[class~=language-css]:before {
    content: "css"
}
    .hljs[class~=language-sass]:before {
        content: "sass"
    }
    .hljs[class~=language-scss]:before {
        content: "scss"
    }
.hljs[class~=language-less]:before {
    content: "less"
}
    .hljs[class~=language-stylus]:before {
        content: "stylus"
    }
    .hljs[class~=language-go]:before {
        content: "go"
    }
    .hljs[class~=language-java]:before {
    content: "java"
}
.hljs[class~=language-c]:before {
    content: "c"
}
.hljs[class~=language-sh]:before {
    content: "sh"
}
    .hljs[class~=language-yaml]:before {
        content: "yaml"
}
    .hljs[class~=language-py]:before {
        content: "py"
}
.hljs[class~=language-docker]:before {
    content: "docker"
}
.hljs[class~=language-dockerfile]:before {
    content: "dockerfile"
	}
	.hljs[class~=language-makefile]:before {
	    content: "makefile"
}
.hljs[class~=language-javascript]:before {
    content: "js"
}
.hljs[class~=language-typescript]:before {
        content: "ts"
    }
    .hljs[class~=language-markup]:before {
        content: "html"
}
.hljs[class~=language-markdown]:before {
    content: "md"
}
    .hljs[class~=language-json]:before {
        content: "json"
    }
    .hljs[class~=language-ruby]:before {
        content: "rb"
    }
	    .hljs[class~=language-python]:before {
	        content: "py"
	    }
    .hljs[class~=language-bash]:before {
        content: "sh"
    }
    .hljs[class~=language-php]:before {
        content: "php"
    }
	}
</style>
