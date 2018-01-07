<template>
    <ph-nav-group-item
        :class="{'selected-tag':isCurSelected}"
        @click.native="toggle()">
        <span class="icon icon-record" :style="{color:model.color}"></span>
        {{model.name}}
    </ph-nav-group-item>
</template>
<script>
    export default{
      name: 'Tags',
      props: ['model', 'selected'],
      data () {
        return {

        }
      },
      methods: {
        toggle () {
          this.$emit('selectedTagEvent', this.model.name)
        },
        onSelectedTag (name) {
          this.$emit('selectedTagEvent', name)
        }
      },
      computed: {
        isCurSelected () {
          return this.model.name === this.selected
        }
      }
    }
</script>
<style lang="scss" scoped>
.selected-tag{
    background-color: rgba(168, 168, 168, 0.5);
}
</style>
