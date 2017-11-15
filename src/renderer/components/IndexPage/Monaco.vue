<template>
    <div :style="style"></div>
</template>

<script>
  var debounce = require('lodash.debounce')
  const loader = require('monaco-loader')

  export default {
    props: {
      width: {type: [String, Number], default: '100%'},
      height: {type: [String, Number], default: '100%'},
      code: {type: String, default: '// code \n'},
      srcPath: {type: String},
      language: {type: String, default: 'javascript'},
      theme: {type: String, default: 'vs-dark'}, // vs, hc-black
      options: {type: Object, default: () => {}},
      highlighted: {
        type: Array,
        default: () => [{
          number: 0,
          class: ''
        }]
      },
      changeThrottle: {type: Number, default: 0}
    },
    mounted () {
      this.fetchEditor()
      // window.onresize = () => {
      //   if (this.editor) {
      //     this.editor.layout()
      //   }
      // }
    },
    destroyed () {
      this.destroyMonaco()
    },
    computed: {
      style () {
        return {
          width: 'calc(100% - 0.5px)',
          height: 'calc(100% - 160.1px)'
        }
      },
      editorOptions () {
        return Object.assign({}, this.defaults, this.options, {
          value: this.code,
          language: this.language,
          theme: this.theme
        })
      }
    },
    data () {
      return {
        defaults: {
          selectOnLineNumbers: true,
          roundedSelection: true,
          readOnly: false,
          cursorStyle: 'line',
          automaticLayout: true,
          glyphMargin: false,
          lineNumbers: 'on',
          lineNumbersMinChars: 1,
          showFoldingControls: 'mouseover',
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          wrappingIndent: 'indent',
          minimap: {//  0.8版本不支持
            enabled: true,
            showSlider: 'mouseover'
          }
        }
      }
    },
    watch: {
      highlighted: {
        handler (lines) {
          this.highlightLines(lines)
        },
        deep: true
      }
    },
    methods: {
      highlightLines (lines) {
        if (!this.editor) {
          return
        }
        lines.forEach((line) => {
          const className = line.class
          const highlighted = this.$el.querySelector(`.${className}`)

          if (highlighted) {
            highlighted.classList.remove(className)
          }

          const number = parseInt(line.number)
          if ((!this.editor && number < 1) || isNaN(number)) {
            return
          }

          const selectedLine = this.$el.querySelector(`.view-lines [linenumber="${number}"]`)
          if (selectedLine) {
            selectedLine.classList.add(className)
          }
        })
      },
      editorHasLoaded (editor, monaco) {
        this.editor = editor
        this.monaco = monaco
        this.editor.onDidChangeModelContent(event =>
          this.codeChangeHandler(editor, event)
        )
        this.$emit('mounted', editor)
      },
      codeChangeHandler: function (editor) {
        if (this.codeChangeEmitter) {
          this.codeChangeEmitter(editor)
        } else {
          this.codeChangeEmitter = debounce(
            function (editor) {
              this.$emit('codeChange', editor)
            },
            this.changeThrottle
          )
          this.codeChangeEmitter(editor)
        }
      },
      fetchEditor () {
        loader({baseUrl: './node_modules/monaco-editor/min/'}).then((monaco) => {
          this.editor = monaco.editor.create(this.$el, this.editorOptions)
          this.editorHasLoaded(this.editor, monaco)
        })
      },
      destroyMonaco () {
        if (typeof this.editor !== 'undefined') {
          this.editor.dispose()
        }
      }
    }
  }
</script>
