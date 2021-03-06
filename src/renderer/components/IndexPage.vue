<template>
  <ph-window>
    <ph-window-content>
      <ph-pane-group @mousedown.native="onMouseDown">
        <ph-pane id="sidebar" size="sm" style="position: relative; max-width:35%" sidebar>
          <div style="overflow-y: auto;height: calc(100% - 20.8px);">
            <ph-nav-group>
              <h5 class="nav-group-title">Favorites</h5>
              <Favorites :model='model' :key="model.name" :selected='selectedFavorite' @selectedFavoriteEvent='onSelectedFavorite' v-for='model in favorites'>
              </Favorites>
            </ph-nav-group>
            <ph-nav-group>
              <h5 class="nav-group-title">Folders</h5>
              <Folders 
                :model='model' 
                :key="model.name" 
                :selected='selectedFolder'
                :expandLevel='expandLevel'
                @selectedFolderEvent='onSelectedFolder' 
                v-for='model in folders'>
              </Folders>
            </ph-nav-group>
            <ph-nav-group>
              <h5 class="nav-group-title">Tags</h5>
              <Tags :model='model' :key="model.name" :selected='selectedTag' @selectedTagEvent='onSelectedTag' v-for='model in tags'>
              </Tags>
            </ph-nav-group>
          </div>
          <div style="position: relative;left: 0;bottom: 0;width: 100%;padding: 0 10px">
            <span class="icon icon-plus"></span>
            <span class="icon icon-switch pull-right"></span>
          </div>
        </ph-pane>
        <div class="resizer"></div>
        <ph-pane size="sm" style="max-width:35%">
          <snippet-list :filter="{type:'F',keyword:'X'}"></snippet-list>
        </ph-pane>
        <div class="resizer"></div>
        <ph-pane id="codePane" style="overflow:hidden">
          <snippet-editor :snippet="snippet"></snippet-editor>
        </ph-pane>
      </ph-pane-group>
    </ph-window-content>
    <modal name="settingWindow"  
           :width="'40%'"
           :height="'60%'">
      <SettingPage @close="onCloseSettingPage"></SettingPage>
    </modal>
    <v-dialog/>
  </ph-window>
</template>

<script>
import Folders from './IndexPage/Folders.vue'
import Tags from './IndexPage/Tags.vue'
import Favorites from './IndexPage/Favorites.vue'
import SnippetList from './IndexPage/SnippetList'
import SnippetEditor from './IndexPage/SnippetEditor'
import SettingPage from '@/components/SettingPage'
import { ipcRenderer } from 'electron'
import folderOpt from '../opts/folderOpt'
import tagOpt from '../opts/tagOpt'
import favoriteOpt from '../opts/favoriteOpt'

export default {
  components: {
    SnippetEditor,
    SnippetList,
    Folders,
    Tags,
    Favorites,
    SettingPage
  },
  created () {
    ipcRenderer.on('action', (event, arg) => {
      switch (arg) {
        case 'setting': // 新建文件
          this.$modal.show('settingWindow')
          break
        default:
          console.log(event)
      }
    })

    // 初始化操作
    folderOpt.initLoad(f => {
      this.folders = [f]
    })
    tagOpt.initLoad(tags => {
      this.tags = tags
    })
    favoriteOpt.initLoad(favorites => {
      this.favorites = favorites
    })
  },
  data () {
    return {
      selectedFolder: undefined,
      folders: [],
      expandLevel: 2,
      selectedTag: undefined,
      tags: [],
      selectedFavorite: undefined,
      favorites: [],
      snippet: {
        id: '1234567',
        title: 'HttpClient Warpper',
        lang: 'java',
        createdTime: '2017-07-02',
        isLocked: false,
        labels: [{ name: 'Java' }, { name: '配置' }],
        fragments: [
          { name: 'html', isSelected: true },
          { name: 'css', isSelected: false },
          { name: 'js', isSelected: false }
        ],
        notes: '用于http的请求包装的处理',
        code: `public enum ResultStatus{
            OK(0x0,"成功"),
            ERROR(0x1,"失败，未知错误"),
            MISS_PARAM(0x2,"缺少参数"),
            PARAM_ERROR(0x3,"参数错误"),
            BUSINESS_FAILURE(0x4,"业务处理失败"),
            CANCEL_REGISTER_OVERTIME(0x5,"就诊时间已过，无法取消预约挂号");

            private Integer code;

            private String message;

            private ResultStatus(Integer code, String message) {
                this.code = code;
                this.message = message;
            }
        }`
      }
    }
  },
  methods: {
    onSelectedFolder (name) {
      this.selectedFavorite = null
      this.selectedTag = null
      this.selectedFolder = name
    },
    onSelectedFavorite (name) {
      this.selectedTag = null
      this.selectedFolder = null
      this.selectedFavorite = name
    },
    onSelectedTag (name) {
      this.selectedFavorite = null
      this.selectedFolder = null
      this.selectedTag = name
    },
    onCloseSettingPage (setting) {
      folderOpt.settingInitLoad(setting, f => {
        this.folders = [f]
        this.selectedFolder = f
      })
      this.$modal.hide('settingWindow')
    },
    onMouseDown ({ target: resizer, pageX: initialPageX, pageY: initialPageY }) {
      if (resizer.className && resizer.className.match('resizer')) {
        let self = this
        let { $el: container } = self

        let pane = resizer.previousElementSibling
        let { offsetWidth: initialPaneWidth } = pane

        let usePercentage = !!(pane.style.width + '').match('%')

        const { addEventListener, removeEventListener } = window

        const resize = (initialSize, offset = 0) => {
          let containerWidth = container.clientWidth
          let paneWidth = initialSize + offset

          return (pane.style.width = usePercentage
            ? paneWidth / containerWidth * 100 + '%'
            : paneWidth + 'px')
        }

        // This adds is-resizing class to container
        self.isResizing = true

        // Resize once to get current computed size
        let size = resize()

        // Trigger paneResizeStart event
        self.$emit('paneResizeStart', pane, resizer, size)

        const onMouseMove = function ({ pageX, pageY }) {
          size = resize(initialPaneWidth, pageX - initialPageX)

          self.$emit('paneResize', pane, resizer, size)
        }

        const onMouseUp = function () {
          // Run resize one more time to set computed width/height.
          size = resize(pane.clientWidth)

          // This removes is-resizing class to container
          self.isResizing = false

          removeEventListener('mousemove', onMouseMove)
          removeEventListener('mouseup', onMouseUp)

          self.$emit('paneResizeStop', pane, resizer, size)
        }

        addEventListener('mousemove', onMouseMove)
        addEventListener('mouseup', onMouseUp)
      }
    }
  },
  computed: {}
}
</script>

<style>
@import "/static/css/photon.css";

.form-control {
  width: auto;
  padding-right: 0;
  border: 0;
  border-radius: 0;
}
.form-control:focus {
  border-color: inherit;
  box-shadow: none;
}

.resizer {
  box-sizing: border-box;
  background: #000;
  opacity: 0.2;
  z-index: 1;
  background-clip: padding-box;
  width: 10px;
  height: 100%;
  margin-left: -5px;
  margin-right: -5px;
  border-left: 5px solid rgba(255, 255, 255, 0);
  border-right: 5px solid rgba(255, 255, 255, 0);
  cursor: col-resize;
}

::-webkit-scrollbar {
  width: 5px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  height: 10px;
  background: #dcdcdc;
  cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background: #dcdcdc;
  cursor: pointer;
}
</style>
