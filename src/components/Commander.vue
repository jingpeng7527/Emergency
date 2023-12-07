<template>
  <el-container class="home-container">
    <!--头部区域-->
    <img src="../assets/bg-command.png" alt="" class="blur">
    <el-header>
      <div>
        <img src="../assets/logo.png" height="50px" width="50px" alt="" />
        <span>环保应急系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体区域-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px' ">
        <div class="toggle-button" @click="toggleCollapse">| | |</div>
        <!-- 侧边栏菜单区 -->
        <el-menu
          background-color="#ffffff60"
          text-color="#606266"
          active-text-color="#409EFF"
          :collapse = "isCollapse"
          :collapse-transition="true"
          :router="true"
        >
        <!-- 一级菜单 -->
          <el-submenu index="2">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-info"></i>
              <!-- 文本 -->
              <span>指挥人员界面</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item index="2-1">
              <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-phone-outline"></i>
              <!-- 文本 -->
              <span>接报管理</span>
            </template>
            </el-menu-item>

            <el-menu-item index="2-2">
              <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-first-aid-kit"></i>
              <!-- 文本 -->
              <span>紧急事件处理</span>
            </template>
            </el-menu-item>
          </el-submenu>
          
        </el-menu>
      </el-aside>
      <!--右侧内容主体-->

      <div class="cover" style="margin-top: 20px; min-width: 70%">
        <el-main>
          <!-- 路由占位符 -->
          <router-view class="cover">

          </router-view>
        </el-main>
      </div>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //是否折叠
      isCollapse: false
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },

    //点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #ffffff60;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  z-index: 2;
}
.el-aside {
  background-color: #ffffff60;
  .el-menu{
      border-right: none;
  }
  z-index: 2;
  max-height: 500px;
  border-radius: 25px;
  display: absolute;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
}

.el-main {
  background: #ffffff60;
  z-index: 2;
  border-radius: 25px;
  min-width: 70%;
}

.toggle-button {
  background-color: #55555560;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;

}
.blur{
  position: absolute;
  top:-5%;
  left: -5%;
  right: -5%;
  width:110%;
  height: 110%;
  object-fit: cover;
  -webkit-filter: blur(10px); /* Chrome, Opera */
}

.cover {

  z-index: 2;
  border-radius: 25px;
}

.el-dialog {
  border-radius: 25px;

}

</style>
