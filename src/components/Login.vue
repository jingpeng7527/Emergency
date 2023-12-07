<template>
  <div class="login_container">
    <!-- <img src="../assets/cover.png" alt="" class="cover" /> -->
    <video
      autoplay="autoplay"
      loop="loop"
      controls="controls"
      class="blur earthvideo"
    >
      <source src="../assets/mp42.mp4" type="video/mp4" />
      您的浏览器不支持 video 标签。
    </video>
      <div class="login_box">
            <!-- 头像区域 -->
            <!-- <div class="avatar_box">
              <img src="../assets/logo.png" alt="" />
            </div> -->
            <!-- 登录区域 -->
            <el-form
              ref="loginFormRef"
              :model="loginForm"
              :rules="LoginFormRules"
              class="login_form"
            >
              <!-- 用户名 -->
              <h1 style="color: #ffffff70; font-size: 46px">欢迎登陆环境应急保护系统</h1>
              <el-form-item prop="username" style="display: relative; margin-top: 100px; margin-bottom: 50px;">
                <el-input
                  v-model="loginForm.username"
                  prefix-icon="el-icon-user"
                ></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item prop="password" style="display: relative; margin-top: px; margin-bottom: 50px;">
                <el-input
                  v-model="loginForm.password"
                  prefix-icon="el-icon-lock"
                  type="password"
                ></el-input>
              </el-form-item>
              <!-- 按钮 -->
              <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="resetLoginForm">重置</el-button>
                <el-button @click="drawer = true" type="success" style="margin-left: 16px;">
                  帮助信息
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-drawer
              title="帮助信息"
              :visible.sync="drawer"
              size="45%">
              <div>
              <el-button @click="innerDrawer1 = true">超级管理员</el-button>
              <el-drawer
                  title="管理员帮助信息"
                  :append-to-body="true"
                  :before-close="handleClose"
                  :visible.sync="innerDrawer1">
                  <p>超级管理员登录后，可进行增加用户、修改用户状态、删除用户等操作。</p>
                  <p>1.管理员可以通过左侧菜单进行页面跳转，也可以使用上方面包屑栏选择界面</p>
                  <p>2.管理员在进行增加操作时，必须填完整必要信息，并且符合字数限制</p>
                  <p>3.管理员在进行删除操作时，需进行确认操作，避免误删、错删</p>
                  <p>4.管理员在进行搜索时，需按照用户名称进行搜索，其他搜索关键词无效</p>
                  <p>5.管理员在页面并未显示新信息的时候可进行刷新操作</p>
              </el-drawer>
              <el-button @click="innerDrawer2 = true">工作人员</el-button>
              <el-drawer
                  title="工作人员帮助信息"
                  :append-to-body="true"
                  :before-close="handleClose"
                  :visible.sync="innerDrawer2">
                  <p>工作人员登录后，可进行物资维护、接报维护、事件维护等操作。</p>
                  <p>1.工作人员可以通过左侧菜单进行页面跳转，也可以使用上方面包屑栏选择界面</p>
                  <p>2.工作人员在进行增加操作时，必须填完整必要信息，并且符合字数限制</p>
                  <p>3.工作人员在进行删除操作时，需进行确认操作，避免误删、错删</p>
                  <p>4.工作人员在进行搜索时，需按照用户名称进行搜索，其他搜索关键词无效</p>
                  <p>5.工作人员在页面并未显示新信息的时候可进行刷新操作</p>
                  <p>6.工作人员无权修改已经被指挥人员或专家人员处理过的接报</p>
                  </el-drawer>
              <el-button @click="innerDrawer3 = true">指挥人员</el-button>
              <el-drawer
                  title="指挥人员帮助信息"
                  :append-to-body="true"
                  :before-close="handleClose"
                  :visible.sync="innerDrawer3">
                  <p>指挥人员登录后，可进行接报管理、紧急事件处理等操作。</p>
                  <p>1.指挥人员可以通过左侧菜单进行页面跳转，也可以使用上方面包屑栏选择界面</p>
                  <p>2.指挥人员在进行接报管理时，可以填写审批内容，但要注意字数限制</p>
                  <p>3.指挥人员在进行接报管理时，无权进行接报内容的修改</p>
                  <p>4.指挥人员在进行搜索时，需按照用户名称进行搜索，其他搜索关键词无效，并可以随时取消搜索</p>
                  <p>5.指挥人员在进行接报管理时，无权修改已经被专家回复过的审批内容</p>
                  <p>6.指挥人员在进行紧急事件处理时，必须填写调动人员和物资</p>
                  </el-drawer>
              <el-button @click="innerDrawer4 = true">专家人员</el-button>
              <el-drawer
                   title="专家帮助信息"
                   :append-to-body="true"
                   :before-close="handleClose"
                   :visible.sync="innerDrawer4">
                   <p>专家登录后，可进行接报审批操作。</p>
                   <p>1.专家可以通过左侧菜单进行页面跳转，也可以使用上方面包屑栏选择界面</p>
                   <p>2.专家在进行接报审批时，需填写审批内容，并注意字数限制</p>
                   <p>3.专家在进行搜索时，需按照事件名称进行搜索，并可以随时取消搜索</p>
                   </el-drawer>
          </div>
          </el-drawer>
        </div>
      </template>

<script>
export default {
  data() {
    return {
      drawer: false,
      innerDrawer1: false,
      innerDrawer2: false,
      innerDrawer3: false,
      innerDrawer4: false,
      loginForm: {
        username: "admin",
        password: "123456",
      },

      LoginFormRules: {
        //   验证用户民是否合法
        username: [
          { required: true, message: "请输入登陆名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登陆密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //   点击重置按钮，重置登陆表单
    resetLoginForm() {
      //   console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        // const { data: res } = await this.$http.post('login', this.loginForm)
        if (
          this.loginForm.username == "admin" &&
          this.loginForm.password == "123456"
        ) {
          this.$message.success("登录成功");
          // console.log(res)
          // window.sessionStorage.setItem('token', res.data.token)
          this.$router.push("/home");
        } else if (
          this.loginForm.username == "super" &&
          this.loginForm.password == "123456"
        ) {
          this.$message.success("登陆成功");
          this.$router.push("/super");
        } else if (
          this.loginForm.username == "commander" &&
          this.loginForm.password == "123456"
        ) {
          this.$message.success("登录成功");
          // console.log(res)
          // window.sessionStorage.setItem('token', res.data.token)
          this.$router.push("/commander");
        } else if (
          this.loginForm.username == "professor" &&
          this.loginForm.password == "123456"
        ) {
          this.$message.success("登录成功");
          // console.log(res)
          // window.sessionStorage.setItem('token', res.data.token)
          this.$router.push("/professor");
        } else {
          return this.$message.error("登录失败");
        }
      });
    },
}
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  min-width: 600px;
  height: 300px;
  background-color: #ffffff60;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 25px;

  animation-name: dropbox;
  animation-duration: 1s;
  animation-timing-function: ease-out;

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}

.blur {
  position: absolute;
  top: -5%;
  left: -5%;
  right: -5%;
  width: 110%;
  height: 110%;
  object-fit: cover;
  -webkit-filter: blur(10px); /* Chrome, Opera */
}

.cover {
  position: absolute;
  top: -5%;
  left: -200%;
  right: -100%;
  width: 110%;
  height: 110%;
  object-fit: cover;
  z-index: 100;
  animation: coverGo;
  animation-duration: 10s;
  animation-delay: -2.5s;
  opacity: 0;
}

@keyframes dropbox {
  from {
    top: -50%;
  }
  to {
    top: 50%;
  }
}

@keyframes coverGo {
  form {
    left: -200%;
    right: -100%;
    opacity: 1;
  }
  to {
    left: 200%;
    right: 300%;
    opacity: 0;
  }
}

// @keyframes turnBlur {
//   from {-webkit-filter: blur(1px);}
//   to {-webkit-filter: blur(10px);}

// }

// .earthvideo{
//   animation-name: turnBlur;
//   animation-duration: 1s;
// }

// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }
// main {
//   font-family: "Heebo", sans-serif;
// }

// .landing {
//   min-height: 100vh;
//   background: red;
//   background-size: cover;
//   padding: 0rem 5rem;
// }
// nav {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   min-height: 10vh;
// }
// .nav-links {
//   display: flex;
//   list-style: none;
// }
// .nav-links li {
//   padding-left: 10rem;
//   font-size: 1.2rem;
// }
// #logo {
//   font-family: "Lobster", cursive;
//   font-weight: lighter;
//   font-size: 2rem;
// }

// .big-text {
//   position: absolute;
//   top: 30%;
//   left: 50%;
//   transform: translate(-50%, -30%);
//   font-size: 5rem;
//   font-family: "Lobster", cursive;
//   color: rgb(61, 61, 61);
// }

// .intro {
//   background: black;
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
// .slider {
//   background: rgb(97, 105, 109);
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   transform: translateY(100%);
// }

// .intro-text {
//   color: rgb(233, 233, 233);
//   font-family: "Heebo", sans-serif;
//   font-size: 3rem;
// }

// .hide {
//   background: black;
//   overflow: hidden;
// }

// .hide span {
//   transform: translateY(100%);
//   display: inline-block;
// }
</style>
