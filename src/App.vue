<template>
  <div id="app">
    <!--路由占位符-->
    <router-view v-if="isRouterAlive">

    </router-view>
  </div>
  
</template>

<script>


export default {
  name: 'app',
  provide() {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
/**全局样式表 */

html,
body,
#app{
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
}

/**面包屑的格式 */
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
  z-index: 3;
  color: aliceblue;
}


/**卡片的格式 */
.el-card {
  /* box-shadow: 0 1px 1px rgba(115, 171, 194, 0.15)!important; */
  background: #ffffff60;
  background: linear-gradient(to right bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.3));
  border-radius: 25px;
  
}
/* 
.el-card:hover{
  box-shadow: 0 1px 1px rgba(0,0,0,0.15) !important;
} */
.el-table {
  font-size: 12px;
}

/**解决了单击新增按钮时，屏幕有一瞬间变暗的bug */
.v-modal {
  display: none;
}


.tablecontainer{
  background: white;
  padding: 2%;
  margin-top: 2%;
  margin-bottom: 2%;
  border-radius: 25px;
}

</style>
