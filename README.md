# electron-snippets（开发中）

> 基于vue-electron 开发的代码片段管理器

## 知识点记录

### vue

```js
//事件绑定方法名，则默认传递的参数为event，即当前触发事件
@click.native=doClick
//事件绑定方法调用，传递自定义自定的参数
@click.native=doClick(x.id)
//满足上述两者需求
@click.native=doClick(x.id,$event)
```

### electron

#### 主进程同渲染进程通讯

```js
// 主进程发送消息
mainWindow.webContents.send('action', 'setting')

// 渲染进程接收消息
import { ipcRenderer } from 'electron'

ipcRenderer.on('action', (event, arg) => {
  switch (arg) {
    case 'setting': // 新建文件
      console.log(event)
  }
})
```


#### 顶部菜单(主进程)

```js
// 原有菜单基础上添加子菜单
let appMenu = Menu.getApplicationMenu()
let setting = new MenuItem({
    type: 'normal',
    label: 'Setting',
    click: (menuItem, browserWindow, event) => {
        // 发送消息到渲染进程
        mainWindow.webContents.send('action', 'setting')
    }
})
appMenu.items[0].submenu.append(setting)

// 根据template构建所有的菜单，template需要符合约定json格式
var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
```

#### 右键菜单(渲染进程)

remote 模块负责在渲染进程（网页）和主进程之间进行进程间通讯（IPC）

```js
const remote = require('electron').remote
const Menu = remote.Menu
const MenuItem = remote.MenuItem

var menu = new Menu()
menu.append(new MenuItem({ label: 'MenuItem1', click: function () { alert('zqz click  item 1') } }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

window.addEventListener('contextmenu', function (e) {
  e.preventDefault()
  menu.popup(remote.getCurrentWindow())
}, false)
```

#### 打开文件选择框

```js
const remote = require('electron').remote
const dialog = remote.dialog
let paths = dialog.showOpenDialog({
    properties: ['openDirectory'],
    title: '请选择文件存放目录',
    defaultPath: dirpath
})
```
#### 获取剪切板内容

> [clipboard-apis](https://www.w3.org/TR/clipboard-apis/)

```js
let clip = require('electron').clipboard
// 读取
clip.readText()
// 写入
clip.writeText(text)
```

#### 读取和保存配置文件

> [nconf](https://github.com/indexzero/nconf) 封装了json的读取保存到磁盘


## 组件

### 右键菜单

- 主进程构建Menu，进行popup展示

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


### 分隔拖拉改变大小

- [vue-split-pane][4]

    针对还没有写好布局的可以直接套用，已经写好了的套用上去会有些需要修改的地方，左右分隔面板嵌套使用起来不怎么方便

- [vue-multipane][5] ❤

    基于Flex的方式，使用相对简单；核心代码都在multipane.js的 onMouseDown；原布局已经写好，不像修改成该组件的形式，而且本身也是使用flex，所以直接针对onMouseDown的代码做了部分修改实现；


## 类库

- [dateformat](https://github.com/felixge/node-dateformat)

## 问题

1. Cannot read property '$refs' of undefined
    > 应该是refs引用的id对应的组件，需要写在调用$refs的组件之前
2. Uncaught TypeError: Cannot assign to read only property 'exports' of obj
    > config.js原先使用`module.exports` 修改为`export default`即可，查询网上资料说是webpack引起的


## 参考

1. [Electron 中文文档](https://www.w3cschool.cn/electronmanual/)
---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[de85f81](https://github.com/SimulatedGREG/electron-vue/tree/de85f81890c01500113738bfe57bef136f9fbf52) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

[0]: https://github.com/vmaimone/vue-context-menu "vue-context-menu"
[1]: https://github.com/XBT1/v-contextmenu/blob/master/docs/usage.md "v-contextmenu"

[2]: https://github.com/euvl/vue-js-modal "vue-js-modal"
[3]: https://github.com/adeptoas/sweet-modal-vue "sweet-modal-vue"

[4]: https://github.com/PanJiaChen/vue-split-pane "vue-split-pane"
[5]: https://github.com/yansern/vue-multipane "vue-multipane"