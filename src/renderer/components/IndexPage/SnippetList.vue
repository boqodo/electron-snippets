<template>
  <div style="width: 100%;height: 100%;">
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
    <ph-list-group class="list-group-area">
      <ph-list-group-item
        :key="snippet.id"
        :class="[snippet.isSelected ? 'list-item-selected' : '']"
        v-for="snippet in snippetsList"
        @click.native="selected(snippet.id)">
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
  export default{
    name: 'SnippetList',
    props: ['filter'],
    created () {
      console.log(this.filter)
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
        keyword: null
      }
    },
    methods: {
      add () {
        let a = {
          id: new Date().getTime(),
          title: 'undefind' + parseInt(Math.random() * 100),
          lang: 'text',
          createdTime: '2017-11-11',
          isLocked: false,
          isSelected: false
        }
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
<style lang="scss">
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


</style>
