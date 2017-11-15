<template>
  <div style="width: 100%;height: 100%">
    <div class="split-underline head-bar">
      <ph-toolbar-actions>
        <input
          class="form-control"
          type="text"
          placeholder="请输入代码片段标题"
          v-model="snippet.title">

        <div class="button-group">
          <ph-icon icon="doc-text"></ph-icon>
          <ph-icon icon="share"></ph-icon>
          <ph-icon icon="plus-circled"></ph-icon>
        </div>
      </ph-toolbar-actions>

      <ph-toolbar-actions
        class="head-tags"
        v-show="hasTags">
        <span
          :key ="tag.name"
          v-for="tag in snippet.tags">{{tag.name}}</span>
      </ph-toolbar-actions>
    </div>
    <ph-tab-group v-show="hasFragments">
      <ph-tab-item
        :key ="fragment.name"
        v-for="fragment in snippet.fragments">{{fragment.name}}</ph-tab-item>
      <ph-tab-item fixed=true  icon="plus"></ph-tab-item>
    </ph-tab-group>

    <textarea
      class="form-control snippet-notes"
      placeholder="请输入代码片段说明"
      rows="1"
      v-model="snippet.notes"
      v-show="hasNotes"></textarea>
    <MonacoEditor
      language="java"
      :code="snippet.code"
      @mounted="onMounted"
      @codeChange="onCodeChange"
      theme="vs"
      id="editor">
    </MonacoEditor>
    <div class="foot-bar">
      <span>Java</span>
      <span style="text-align: center" class="icon icon-lock-open"></span>
      <span style="text-align: right" class="icon">Line 13,Column 15</span>
    </div>
  </div>
</template>
<script>
  import MonacoEditor from './Monaco.vue'

  export default{
    name: 'SnippetEditor',
    components: {
      MonacoEditor
    },
    props: ['snippet'],
    data () {
      return {}
    },
    methods: {

    },
    computed: {
      hasTags () {
        const s = this.snippet
        return s.tags && s.tags.length > 0
      },
      hasFragments () {
        const s = this.snippet
        return s.fragments && s.fragments.length > 0
      },
      hasNotes () {
        const s = this.snippet
        return s.notes && s.notes.length > 0
      }
    }
  }
</script>
<style lang="scss">
  .split-underline{
    border-bottom: 1px solid #f0f0f0
  }
  .head-bar {

    padding-bottom: 6px;
    //margin-top: -3px;

    input{
      width:calc(100% - 100px);
    }

    .button-group{
      display: flex;
      width: 100px;
      padding: 5px 10px;
      float: right;

      span{
        flex:1;
        text-align: center;
        vertical-align: middle;
      }
    }

    .head-tags{
      padding-left: 10px;
      span{
        border:1px solid gainsboro;
        padding: 3px 5px;
        margin-left: 3px;
        background-color: #f5f5f4;
        color:#a4a4a5;
      }

    }
  }

  .snippet-notes{
    width: 100%;
    border-bottom: 1px solid gainsboro;
    resize:none;

    &:focus{
      border-color:gainsboro;
      box-shadow: none;
    }
  }


  .tab-group {
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
  }

  .tab-item {
    border-left: 1px solid #d6d6d6;
    background-color: #f5f5f4;
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f5f5f4), color-stop(100%, #f5f5f4));
    background-image: -webkit-linear-gradient(top, #f5f5f4 0%, #f5f5f4 100%);
    background-image: linear-gradient(to bottom, #f5f5f4 0%, #f5f5f4 100%);
  }
  .tab-item.active {
    background-color: #d4d2d4;
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #d4d2d4), color-stop(100%, #cccacc));
    background-image: -webkit-linear-gradient(top, #d4d2d4 0%, #cccacc 100%);
    background-image: linear-gradient(to bottom, #d4d2d4 0%, #cccacc 100%);
  }
  .tab-item .icon-close-tab {
    color: #666;
  }


  .foot-bar{
    position: absolute;
    left: 0;bottom: 0;
    width: 100%;
    padding: 0 10px;
    background-color: #f5f5f4;
    display: flex;

    span{
      flex:1
    }
  }
</style>
