//超级用户界面
<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/super' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>超级用户界面</el-breadcrumb-item>
      <el-breadcrumb-item>人员信息维护</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 搜索与添加区 -->

      <!-- 栅格布局 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <div>
            <el-button type="success" round @click="addDialogVisible = true"
              >新增</el-button
            >
          </div></el-col
        >
        <el-col :span="6"
          ><div>
            <el-button round @click="toggleSelection()">刷新</el-button>
          </div></el-col
        >
        <el-col :span="6"
          ><div>
            <el-tooltip
              class="item"
              effect="dark"
              content="根据用户名模糊查询"
              placement="top"
            >
              <el-input placeholder="请输入用户名称" v-model="tableDataName">
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="doFilter"
                ></el-button>
              </el-input>
            </el-tooltip>
          </div>
          <el-col> </el-col>
        </el-col>
        <el-col :span="6"><div></div></el-col>
      </el-row>


      <div class="tablecontainer">
      <!-- 用户列表区域 -->
      <el-table
        ref="multipleTable"
        :data="tableDataEnd"
        tooltip-effect="dark"
        style="width: 100%"
        :default-sort="{ prop: 'id' }"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column prop="id" label="ID" sortable=""> </el-table-column>
        <el-table-column prop="account" label="账号" width="120">
        </el-table-column>
        <el-table-column prop="password" label="密码"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="gender" label="性别"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="seq" label="人员编号" width="120">
        </el-table-column>
        <el-table-column prop="type" label="人员类型" width="120">
        </el-table-column>
        <el-table-column prop="state" label="账号状态" width="120">
          <template slot-scope="scope">
            <el-tag :type="scope.row.state === true ? 'success' : 'danger'" v-if="scope.row.state==true">
              正常
            </el-tag>

            <el-tag :type="scope.row.state === true ? 'success' : 'danger'" v-if="scope.row.state==false">
              停用
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改人员信息"
              placement="top"
              :enterable="false"
            >
              <!-- 修改按钮 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="
                  showEditDialog(
                    scope.row.id,
                    scope.row.account,
                    scope.row.password,
                    scope.row.name,
                    scope.row.gender,
                    scope.row.age,
                    scope.row.seq,
                    scope.row.type,
                    scope.row.state
                  )
                "
              ></el-button>
            </el-tooltip>

            <!-- 删除按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除人员信息"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="removeById(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      </div>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 4, 8, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems"
      >
      </el-pagination>

      <!-- 新增人员的对话框 -->
      <el-dialog
        title="添加人员信息"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="resetForm"
      >
        <!-- 内容主体区 -->
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addForm"
          label-width="auto"
          size="mini"
        >
          <el-form-item label="ID：" prop="id">
            <el-input v-model="addForm.id"></el-input>
          </el-form-item>
          <el-form-item label="账号：" prop="account">
            <el-input v-model="addForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <!-- <el-form-item label="性别：" prop="gender">
            <el-input v-model="addForm.gender"></el-input>
          </el-form-item> -->
          <el-form-item label="性别：" prop="gender">
            <el-radio-group v-model="addForm.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄：" prop="age">
            <el-input v-model="addForm.age"></el-input>
          </el-form-item>
          <el-form-item label="人员编号:" prop="seq">
            <el-input v-model="addForm.seq"></el-input>
          </el-form-item>
          <el-form-item label="人员类型：">
            <el-select v-model="addForm.type" placeholder="请选择员工类型">
              <el-option label="工作人员" value="工作人员"></el-option>
              <el-option label="指挥人员" value="指挥人员"></el-option>
              <el-option label="专家" value="专家"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addResource">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改的对话框 -->
      <el-dialog
        title="修改人员记录"
        :visible.sync="editDialogVisible"
        width="50%"
        label-width="auto"
        size="mini"
        @close="editDialogClosed"
      >
        <!-- 内容主体区 -->
        <el-form
          :model="editForm"
          ref="editForm"
          label-width="auto"
          size="mini"
        >
          <el-form-item label="ID：" prop="id">
            <el-input v-model="editForm.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="账号：" prop="account">
            <el-input v-model="editForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="editForm.password"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="editForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="gender">
            <el-input v-model="editForm.gender" disabled></el-input>
          </el-form-item>
          <el-form-item label="年龄：" prop="age">
            <el-input v-model="editForm.age"></el-input>
          </el-form-item>
          <el-form-item label="人员编号：" prop="seq">
            <el-input v-model="editForm.seq" disabled></el-input>
          </el-form-item>
          <el-form-item label="人员类型：">
            <el-select v-model="editForm.type" placeholder="请选择员工类型">
              <el-option label="工作人员" value="工作人员"></el-option>
              <el-option label="指挥人员" value="指挥人员"></el-option>
              <el-option label="专家" value="专家"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号状态：" prop="state">
            <el-switch v-model="editForm.state"></el-switch>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editResource">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
 const isNum = (rule, value, callback) => {
      const age= /^[0-9]*$/
      if (!age.test(value)) {
        callback(new Error('请输入数字！'))
      }else{
        callback()
      }
    }
export default {
  
  inject: ["reload"],
  data() {
    return {
      tableDataBegin: [
        {
          id: "1",
          account: "admin",
          password: "123456",
          name: "工具人1",
          gender: "男",
          age: "20",
          seq: "10",
          type: "工作人员",
          state: true
        },
        {
          id: "2",
          account: "comander",
          password: "123456",
          name: "指挥工具人",
          gender: "男",
          age: "30",
          seq: "12",
          type: "指挥人员",
          state: true
        }
      ],
      tableDataName: "",
      tableDataEnd: [],
      currentPage: 1,
      pageSize: 8,
      totalItems: 0,
      filterTableDataEnd: [],
      flag: false,
      multipleSelection: [],
      //控制添加物资对话框的显示与隐藏
      addDialogVisible: false,
      //控制修改物资对话框的显示与隐藏
      editDialogVisible: false,
      //添加物资的表单数据
      addForm: {
        id: "3",
        account: "",
        password: "",
        name: "",
        gender: "",
        age: "",
        seq: "",
        type: "",
        state: true
      },

      //添加表单的验证规则对象
      addFormRules: {
        id: [{ required: true, message: "请输入员工ID", trigger: "blur" }],
        account: [
          { required: true, message: "请输入员工账户", trigger: "blur" }       
        ],
        age: [{ required: true, message: "请输入员工年龄", trigger: "blur" },
        { validator: isNum, trigger: 'blur' }],
        // password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // name: [{ required: true, message: "请输入员工姓名", trigger: "blur" }],
        // gender: [{ required: true, message: "请输入员工性别", trigger: "blur" }],
        // 
        // seq: [{ required: true, message: "请输入员工编号", trigger: "blur" }],
        // type: [{ required: true, message: "请输入员工类型", trigger: "blur" }],
        // state: [{ required: true, message: "请输入员工账户状态", trigger: "blur" }],
      },
      //查询到的物资修改对象
      editForm: {
        id: "",
        account: "",
        password: "",
        name: "",
        gender: "",
        age: "",
        seq: "",
        type: "",
        state: false
      }
    };
  },
  //生命周期函数
  created() {
    this.totalItems = this.tableDataBegin.length;
    if (this.totalItems > this.pageSize) {
      for (let index = 0; index < this.pageSize; index++) {
        this.tableDataEnd.push(this.tableDataBegin[index]);
      }
    } else {
      this.tableDataEnd = this.tableDataBegin;
    }
  },

  //当前页面的一些事件处理函数
  methods: {
    //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    //用两个变量接收currentChangePage函数的参数
    doFilter() {
      if (this.tableDataName == "") {
        this.$message.warning("查询条件不能为空！");
        return;
      }
      this.tableDataEnd = [];
      //每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = [];
      this.tableDataBegin.forEach((value, index) => {
        if (value.name) {
          if (value.name.indexOf(this.tableDataName) >= 0) {
            this.filterTableDataEnd.push(value);
          }
        }
      });

      //页面数据改变重新统计数据数量和当前页
      this.currentPage = 1;
      this.totalItems = this.filterTableDataEnd.length;
      //渲染表格,根据值
      this.currentChangePage(this.filterTableDataEnd);
      //页面初始化数据需要判断是否检索过
      this.flag = true;
      this.tableDataName = "";
    },

    //监听pagesize改变的事件
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.handleCurrentChange(this.currentPage);
    },
    //监听页码值改变的事件
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      //需要判断是否检索
      this.currentChangePage(this.tableDataBegin);
      // if (!this.flag) {
      //tableDataBegin不能写成tableDataEnd，不然在没有进行搜索功能的时候，不能进行分页操作，数据丢失
      this.currentChangePage(this.tableDataBegin);
      // } else {
      //   this.currentChangePage(this.filterTableDataEnd);
      // }
    }, //组件自带监控当前页码
    currentChangePage(list) {
      let from = (this.currentPage - 1) * this.pageSize;
      let to = this.currentPage * this.pageSize;
      this.tableDataEnd = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from]);
        }
      }
    },
    //取消搜索
    toggleSelection() {
      //直接重新加载界面，但是这样会出现一个问题：原先添加的元素消失了
      // this.reload()
      this.totalItems = this.tableDataBegin.length;
      if (this.totalItems > this.pageSize) {
        this.tableDataEnd = [];
        for (let index = 0; index < this.pageSize; index++) {
          this.tableDataEnd.push(this.tableDataBegin[index]);
        }
      } else {
        this.tableDataEnd = this.tableDataBegin;
      }
    },
    // 监听添加用户对话框的关闭事件
    resetForm() {
      this.addForm={}
      this.$refs.addForm.resetFields();
    },
    // 点击按钮，添加新的物资记录
    //尚未实现持久化
    addResource() {
      const _this = this;
      this.$refs.addForm.validate(valid => {
        if (!valid) return;
        //可以添加用户
        //参考深拷贝
        let itemForm = JSON.parse(JSON.stringify(this.addForm));
        console.log(itemForm);
        _this.tableDataBegin.push(itemForm);
        console.log(_this.tableDataBegin);
        //隐藏添加用户的对话框
        this.addDialogVisible = false;
        //显示提示信息
        this.$message.success("添加成功！");
      });
    },
    //展示编辑物资信息的对话框
    showEditDialog(id, account, password, name, gender, age, seq, type, state) {
      console.log(id, account, password, name, gender, age, seq, type, state);
      this.editForm = {
        id,
        account,
        password,
        name,
        gender,
        age,
        seq,
        type,
        state
      };
      this.editDialogVisible = true;
    },
    //监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editForm.resetFields();
    },

    //修改物资信息并且提交
    editResource() {
      const _this = this;

      //可以添加用户
      //参考深拷贝
      let itemForm = JSON.parse(JSON.stringify(this.editForm));
      console.log(itemForm);
      let keywords = itemForm.id;
      console.log(keywords);
      // _this.tableDataBegin.push(itemForm);

      this.tableDataBegin.forEach((value, index) => {
        if (value.id) {
          if (value.id == keywords) {
            _this.tableDataBegin.splice(index, 1);
          }
        }
      });
      _this.tableDataBegin.push(itemForm);
      console.log(_this.tableDataBegin);
      //隐藏添加用户的对话框
      this.editDialogVisible = false;
      //显示提示信息
      this.$message.success("修改成功！");
    },

    //根据id删除物资信息
    async removeById(id) {
      //弹框询问用户是否需要删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该记录, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      //如果确定，返回值就是“confirm”
      //如果取消，返回值就是“cancel”
      // console.log(confirmResult)
      if (confirmResult != "confirm") {
        return this.$message.info("已取消删除");
      } else {
        const _this = this;

        let keywords = id;
        console.log(keywords);
        // _this.tableDataBegin.push(itemForm);

        this.tableDataBegin.forEach((value, index) => {
          if (value.id) {
            if (value.id == keywords) {
              _this.tableDataBegin.splice(index, 1);
            }
          }
        });

        console.log(_this.tableDataBegin);

        this.$message.success("删除成功！");
      }
    }
  }
};
</script>

<style lang="less" scoped>

/**卡片的格式 */
.el-card {
  /* box-shadow: 0 1px 1px rgba(115, 171, 194, 0.15)!important; */
  background: #ffffff60;
  background: linear-gradient(to right bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.3));
  border-radius: 25px;
  
}
.el-breadcrumb  /deep/  .el-breadcrumb__inner 
      {
        color: #ccc !important;
    }

</style>
