<template>
    <div class="container">
        <div class="header">
            <div class="tabs">
                <div class="tab"></div>
                <div class="tab"
                    v-for="tab in tabs"
                    :key="tab.title"
                    :class="[tab.activated?'activated':'']"
                    @click="selectTab(tab)">
                    <div class="tab-icon">
                        <span class="icon" :class="[tab.icon]"></span>
                    </div>
                    <div class="tab-title">{{tab.title}}</div>
                </div>
                <div class="tab"></div>
            </div>
        </div>
        <div class="content">
            <div class="tab-page" v-show="tabPageIndex === 0">
                <div class="preference-panel">
                    <div class="preference-item">
                        <div class="preference-item-key">
                            <span>文件存放目录</span>
                        </div>
                        <div class="preference-item-setting">
                            <span class="icon icon-shuffle" @click="selectSaveDir('storedir')"></span>
                            <input type="text" class="form-control" placeholder="请选择文件存放目录" readonly
                                :value="setting.sys.storedir"/>
                        </div>
                    </div>
                    <div class="preference-item">
                        <div class="preference-item-key">
                            <span>Git安装目录</span>
                        </div>
                        <div class="preference-item-setting">
                            <span class="icon icon-flow-cascade" @click="selectSaveDir('gitdir')"></span>
                            <input type="text" class="form-control" placeholder="请选择Git安装目录" readonly
                                :value="setting.sys.gitdir"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-page" v-show="tabPageIndex === 1">
            </div>
            <div class="tab-page" v-show="tabPageIndex === 2">
            </div>
        </div>
        <div class="footer">
            <div class="space"></div>
            <div class="close" 
                 @click="close">
                <span>关闭</span>
            </div>
        </div>
    </div>
</template>
<script>
const remote = require('electron').remote
const dialog = remote.dialog
const app = remote.app

export default{
  name: 'Setting',
  props: [],
  data () {
    return {
      tabs: [{
        icon: 'icon-cog',
        activated: false,
        title: '系统'
      }, {
        icon: 'icon-eye',
        activated: true,
        title: '外观'
      }, {
        icon: 'icon-tools',
        activated: false,
        title: '编辑器'
      }],
      tabPageIndex: 0,
      setting: {
        sys: {
          storedir: undefined,
          gitdir: undefined
        }
      }
    }
  },
  methods: {
    close (e) {
      this.$emit('close')
    },
    selectTab (tab) {
      this.tabs.forEach((t, i) => {
        if (t === tab) {
          t.activated = true
          this.tabPageIndex = i
        } else {
          t.activated = false
        }
      })
    },
    selectSaveDir (key) {
      let apppath = app.getAppPath()
      let index = apppath.indexOf('node_modules')
      let dirpath = apppath.substring(0, index)
      let paths = dialog.showOpenDialog({
        properties: ['openDirectory'],
        title: '请选择文件存放目录',
        defaultPath: dirpath
      })
      if (paths) {
        this.setting.sys[key] = paths.shift()
      }
    }
  },
  computed: {

  }
}
</script>
<style lang="scss" scoped>
    .container{
        width: 100%;
        height: 100%;
        display: flex;
        box-sizing: border-box;
        justify-content:center;
        align-items: center;
        flex-direction: column;
    }
    .header{
        height: 12%;
        width: 100%;
        flex: none
    }
    .tabs{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        justify-content:center;
        align-items: flex-end;
        flex-direction: row;
        display: flex;
        background-color: gainsboro;
        .tab{
            flex:1;
            text-align: center;
            margin: 1px;
            &:active{
                background:  rgba(175, 175, 175, .2)
            }

            &.activated{
                border-bottom: 2px solid goldenrod;
                color:goldenrod
            }

            .tab-icon{
                font-size: 1.5em
            }
        }
    }
    .content{
        flex:1;
        width: 100%
    }
    .footer{
        height: 10%;
        width: 100%;
        flex: none;
        text-align: center;
        box-sizing: border-box;
        justify-content:center;
        align-items: center;
        flex-direction: row;
        display: flex;

        .space{
            flex: 1;
        }
        .close{
            margin: 0 0.5em 0.5em 0;
            padding: 0.5em;
            width: 10%;
            &:active{
                background: gainsboro
            }
        }
    }
</style>
