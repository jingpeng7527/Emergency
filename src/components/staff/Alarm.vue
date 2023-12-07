//工作人员接报管理界面
<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工作人员界面</el-breadcrumb-item>
      <el-breadcrumb-item>接报管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 搜索与添加区 -->
      <!-- 栅格布局 -->

      <el-row :gutter="20">
        <el-col :span="6">
          <div>
            <el-button type="success" round @click="addDialogVisible = true">新增接报</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-button round @click="toggleSelection()">取消搜索</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-tooltip class="item" effect="dark" content="根据事件名称模糊查询" placement="top">
              <el-input placeholder="请输入事件名称" v-model="tableDataName">
                <el-button slot="append" icon="el-icon-search" @click="doFilter"></el-button>
              </el-input>
            </el-tooltip>
          </div>
          <el-col> </el-col>
        </el-col>
        <el-col :span="6">
          <div>
            <!-- <el-button type="danger" round>删除</el-button> -->
          </div>
        </el-col>
      </el-row>

      <!-- 信息列表区域 -->
      <div class="tablecontainer">
        <el-table ref="multipleTable" :data="tableDataEnd" tooltip-effect="dark" style="width: 100%"
          :default-sort="{ prop: 'id' }">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="id" label="ID" sortable="" width="70">
          </el-table-column>
          <el-table-column prop="name" label="事件名称" width="120">
          </el-table-column>
          <el-table-column prop="num" label="事件接报编码" width="80">
          </el-table-column>
          <el-table-column prop="seq" label="流程编号" width="80">
          </el-table-column>
          <el-table-column prop="type" label="流程类型" width="120">
          </el-table-column>
          <el-table-column prop="creatTime" label="流程创建时间" width="120">
          </el-table-column>
          <el-table-column prop="person" label="报警人" width="100">
          </el-table-column>
          <el-table-column prop="phone" label="报警人联系电话" width="120">
          </el-table-column>
          <el-table-column prop="alarmTime" label="接报时间" width="120">
          </el-table-column>
          <el-table-column prop="enterprise" label="风险企业" width="120">
          </el-table-column>
          <el-table-column prop="lastModifyTime" label="流程最后修改时间" width="120">
          </el-table-column>
          <el-table-column prop="lastModifyPerson" label="最后更新者" width="120">
          </el-table-column>
          <el-table-column prop="state" label="流程状态" width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.state == '已接报'">
                已接报
              </el-tag>
              <el-tag type="danger" v-if="scope.row.state == '已移交专家'">
                已移交专家
              </el-tag>
              <el-tag type="warning" v-if="scope.row.state == '专家已回复'">
                专家已回复
              </el-tag>
              <el-tag type="success" v-if="scope.row.state == '已通过'">
                已通过
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="查看详情" placement="top" :enterable="false">
                <el-button type="primary" icon="el-icon-search" circle @click="
                  showEditDialog(
                    scope.row.id,
                    scope.row.name,
                    scope.row.num,
                    scope.row.seq,
                    scope.row.type,
                    scope.row.creatTime,
                    scope.row.person,
                    scope.row.phone,
                    scope.row.alarmTime,
                    scope.row.enterprise,
                    scope.row.lastModifyTime,
                    scope.row.lastModifyPerson,
                    scope.row.state
                  ),
                    change()
                "></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- id, name, num, seq, type, creatTime, person, phone, alarmTime, enterprise, lastModifyTime, lastModifyPerson, state -->
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[1, 4, 8, 10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems">
      </el-pagination>

      <!-- 添加接报的对话框 -->
      <el-dialog title="添加接报信息" :visible.sync="addDialogVisible" width="50%" @close="resetForm">
        <!-- 内容主体区 -->
        <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="auto" size="mini">
          <el-form-item label="ID：" prop="id">
            <el-input v-model="addForm.id"></el-input>
          </el-form-item>
          <el-form-item label="接报名称：" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="事件接报编码：" prop="num">
            <el-input v-model="addForm.num"></el-input>
          </el-form-item>
          <el-form-item label="流程编号：" prop="seq">
            <el-input v-model="addForm.seq"></el-input>
          </el-form-item>
          <el-form-item label="流程类型：">
            <el-select v-model="addForm.type" placeholder="请选择流程类型">
              <el-option label="一级" value="一级"></el-option>
              <el-option label="二级" value="二级"></el-option>
              <el-option label="三级" value="三级"></el-option>
              <el-option label="四级" value="四级"></el-option>
              <el-option label="五级" value="五级"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="流程创建时间：" prop="creatTime">
            <!-- <el-input v-model="addForm.creatTime"></el-input> -->
            <el-date-picker v-model="addForm.creatTime" type="datetime" placeholder="选择日期时间" align="right"
              :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="报警人：" prop="person">
            <el-input v-model="addForm.person"></el-input>
          </el-form-item>
          <el-form-item label="报警人联系电话：" prop="phone">
            <el-input v-model="addForm.phone"></el-input>
          </el-form-item>
          <!-- <el-form-item label="接报时间：" prop="alarmtime">
            <el-input v-model="addForm.alarmtime"></el-input>
          </el-form-item> -->
          <el-form-item label="风险企业：" prop="enterprise">
            <!-- <el-input v-model="addForm.enterprise"></el-input> -->
            <el-select v-model="addForm.enterprise" placeholder="请选择流程类型">
              <el-option label="东软睿道" value="东软睿道"></el-option>
              <el-option label="石油公司" value="石油公司"></el-option>
              <el-option label="斯柯达企业" value="斯柯达企业"></el-option>
              <el-option label="佛山美的" value="佛山美的"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="流程最后修改时间：" prop="lastModifyTime">
            <el-input v-model="addForm.lastModifyTime"></el-input>
          </el-form-item>
          <el-form-item label="最后更新者：" prop="lastModifyPerson">
            <el-input v-model="addForm.lastModifyPerson"></el-input>
          </el-form-item>
          <el-form-item label="流程状态：" prop="state">
            <el-input v-model="addForm.state"></el-input>
          </el-form-item> -->
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAlarm">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改信息的对话框 -->
      <el-dialog title="填写审批内容" :visible.sync="editDialogVisible" width="50%" label-width="auto" size="mini"
        @close="editDialogClosed">
        <!-- 内容主体区 -->
        <el-steps :active="activeIndex" finish-status="success" align-center>
          <el-step title="接报维护"></el-step>
          <el-step title="接报审批"></el-step>
          <el-step title="专家介入"></el-step>
          <el-step title="流程结束"></el-step>
        </el-steps>

        <el-form :model="editForm" :rules="modifyFormRules" ref="editForm" label-width="auto">
          <el-form-item label="ID">
            <el-input v-model="editForm.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="事件名称">
            <el-input v-model="editForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="事件接报编码">
            <el-input v-model="editForm.num" disabled></el-input>
          </el-form-item>
          <el-form-item label="流程状态">
            <el-input v-model="editForm.state" disabled></el-input>
          </el-form-item>
          <!-- <el-form-item label="审批备注" prop="comments">
            <el-input v-model="editForm.comments"></el-input>
          </el-form-item> -->
        </el-form>

        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-col :span="15">
            <!-- <el-button type="primary" @click="pass()">通 过</el-button>
            <el-button type="success" @click="submitProfessor()">提交专家</el-button>-->
          </el-col>
          <!-- <el-button @click="editDialogVisible = false">取 消</el-button> -->
          <el-button @click="(editDialogVisible = false), (activeIndex = 1)">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
// v-model="activeIndex"
<script>
  export default {
    inject: ["reload"],
    data() {
      return {
        tableDataBegin: [{
            id: "1",
            name: "自然灾害水旱灾害",
            num: "360",
            type: "一级",
            creatTime: "2021-05-03 11:11:11",
            person: "桃桃",
            phone: "9011910826",
            seq: "16",
            alarmTime: "2021-05-03",
            enterprise: "石油公司",
            lastModifyTime: "2021-05-03 12:55:55",
            lastModifyPerson: "专家人员1",
            state: "专家已回复"
          },
          {
            id: "2",
            name: "公交倒翻",
            num: "1700",
            type: "二级",
            creatTime: "2021-05-03 11:11:11",
            person: "苹苹",
            phone: "9039847561",
            seq: "3",
            date: "2021-1-17",
            alarmTime: "2021-05-03",
            enterprise: "石油公司",
            lastModifyTime: "2021-05-03 12:55:55",
            lastModifyPerson: "工作人员1",
            state: "已接报"
          },
          {
            id: "3",
            name: "地震灾害",
            num: "1500",
            type: "五级",
            creatTime: "2021-05-03 11:11:11",
            person: "苹苹",
            phone: "9039847561",
            seq: "4",
            date: "2020-05-17",
            alarmTime: "2021-05-03",
            enterprise: "东软睿道",
            lastModifyTime: "2021-05-03 12:55:55",
            lastModifyPerson: "工作人员1",
            state: "已接报"
          },
          {
            id: "4",
            name: "地震灾害",
            num: "600",
            type: "五级",
            creatTime: "2021-05-03 11:11:11",
            person: "苹苹",
            phone: "9039847561",
            seq: "16",
            date: "2021-05-03",
            alarmTime: "2021-05-03",
            enterprise: "斯科达企业",
            lastModifyTime: "2021-05-03 12:55:55",
            lastModifyPerson: "工作人员1",
            state: "已接报"
          },
          {
            id: "5",
            name: "矿泉水污染",
            num: "25",
            type: "一级",
            creatTime: "2021-05-03 11:11:11",
            person: "桃桃",
            phone: "9011910826",
            seq: "19",
            date: "2021-05-03",
            alarmTime: "2021-05-03",
            enterprise: "斯科达企业",
            lastModifyTime: "2021-05-03 12:55:55",
            lastModifyPerson: "工作人员1",
            state: "已接报"
          }
        ],

        addFormRules: {
          id: [{
            required: true,
            message: "请输入ID",
            trigger: "blur"
          }],
          name: [{
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }]
        },

        tableDataName: "",
        tableDataEnd: [],
        currentPage: 1,
        pageSize: 8,
        totalItems: 0,
        filterTableDataEnd: [],
        flag: false,
        multipleSelection: [],
        // //控制添加信息对话框的显示与隐藏
        addDialogVisible: false,
        //控制修改信息对话框的显示与隐藏
        editDialogVisible: false,
        //修改备注的验证规则对象
        modifyFormRules: {
          comments: [{
            required: true,
            message: "请输入备注",
            trigger: "blur"
          }]
        },
        activeIndex: 1,
        //查询到的信息修改对象
        editForm: {},
        addForm: {
          id: "6",
          name: "",
          num: "",
          type: "",
          creatTime: "",
          person: "",
          phone: "",
          seq: "",
          date: "",
          alarmTime: "",
          enterprise: "",
          lastModifyTime: "",
          lastModifyPerson: "",
          state: ""
        },
        pickerOptions: {
          shortcuts: [{
              text: "今天",
              onClick(picker) {
                picker.$emit("pick", new Date());
              }
            },
            {
              text: "昨天",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit("pick", date);
              }
            },
            {
              text: "一周前",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", date);
              }
            }
          ]
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
        // this.addForm={}
        this.$refs.addForm.resetFields();
      },
      //展示编辑信息的对话框
      showEditDialog(
        id,
        name,
        num,
        seq,
        type,
        creatTime,
        person,
        phone,
        alarmTime,
        enterprise,
        lastModifyTime,
        lastModifyPerson,
        state
      ) {
        // console.log(id, name, num, seq, type, creatTime, person, phone, alarmTime, enterprise, lastModifyTime, lastModifyPerson, state)
        this.editForm = {
          id,
          name,
          num,
          seq,
          type,
          creatTime,
          person,
          phone,
          alarmTime,
          enterprise,
          lastModifyTime,
          lastModifyPerson,
          state
        };
        this.editDialogVisible = true;
      },
      editDialogClosed() {
        this.$refs.editForm.resetFields();
      },
      //新增接报
      addAlarm() {
        const _this = this;
        this.$refs.addForm.validate(valid => {
          if (!valid) return;
          //可以添加用户
          //参考深拷贝
          this.addForm.alarmTime = this.addForm.creatTime;
          this.addForm.lastModifyTime = this.addForm.creatTime;
          this.addForm.lastModifyPerson = "工作人员1";
          this.addForm.state = "已接报"
          let itemForm = JSON.parse(JSON.stringify(this.addForm));
          console.log(itemForm);
          _this.tableDataBegin.push(itemForm);
          console.log(_this.tableDataBegin);
          //隐藏添加用户的对话框
          this.addDialogVisible = false;
          //显示提示信息
          this.$message.success("新增接报信息成功！");
        });
      },

      // 每次打开对话框根据状态改变进度条
      change() {
        const _this = this;
        let itemForm = JSON.parse(JSON.stringify(this.editForm));
        if (itemForm.state == "已通过") {
          this.activeIndex = 4;
        } else if (itemForm.state == "已移交专家") {
          this.activeIndex = 2;
        } else if (itemForm.state == "专家已回复") {
          this.activeIndex = 3;
        }
      }
    }
  };
</script>


<style lang="less" scoped>
  .el-card {
    /* box-shadow: 0 1px 1px rgba(115, 171, 194, 0.15)!important; */
    background: #ffffff60;
    background: linear-gradient(to right bottom,
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.3));
    border-radius: 25px;

  }

  .el-breadcrumb /deep/ .el-breadcrumb__inner {
    color: #ccc !important;
  }
</style>