<template>
  <div style="width: 100%;height: 100%;">
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="add">新增片段</v-contextmenu-item>
      <v-contextmenu-item @click="addFromClip">从粘贴板新增片段</v-contextmenu-item>
      <v-contextmenu-item divider></v-contextmenu-item>
      <v-contextmenu-item @click="deleteSnippet" v-show="rightClickSnippetId">删除</v-contextmenu-item>
      <v-contextmenu-item>
        <ph-icon icon="cancel-squared" text v-show="rightClickSnippetId">重命名</ph-icon>
      </v-contextmenu-item>
      <v-contextmenu-submenu title="语言" v-show="rightClickSnippetId">
        <v-contextmenu-item>text</v-contextmenu-item>
        <v-contextmenu-item>java</v-contextmenu-item>
        <v-contextmenu-item>c++</v-contextmenu-item>
        <v-contextmenu-item>javascript</v-contextmenu-item>
        <v-contextmenu-item>python</v-contextmenu-item>
        <v-contextmenu-item>ruby</v-contextmenu-item>
      </v-contextmenu-submenu>
      <v-contextmenu-item divider v-show="rightClickSnippetId"></v-contextmenu-item>
      <v-contextmenu-submenu title="排序">
        <v-contextmenu-item >创建时间</v-contextmenu-item>
        <v-contextmenu-item >语言</v-contextmenu-item>
        <v-contextmenu-item >标题</v-contextmenu-item>
        <v-contextmenu-item divider></v-contextmenu-item>
        <v-contextmenu-item >
          <ph-icon icon="check" text>升序</ph-icon>
        </v-contextmenu-item>
        <v-contextmenu-item >降序</v-contextmenu-item>
      </v-contextmenu-submenu>
    </v-contextmenu>
    <div class="head-search">
      <input class="form-control"
             type="text"
             v-model="keyword"
             placeholder="请输入关键字搜索"/>
      <ph-icon
        icon="plus"
        title="新增代码片段"
        @click.native="add()"></ph-icon>
    </div>
    <ph-list-group class="list-group-area" 
      @contextmenu.native.self="rightClickSnippetId = null"
      v-contextmenu:contextmenu>
      <ph-list-group-item
        :key="snippet.id"
        :class="[snippet.isSelected ? 'list-item-selected' : '']"
        v-for="snippet in snippetsList"
        @click.native="selected(snippet.id)"
        @contextmenu.native="recordRightClickSnippet(snippet.id,$event)"
        >
        <div class="media-body"
             :class="[snippet.isLocked ? 'list-item-locked': '']">
          <h5><strong>{{snippet.title}}</strong></h5>
          <div>
            <span>{{snippet.lang}}</span>
            <span class="pull-right">{{snippet.createdTime}}</span>
          </div>
        </div>
      </ph-list-group-item>
    </ph-list-group>
  </div>
</template>
<script>
import helper from '../../../helper.js'
import dateformat from 'dateformat'
export default{
  name: 'SnippetList',
  components: { },
  props: ['filter'],
  created () {
    let s = {
      id: '1234567',
      title: 'HttpClient Warpper',
      lang: 'java',
      createdTime: '2017-07-02',
      isLocked: false,
      isSelected: false
    }
    this.snippets.push(s)
    let x = {
      id: '789456',
      title: 'Spring config',
      lang: 'java',
      createdTime: '2017-07-03',
      isLocked: true,
      isSelected: false
    }
    this.snippets.push(x)
  },
  data () {
    return {
      snippets: [],
      keyword: null,
      rightClickSnippetId: null
    }
  },
  methods: {
    factory () {
      let a = {
        id: new Date().getTime(),
        title: 'undefind' + parseInt(Math.random() * 100),
        lang: 'text',
        createdTime: dateformat(new Date(), 'yyyy-mm-dd'),
        isLocked: false,
        isSelected: false
      }
      return a
    },
    add () {
      this.snippets.push(this.factory())
    },
    addFromClip () {
      let a = this.factory()
      let text = helper.readTextFromClip()
      a.code = text
      this.snippets.push(a)
    },
    selected (id) {
      let len = this.snippets.length
      for (let i = 0; i < len; i++) {
        let s = this.snippets[i]
        if (s.id === id) {
          s.isSelected = true
        } else {
          s.isSelected = false
        }
      }
    },
    deleteSnippet (vm, event) {
      if (this.rightClickSnippetId) {
        this.snippets = this.snippets.filter(i => i.id !== this.rightClickSnippetId)
      }
    },
    recordRightClickSnippet (id, event) {
      this.rightClickSnippetId = id
    }
  },
  computed: {
    snippetsList () {
      let filter = this.filter
      if (filter) {
        // 加载指定分类
      }
      let k = this.keyword
      if (k) {
        return this.snippets.filter(i => i.title.toLocaleLowerCase().indexOf(k.toLocaleLowerCase()) > -1)
      } else {
        return this.snippets
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .head-search {
    height: 39.2px;
    width: 100%;
    border-bottom: 1px solid #eaeaea;

    input {
      width: calc(100% - 30px);
      height: 100%;
    }
    span {
      font-size: 18px;
      height: 100%;
      margin: 0 5px;
      vertical-align: middle;
    }
  }

  .list-group-area {
    overflow-y: auto;
    height: calc(100% - 39.2px);

    .list-item-locked {
      opacity: 0.5;
    }
    .list-item-selected {
      background-color: #cececd;
    }
    .list-group-item:active {
      background-color: #f5f5f4;
    }
  }

  .v-contextmenu-item .icon::before{
    padding-right: 0.3em;
  }


</style>
