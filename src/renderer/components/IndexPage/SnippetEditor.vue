<template>
  <div class="snippet-editor-panel">
    <div class="split-underline head-bar">
      <ph-toolbar-actions>
        <input
          class="form-control snippet-title"
          type="text"
          placeholder="请输入代码片段标题"
          :disabled="snippet.isLocked"
          v-model="snippet.title">

        <div class="button-group">
          <ph-icon icon="doc-text" @click.native="copy2Clip"></ph-icon>
          <ph-icon icon="share"></ph-icon>
          <ph-icon icon="plus-circled"></ph-icon>
        </div>
      </ph-toolbar-actions>

      <ph-toolbar-actions
        class="head-labels"
        v-show="hasLabels">
        <span
          :key ="label.name"
          v-for="label in snippet.labels">{{label.name}}</span>
        <input
          class="form-control"
          type="text"
          :disabled="snippet.isLocked"
          v-model="labelName"
          @keydown.enter="addLabel()"
          @keydown.delete="cancelLabel()">
      </ph-toolbar-actions>
    </div>
    <ph-tab-group
      class="snippet-fragments"
      v-show="hasFragments">
      <ph-tab-item
        :icon="snippet.isLocked"
        :key ="fragment.name"
        v-for="fragment in snippet.fragments"
        :class="[fragment.isSelected ? 'fragment-item-selected' :'']"
        @cancel="cancelFragment(fragment)"
        @click.native="selectedFragment(fragment)">
        {{fragment.name}}
      </ph-tab-item>
      <ph-tab-item
        fixed="true"
        icon="plus"
        @click.native="addFragment()"></ph-tab-item>
    </ph-tab-group>

    <div class="snippet-notes">
      <pre><span>{{snippet.notes}}</span><br /><br /></pre>
      <textarea
        class="form-control"
        placeholder="请输入代码片段说明"
        :disabled="snippet.isLocked"
        v-model="snippet.notes"
        v-show="hasNotes"></textarea>
    </div>
    <MonacoEditor
      class="snippet-editor"
      language="java"
      :code="snippet.code"
      :options="options"
      @mounted="onMounted"
      @codeChange="onCodeChange"
      theme="vs">
    </MonacoEditor>
    <div class="foot-bar">
      <span>Java</span>
      <span
        style="text-align: center"
        class="icon"
        :class="[snippet.isLocked ? 'icon-lock':'icon-lock-open']"
        @click="lockToggle()"></span>
      <span
        style="text-align: right"
        class="icon">行,列</span>
    </div>
  </div>
</template>
<script>
  import MonacoEditor from './Monaco.vue'
  import helper from '../../../helper'
  import _ from 'lodash'

  export default{
    name: 'SnippetEditor',
    components: {
      MonacoEditor
    },
    props: ['snippet'],
    data () {
      return {
        options: {
          selectOnLineNumbers: true
        },
        labelName: null,
        fragmentName: null
      }
    },
    methods: {
      addLabel () {
        this.snippet.labels.push({name: this.labelName})
        this.labelName = null
      },
      cancelLabel () {
        if (!this.labelName || this.labelName.length === 0) {
          this.snippet.labels.pop()
        }
      },
      lockToggle () {
        this.snippet.isLocked = !this.snippet.isLocked
      },
      cancelFragment (fragment) {
        this.snippet.fragments = _.filter(this.snippet.fragments, i => i !== fragment)
      },
      addFragment () {
        this.snippet.fragments.push({name: 'fragment'})
      },
      selectedFragment (fragment) {
        this.snippet.fragments.forEach(function (i) {
          i.isSelected = i === fragment
        })
      },
      onMounted (editor) {
        this.editor = editor
      },
      onCodeChange (editor) {
        console.log(editor.getValue())
      },
      copy2Clip () {
        helper.writeTextToClip(this.snippet.code)
      }
    },
    computed: {
      hasLabels () {
        const s = this.snippet
        return s.labels && s.labels.length > 0
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
<style lang="scss" scoped>
  .snippet-editor-panel{
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: column;
  }

  .split-underline{
    border-bottom: 1px solid #f0f0f0
  }
  .head-bar {
    flex:none;
    padding-bottom: 6px;

    input.snippet-title{
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

    .head-labels{
      padding-left: 10px;
      display: flex;
      flex-wrap: wrap;
      margin-top: -5px;
      span{
        flex:none;
        border:1px solid gainsboro;
        padding: 3px 5px;
        margin-left: 3px;
        background-color: #f5f5f4;
        color:#a4a4a5;
        margin-top: 5px;
      }
      input{
        flex:1;
      }
    }
  }

  .snippet-fragments{
    flex:none;

    .fragment-item-selected{
      background-image: linear-gradient(to bottom, #cececd 0%, #cececd 100%);
    }
  }
  .snippet-editor{
    flex: 1;
    display: flex;

    .monaco-editor {
      flex: 1;
    }
  }

  // textarea 自适应高度  https://github.com/alexdunphy/flexText
  // https://segmentfault.com/q/1010000000095238
  .snippet-notes{
    flex:none;
    width: 100%;
    border-bottom: 1px solid gainsboro;
    resize:none;
    position: relative;
    max-height: 100px;
    overflow-y: auto;

    textarea,pre {
      white-space: pre-wrap;
      width: 100%;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      border: none;
      padding: 0;
      line-height: 1.5;
    }

    textarea {
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      resize: none;


      &:focus{
        border-color:gainsboro;
        box-shadow: none;
      }
    }

    pre {
      display: block;
      visibility: hidden;
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

    input{
      border: none;
      background-color: #f5f5f4;
      text-align: center;
      width: auto;
      line-height: 1.6;
      outline: none;
    }

  }

  /*.tab-item:after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: none;
    background-color: rgba(0, 0, 0, 0.08);
    opacity: 0;
    transition: opacity .1s linear;
    z-index: 1;
  }
*/
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
    flex:none;
    height: 20.8px;
    width: 100%;
    padding: 0 10px;
    background-color: #f5f5f4;
    display: flex;

    span{
      flex:1
    }
  }
</style>
