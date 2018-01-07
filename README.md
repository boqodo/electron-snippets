# electron-snippets

> code sinppet demo

## 待补充



## 知识点记录


```js
//事件绑定方法名，则默认传递的参数为event，即当前触发事件
@click.native=doClick
//事件绑定方法调用，传递自定义自定的参数
@click.native=doClick(x.id)
//满足上述两者需求
@click.native=doClick(x.id,$event)
```

1. 获取剪切板内容

let clip = require('electron').clipboard
clip.readText()

[clipboard-apis](https://www.w3.org/TR/clipboard-apis/)


## 组件

### 右键菜单

- [vue-context-menu][0]

    组件右键无效,@contextmenu.prevent 需要修改为@contextmenu.prevent.native
    prevent 是调用 event.preventDefault() 即取消事件的默认动作

- [v-contextmenu][1] ❤

    - 支持菜单分组
    - 支持分割线
    - 支持多级子菜单
    
    右键菜单监听在指定的区域内，无法指定到具体的某个组件，所以需要解决右键点击时是具体在哪个组件上触发，目前解决方式是在组件上添加 contextmenu.native事件监听记录数据，再触发菜单内的事件时取记录的数据进行逻辑处理

### 弹出框

- [vue-js-modal][2] ❤

- [sweet-modal-vue][3]

## 问题

1. Cannot read property '$refs' of undefined
    > 应该是refs引用的id对应的组件，需要写在调用$refs的组件之前

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[de85f81](https://github.com/SimulatedGREG/electron-vue/tree/de85f81890c01500113738bfe57bef136f9fbf52) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

[0]: https://github.com/vmaimone/vue-context-menu "vue-context-menu"
[1]: https://github.com/XBT1/v-contextmenu/blob/master/docs/usage.md "v-contextmenu"

[2]: https://github.com/euvl/vue-js-modal "vue-js-modal"
[3]: https://github.com/adeptoas/sweet-modal-vue "sweet-modal-vue"