<template>
  <div>
    <!-- 卡片视图区 -->

    <el-card class="box-card" shadow="hover" style="overflow: hidden">
      <!-- 搜索与添加区 -->

      <!-- 物资列表区域 -->
      <div class="cardscontainer">
        <div class="tablecontainer1">
          <img
            src="../assets/bg1.gif"
            alt=""
            style="
              width: 221px;
              height: 236px;
              border-radius: 25px;
              margin-top: -18px;
              margin-left: -1px;
            "
          />
        </div>
        <div class="tablecontainer2">
          <h1 style="margin-left: 40px; margin-top: 10px; font-size: 48px">
            欢迎使用环保应急系统
          </h1>
          <h1 style="margin-left: 40px; margin-top: -40px; font-size: 36px">
            当前待处理事项
          </h1>
          <h1 style="margin-left: 40px; margin-top: -20px; font-size: 24px">
            学生掉进小南湖
          </h1>
          <h1 style="margin-left: 40px; margin-top: -20px; font-size: 24px">
            图书馆地下室冒出浓烟
          </h1>
          <h1 style="margin-left: 40px; margin-top: -20px; font-size: 24px">
            水泥运输车撞上学校南侧围墙
          </h1>
        </div>
        <div class="tablecontainer3">
          <h1 style="margin-left: 40px; margin-top: 10px; font-size: 48px">
            天气
          </h1>
          <h1 style="margin-left: 40px; margin-top: -40px; font-size: 36px">
            晴
          </h1>
          <h1 style="margin-left: 40px; margin-top: -40px; font-size: 20px">
            15～23摄氏度
          </h1>
          <h1
            style="
              margin-left: 40px;
              margin-top: 10px;
              margin-bottom: 10px;
              font-size: 72px;
            "
          >
            ☀️
          </h1>
        </div>
        <div class="tablecontainer4">
          <img
            src="../assets/ring.png"
            alt=""
            style="
              width: 220px;
              height: 220px;
              border-radius: 25px;
              margin-top: -10px;
              margin-left: -0px;
              margin-right: -30px;
              margin-bottom: -30px;
            "
          />
        </div>
        <div class="tablecontainer5">
          <img
            src="../assets/status.png"
            alt=""
            style="
              width: 848px;
              height: 130px;
              border-radius: 25px;
              margin-top: -18px;
              margin-left: 3px;
              margin-right: -30px;
              margin-bottom: -30px;
            "
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  //生命周期函数
  created() {},

  //当前页面的一些事件处理函数
  methods: {
    renderContent(h, { node, data, store }) {
      return h(
        "span",
        {
          class: "custom-tree-node",
        },
        h("span", null, node.label),
        h(
          "span",
          null,
          h(
            "a",
            {
              onClick: () => this.append(data),
            },
            "Append "
          ),
          h(
            "a",
            {
              onClick: () => this.removeNode(node, data),
            },
            "Delete"
          )
        )
      );
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 1%;
  margin-left: 1%;
  margin-bottom: 1%;
  margin-right: 1%;

  background-color: rgba(255, 255, 255, 0.3);
  border: 0ch;
  border-radius: 25px;
}

.tablecontainer1 {
  padding-top: 18px;
  margin-top: 10px;
  padding-bottom: 18px;
  margin-bottom: 10px;
  padding-left: 1px;
  padding-right: 1px;
  background-color: rgb(255, 255, 255);
  border-radius: 25px;
  height: 200px;
  width: 200px;
  margin-right: 20px;
  padding-right: 20px;
  position: absolute;
  left: 300px;
  top: 135px;
  animation-name: rise1;
  animation-duration: 0.5s;
}

.tablecontainer2 {
  padding-top: 18px;
  margin-top: 10px;
  padding-bottom: 18px;
  margin-bottom: 10px;
  padding-left: 1px;
  padding-right: 1px;
  background-color: rgb(255, 255, 255);
  border-radius: 25px;
  height: 300px;
  width: 600px;
  margin-right: 20px;
  padding-right: 20px;
  position: absolute;
  left: 550px;
  top: 135px;
  animation-name: rise2;
  animation-duration: 0.5s;
}
.tablecontainer3 {
  padding-top: 18px;
  margin-top: 10px;
  padding-bottom: 18px;
  margin-bottom: 10px;
  padding-left: 1px;
  padding-right: 1px;
  background-color: rgb(255, 255, 255);
  border-radius: 25px;
  min-height: 300px;
  min-width: 180px;
  margin-right: 20px;
  padding-right: 20px;
  position: absolute;
  left: 1200px;
  top: 135px;
  animation-name: rise3;
  animation-duration: 0.5s;
}
.tablecontainer4 {
  padding-top: 18px;
  margin-top: 10px;
  padding-bottom: 18px;
  margin-bottom: 10px;
  padding-left: 1px;
  padding-right: 1px;
  background-color: rgb(255, 255, 255);
  border-radius: 25px;
  min-height: 200px;
  min-width: 200px;
  margin-right: 20px;
  padding-right: 20px;
  position: absolute;
  left: 300px;
  top: 395px;
  animation-name: rise4;
  animation-duration: 0.5s;
}
.tablecontainer5 {
  padding-top: 18px;
  margin-top: 10px;
  padding-bottom: 18px;
  margin-bottom: 10px;
  padding-left: 1px;
  padding-right: 1px;
  background-color: rgb(255, 255, 255);
  border-radius: 25px;
  min-height: 100px;
  min-width: 830px;
  margin-right: 20px;
  padding-right: 20px;
  position: absolute;
  left: 550px;
  top: 495px;
  animation-name: rise5;
  animation-duration: 0.5s;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.cardscontainer {
  display: flex;
  min-height: 520px;
}

@keyframes rise1 {
  from{
    top: 1200px;
  }
  to{
    top: 135px;
  }
}
@keyframes rise2 {
  from{
    top: 2300px;
  }
  to{
    top: 135px;
  }
}
@keyframes rise3 {
  from{
    top: 3500px;
  }
  to{
    top: 135px;
  }
}
@keyframes rise4 {
  from{
    top: 3300px;
  }
  to{
    top: 395px;
  }
}
@keyframes rise5 {
  from{
    top: 6800px;
  }
  to{
    top: 495px;
  }
}

// .cover {
//   position: absolute;
//   top: -5%;
//   left: -200%;
//   right: -100%;
//   width: 110%;
//   height: 110%;
//   object-fit: cover;
//   z-index: 100;
//   animation: coverGo;
//   animation-duration: 10s;
//   animation-delay: -2.5s;
//   opacity: 0;
// }

// @keyframes dropbox {
//   from {
//     top: -50%;
//   }
//   to {
//     top: 50%;
//   }
// }

</style>
