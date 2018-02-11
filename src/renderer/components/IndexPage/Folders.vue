<template>
    <div>
        <ph-nav-group-item
            :style="[indentLevel]"
            :class="{'selected-folder':isCurSelected}"
            @click.native="toggle()">
            <span class="icon"
                :class="[model.isExpand ? 'expand-folder': 'collapse-folder']"
                v-if="hasChild"
                @click="open()" >
            </span>
            <span class="icon icon-folder"></span>
            {{ model.name }}
        </ph-nav-group-item>
        <Folders
            :model='sitem'
            :selected='selected'
            :key ='sitem.name'
            :expandLevel='expandLevel'
            v-show="model.isExpand"
            v-for='sitem in model.items'
            @selectedFolderEvent = 'onSelectedFolder'>
        </Folders>
    </div>
</template>
<script>
    export default{
      name: 'Folders',
      props: ['model', 'selected', 'expandLevel'],
      components: {

      },
      created () {
        let isExpand = false
        if (this.model.canExpand) {
          isExpand = this.model.level < this.expandLevel
        }
        this.model.isExpand = isExpand
      },
      data () {
        return {
    
        }
      },
      methods: {
        toggle () {
          this.$emit('selectedFolderEvent', this.model)
        },
        onSelectedFolder (name) {
          this.$emit('selectedFolderEvent', name)
        },
        open () {
          console.log(this.hasChild)
          if (this.hasChild) {
            this.model.isExpand = !this.model.isExpand
          }
        }
      },
      computed: {
        hasChild () {
          return this.model.canExpand
        },
        indentLevel () {
          let l = this.model.level
          return {
            'padding-left': l > 1 ? (43.02 - 17.6) + 17.6 * (l - 1) + 'px' : undefined
          }
        },
        isCurSelected () {
          return this.model === this.selected
        }
      }
    }
</script>
<style lang="scss" scoped>
$expand-mark: -11px;

.expand-folder {
    margin-left: $expand-mark;
    margin-right: 2.71px !important;
    width: auto !important;

    &:before {
        content: '\e883';
    }
}

.collapse-folder {
    margin-left: $expand-mark;
    margin-right: 2.71px !important;
    width: auto !important;
    &:before {
        content: '\e885';
    }
}

.selected-folder {
     background-color: rgba(168, 168, 168, 0.5);
}

.icon-folder:before{
    font-size: .85em;
}
</style>
