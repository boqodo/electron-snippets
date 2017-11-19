<template>
    <ph-window>
        <header class="toolbar toolbar-header">
            <h1 class="title">Photon</h1>
        </header>
        <ph-window-content>
            <ph-pane-group>
                <ph-pane id="sidebar" size="sm" style="position: relative" sidebar=true>
                    <div style="overflow-y: auto;height: calc(100% - 20.8px);">
                        <ph-nav-group>
                            <h5 class="nav-group-title">Favorites</h5>
                            <Favorites
                                :model='model'
                                :key="model.name"
                                :selected='selectedFavorite'
                                @selectedFavoriteEvent = 'onSelectedFavorite'
                                v-for='model in favorites'>
                            </Favorites>
                        </ph-nav-group>
                        <ph-nav-group>
                            <h5 class="nav-group-title">Folders</h5>
                            <Folders
                                :model='model'
                                :key="model.name"
                                :selected='selectedFolder'
                                @selectedFolderEvent = 'onSelectedFolder'
                                v-for='model in folders'>
                            </Folders>
                        </ph-nav-group>
                        <ph-nav-group>
                            <h5 class="nav-group-title">Tags</h5>
                            <Tags :model='model'
                                  :key="model.name"
                                  :selected='selectedTag'
                                  @selectedTagEvent='onSelectedTag'
                                  v-for='model in tags'>
                            </Tags>
                        </ph-nav-group>
                    </div>


                    <div style="position: relative;left: 0;bottom: 0;width: 100%;padding: 0 10px">
                        <span class="icon icon-plus"></span>
                        <span class="icon icon-switch pull-right"></span>
                    </div>
                </ph-pane>
                <ph-pane size="sm" style="resize: horizontal;">
                    <snippet-list :filter="{type:'F',keyword:'X'}"></snippet-list>
                </ph-pane>
                <ph-pane id="codePane" style="overflow:hidden">
                  <snippet-editor :snippet="snippet"></snippet-editor>
                </ph-pane>

            </ph-pane-group>
        </ph-window-content>

    </ph-window>
</template>
<script>
  import Folders from './IndexPage/Folders.vue'
  import Tags from './IndexPage/Tags.vue'
  import Favorites from './IndexPage/Favorites.vue'
  import SnippetList from './IndexPage/SnippetList'
  import SnippetEditor from './IndexPage/SnippetEditor'

export default {
    components: {
      SnippetEditor,
      SnippetList,
      Folders,
      Tags,
      Favorites
    },
    data () {
      return {
        selectedFolder: undefined,
        folders: [{
          name: 'Server',
          isExpand: true,
          level: 1,
          items: [{
            name: 'ngix',
            level: 2,
            isExpand: true,
            items: [{
              name: 'config',
              level: 3,
              items: null
            }]
          }]
        },
        {
          name: 'Html',
          isExpand: false,
          level: 1,
          items: null
        },
        {
          name: 'Java',
          isExpand: false,
          level: 1,
          items: [{
            name: 'Spring',
            level: 2,
            isExpand: false
          }]
        }],
        selectedTag: undefined,
        tags: [{
          name: '重要',
          color: 'red'
        },
        {
          name: '次要',
          color: 'green'
        },
        {
          name: '主流',
          color: 'black'
        }],
        selectedFavorite: undefined,
        favorites: [{
          name: '全部',
          icon: 'icon-home'
        }],
        snippet: {
          id: '1234567',
          title: 'HttpClient Warpper',
          lang: 'java',
          createdTime: '2017-07-02',
          isLocked: false,
          labels: [{name: 'Java'}, {name: '配置'}],
          fragments: [{name: 'html', isSelected: true}, {name: 'css', isSelected: false}, {name: 'js', isSelected: false}],
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
      }
    },
    computed: {
    }
  }
</script>
<style>
    @import "/static/css/photon.css";

    .form-control{
        width:auto;
        padding-right: 0;
        border: 0;
        border-radius: 0;
    }
    .form-control:focus {
        border-color:inherit;
        box-shadow: none;
    }

    ::-webkit-scrollbar{width:5px;height:6px ; }

    ::-webkit-scrollbar-thumb{height:10px;background:#dcdcdc;cursor:pointer;}

    ::-webkit-scrollbar-thumb:hover{background:#dcdcdc ; cursor:pointer}
</style>
