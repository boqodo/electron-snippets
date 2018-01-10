<template>
    <div class="container">
        <div class="header">
            <div class="tabs">
                <div class="tab">
                </div>
                <div class="tab activated">
                    <div class="tab-icon">
                        <span class="icon icon-note"></span>
                    </div>
                    <div class="tab-title">外观</div>
                </div>
                <div class="tab">
                    <div class="tab-icon">
                        <span class="icon icon-note"></span>
                    </div>
                    <div class="tab-title">编辑器</div>
                </div>
                <div class="tab">
                    <div class="tab-icon">
                        <span class="icon icon-note"></span>
                    </div>
                    <div class="tab-title">系统</div>
                </div>
                <div class="tab">
                </div>
            </div>
        </div>
        <div class="content"></div>
        <div class="footer">
            <div class="space"></div>
            <div class="close">
                <span>关闭</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
      name: 'Setting',
      props: [],
      data () {
        return {

        }
      },
      methods: {
    
      },
      computed: {
    
      }
    }
</script>
<style lang="scss" scoped>
    .container{
        width: 100%;
        height: 100%;
        display: flex;
        box-sizing: border-box;
        justify-content:center;
        align-items: center;
        flex-direction: column;
    }
    .header{
        height: 15%;
        width: 100%;
        flex: none
    }
    .tabs{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        justify-content:center;
        align-items: center;
        flex-direction: row;
        display: flex;
        background-color: gainsboro;
        .tab{
            flex:1;
            text-align: center;
            margin: 1px;

            &.activated{
                border-bottom: 2px solid goldenrod
            }
        }
    }
    .content{
        flex:1;
        width: 100%
    }
    .footer{
        height: 12%;
        width: 100%;
        flex: none;
        text-align: center;
        box-sizing: border-box;
        justify-content:center;
        align-items: center;
        flex-direction: row;
        display: flex;

        .space{
            flex: 1;
        }
        .close{
            width: 12%;
        }
    }
</style>
