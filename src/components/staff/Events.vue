<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工作人员界面</el-breadcrumb-item>
      <el-breadcrumb-item>事件维护</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->

    <el-card class="box-card" shadow="hover">
      <!-- 搜索与添加区 -->

      <!-- 栅格布局 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <div>
            <el-button type="success" round @click="addDialogVisible = true"
              >新增</el-button
            >
            <!-- <el-button
              type="danger"
              round
              style="position: absolute; right: 20px"
              >删除</el-button
            > -->
          </div>
        </el-col>
      </el-row>

      <!-- 物资列表区域 -->
      <div class = "cardscontainer">
        <div class="tablecontainer">
        <el-tree
          :data="eventData"
          node-key="id"
          :props="defaultProps"
          @node-click="handleNodeClick"
          draggable
          ref="theTree"
          v-if="loadTree"
        >
        <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <a
              @click.stop="removeNode(node, data)">
              ❌
            </a>
          </span>
        </span>
      </template>
        </el-tree>
      </div>
      <div class="tablecontainer">
        <el-form
          :model="editedData"

          ref="editForm"
          label-width="100px"
        >
          <el-form-item label="事件种类" prop="type">
            <el-input v-model="editedData.type"></el-input>
          </el-form-item>
          <el-form-item label="事件名称" prop="name">
            <el-input v-model="editedData.name"></el-input>
          </el-form-item>
          <el-form-item label="严重程度" prop="severe">
            <el-input v-model="editedData.severe"></el-input>
          </el-form-item>
          <el-form-item label="事件编号" prop="no">
            <el-input v-model="editedData.number"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="note">
            <el-input v-model="editedData.note"></el-input>
          </el-form-item>
        </el-form>
      </div>
      </div>
      

      <el-dialog
        title="添加灾害事件"
        :visible.sync="addDialogVisible"
        width="50%"
      >
        <el-form
          :model="addedData"
          :rules="addRules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="事件种类" prop="type">
            <el-input v-model="addedData.type"></el-input>
          </el-form-item>
          <el-form-item label="事件名称" prop="name">
            <el-input v-model="addedData.name"></el-input>
          </el-form-item>
          <el-form-item label="严重程度" prop="severe">
            <el-input v-model="addedData.severe"></el-input>
          </el-form-item>
          <el-form-item label="事件编号" prop="no">
            <el-input v-model="addedData.number"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="note">
            <el-input v-model="addedData.note"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="success" round @click="addNode()">新增</el-button>
        <el-button round @click="addDialogVisible = false">取消</el-button>
      </el-dialog>

      <!-- <el-dialog
        title="修改灾害事件"
        :visible.sync="editDialogVisible"
        width="50%"
      >
        <el-form
          :model="editedData"
          :rules="addRules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="事件种类" prop="type">
            <el-input v-model="editedData.type"></el-input>
          </el-form-item>
          <el-form-item label="事件名称" prop="name">
            <el-input v-model="editedData.name"></el-input>
          </el-form-item>
          <el-form-item label="严重程度" prop="severe">
            <el-input v-model="editedData.severe"></el-input>
          </el-form-item>
          <el-form-item label="事件编号" prop="no">
            <el-input v-model="editedData.number"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="note">
            <el-input v-model="editedData.note"></el-input>
          </el-form-item>
        </el-form>
        <el-button round @click="editNode()">修改</el-button>
        <el-button round @click="addDialogVisible = false">取消</el-button>
      </el-dialog> -->
      <el-row :gutter="20" style=" display: absolute; width: 100%">
        
        <div>
          <el-button round @click="saveEdit" style="display: absolute; margin-left: 85%;">保存修改</el-button>
          <!-- <el-button
            type="danger"
            round
            style="position: absolute; right: 20px"
            >删除</el-button
          > -->
        </div>
        
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      loadTree: true,
      isValid: true,
      eventData: [
        {
          label: "自然灾害",
          children: [
            {
              label: "地震",
              children: [
                {
                  label: "一级",
                },
              ],
            },
          ],
        },
        {
          label: "事故灾害",
          children: [
            {
              label: "公共道路的交通事故",
              children: [
                { label: "二级" },
                {
                  label: "三级",
                },
              ],
            },
            {
              label: "封闭场所的交通事故",
              children: [
                {
                  label: "三级",
                },
              ],
            },
            {
              label: "机械导致的伤害",
              children: [
                {
                  label: "三级",
                },
              ],
            },
            {
              label: "建筑物结构缺陷导致的伤害",
              children: [
                {
                  label: "三级",
                },
              ],
            },
          ],
        },
        {
          label: "公共卫生事件",
          children: [
            {
              label: "食物中毒事件",
              children: [
                {
                  label: "三级",
                },
              ],
            },
            {
              label: "饮用水污染事件",
              children: [
                {
                  label: "三级",
                },
              ],
            },
          ],
        },
      ],
      addedData: { type: "", name: "", severe: "", number: "", note: "" },
      editedData: { type: "", name: "", severe: "", number: "", note: "" },
      addRules: {
        type: [{ required: true, message: "请填写事件种类" }],
        name: [{ required: true, message: "请填写事件名称" }],
        severe: [{ required: true, message: "请填写事件严重程度" }],
      },

      defaultProps: {
        children: "children",
        label: "label",
      },

      multipleSelection: [],
      //控制添加物资对话框的显示与隐藏
      addDialogVisible: false,
      //控制修改物资对话框的显示与隐藏
      editDialogVisible: false,
      // 当前的选中的Node
      curNode: undefined
    };
  },
  //生命周期函数
  created() {},

  //当前页面的一些事件处理函数
  methods: {
    
    handleNodeClick(data, node, elem) {
      this.curNode = node;
      console.log(data);
      console.log(node);
      console.log(data.children);
      parent = node.parent
      if(typeof(data.children) == "undefined"){
      this.editedData.name = parent.label
      this.editedData.type = parent.parent.label
      this.editedData.severe = node.label
      }
      else this.$refs.editForm.resetFields()

    },
    addNode() {
      try{
        this.$refs.ruleForm.validate(valid => {
          this.isValid = valid
          console.log(this.isValid)
        })
      }catch{
        this.isValid = true
      }
      if(this.isValid){

      name = this.addedData.name;
      console.log("to be added:" + name);
      let type = this.eventData.find((item) => {
        return item.label == this.addedData.type;
      });
      console.log(type);
      //控制添加物资对话框的显示与隐藏
      this.addDialogVisible = false
      if (type != undefined) {
        // 这种类型已经存在了
        let name = type.children.find((item) => {
          return item.label == this.addedData.name;
        });
        console.log(name);
        if (name != undefined) {
          // 这个名字的已经存在了
          let severe = name.children.find((item) => {
            return item.label == this.addedData.severe;
          });
          console.log(severe);
          if (severe != undefined) {
            console.log("该条目已经存在了");
            return "该条目已经存在了";
          } else {
            name.children.push({
              label: this.addedData.severe,
            });
            this.loadTree = false;
            this.$nextTick(() => {
              this.loadTree = true;
            });
            console.log(name);
          }

          console.log("添加成功");
          return "添加成功";
        } else {
          // 这个名字不存在
          type.children.push({
            label: this.addedData.name,
            children: [
              {
                label: this.addedData.severe,
              },
            ],
          });
          this.loadTree = false;
          this.$nextTick(() => {
            this.loadTree = true;
          });
        }
      } else {
        // 这个种类不存在
        this.eventData.push({
          label: this.addedData.type,
          children: [
            {
              label: this.addedData.name,
              children: [
                {
                  label: this.addedData.severe,
                },
              ],
            },
          ],
        });
        this.loadTree = false;
        this.$nextTick(() => {
          this.loadTree = true;
        });
      }
      addedData= { type: "", name: "", degree: "", number: "", note: "" }

      }
    },
    removeNode(node, data) {

        console.log(data);
        this.$refs.theTree.remove(this.curNode)
        this.$refs.editForm.resetFields()
      
      },

      renderContent(h, { node, data, store }) {
        return h("span", {
          class: "custom-tree-node"
        }, h("span", null, node.label), h("span", null, h("a", {
          onClick: () => this.append(data)
        }, "Append "), h("a", {
          onClick: () => this.removeNode(node, data)
        }, "Delete")));
      },

      saveEdit(){
        this.addedData = this.editedData
        this.addNode()
        console.log("xxxx")
        console.log(this.$refs.theTree.getCurrentNode())
        this.$refs.theTree.removeNode(this.curNode)
      }
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

.tablecontainer {
  padding-top: 18px;
  margin-top: 10px;
  padding-bottom: 18px;
  margin-bottom: 10px;
  padding-left: 1px;
  padding-right: 1px;
  background-color: rgb(255, 255, 255);
  border-radius: 25px;
  min-height: 300px;
  min-width: 45%;
  margin-right: 20px;
  padding-right: 20px;
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
}


.el-breadcrumb  /deep/  .el-breadcrumb__inner 
      {
        color: #ccc !important;
    }
</style>
