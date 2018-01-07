<template>
    <ph-nav-group-item
        :class="{'selected-favorite':isCurSelected}"
        @click.native="toggle()">
        <span class="icon"
            :class="[model.icon]">
        </span>
        {{model.name}}
    </ph-nav-group-item>
</template>
<script>
    export default{
      name: 'Favorites',
      props: ['model', 'selected'],
      data () {
        return {

        }
      },
      methods: {
        toggle () {
          this.$emit('selectedFavoriteEvent', this.model.name)
        },
        onSelectedTag (name) {
          this.$emit('selectedFavoriteEvent', name)
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
.selected-favorite{
    background-color: rgba(168, 168, 168, 0.5);
}
</style>
