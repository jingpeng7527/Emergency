//工作人员城市信息维护界面
<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工作人员界面</el-breadcrumb-item>
      <el-breadcrumb-item>城市信息维护</el-breadcrumb-item>
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
            <!-- <el-button round @click="showEditDialog()">修改</el-button> -->
          </div>
        </el-col>

        <el-col :span="6">
          <div>
            <el-button type="success" round @click="addTrafficVisible = true"
              >新增交通情况</el-button
            >
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-button round @click="toggleSelection()">刷新</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-tooltip
              class="item"
              effect="dark"
              content="根据城市名称模糊查询"
              placement="top"
            >
              <el-input placeholder="请输入城市名称" v-model="tableDataName">
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
        <el-col :span="6">
          <div>
            <!-- <el-button type="danger" round>删除</el-button> -->
          </div>
        </el-col>
      </el-row>

      <!-- 城市列表区域 -->      
      <div class="tablecontainer">
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="tableDataEnd"
        tooltip-effect="dark"
        style="width: 100%"
        :default-sort="{ prop: 'id' }"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column prop="id" label="ID" sortable="" min-width="120px">
        </el-table-column>
        <el-table-column prop="name" label="城市名称" min-width="120px">
        </el-table-column>
        <el-table-column prop="code" label="城市编码" min-width="120px">
        </el-table-column>
        <el-table-column prop="province" label="省" min-width="120px">
        </el-table-column>
        <el-table-column prop="people" label="救援人数" min-width="120px">
        </el-table-column>
        <el-table-column prop="car" label="救援车辆数" min-width="120px">
        </el-table-column>

        <el-table-column label="操作" min-width="120px">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改城市信息"
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
                    scope.row.name,
                    scope.row.code,
                    scope.row.province,
                    scope.row.people,
                    scope.row.car
                  )
                "
              ></el-button>
            </el-tooltip>

            <!-- 删除按钮 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除城市信息"
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

      <!-- 添加物资的对话框 -->
      <el-dialog
        title="添加城市信息"
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
          <el-form-item label="城市名称：" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="城市编码：" prop="code">
            <el-input v-model="addForm.code"></el-input>
          </el-form-item>
          <el-form-item label="省：" prop="province">
            <el-input v-model="addForm.province"></el-input>
          </el-form-item>
          <el-form-item label="救援人数" prop="people">
            <el-input v-model="addForm.people"></el-input>
          </el-form-item>
          <el-form-item label="救援车辆数" prop="car">
            <el-input v-model="addForm.car"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addResource">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 添加交通情况的对话框 -->
      <el-dialog
        title="添加交通情况"
        :visible.sync="addTrafficVisible"
        width="80%"
        @close="resetTrafficForm"
      >
        <!-- 内容主体区 -->
        <el-form
          :model="addTrafficForm"
          ref="addTrafficForm"
          label-width="auto"
          :rules="addTrafficRules"
        >
          <el-form-item label="名称：" prop="name">
            <el-input v-model="addTrafficForm.name"></el-input>
          </el-form-item>
          <!-- <el-form-item label="起点：" prop="start">
            <el-input v-model="addTrafficForm.start"></el-input>
          </el-form-item> -->
          <el-form-item label="起点：" prop="start" style="width: 100%;">
            <el-select
              v-model="addTrafficForm.start"
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option label="东软睿道" value="NEU"></el-option>
              <el-option label="佛山美的" value="Media"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="终点：" prop="end">
            <el-input v-model="addTrafficForm.end"></el-input>
          </el-form-item> -->
          <el-form-item label="终点：" prop="end" style="width: 100%">
            <el-select
              v-model="addTrafficForm.end"
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option label="东北大学" value="spot1"></el-option>
              <el-option label="白塔街道" value="spot2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <baidu-map>
              <bm-view class="map"> </bm-view>
              <bm-driving
                start="东软睿道（东北校区）"
                end="东北大学"
                :auto-viewport="true"
                policy="BMAP_DRIVING_POLICY_LEAST_DISTANCE"
                :panel="false"
                location="北京"
              >
              </bm-driving>
            </baidu-map>
          </el-form-item>

          <el-form-item label="长度：" prop="length">
            <el-input v-model="addTrafficForm.length"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="ps">
            <el-input type="textarea" v-model="addTrafficForm.ps"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addTrafficVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTraffic">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改物资的对话框 -->
      <el-dialog
        title="修改城市记录"
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
          <el-form-item label="ID">
            <el-input v-model="editForm.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="城市名称">
            <el-input v-model="editForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="城市编码">
            <el-input v-model="editForm.code"></el-input>
          </el-form-item>
          <el-form-item label="省">
            <el-input v-model="editForm.province"></el-input>
          </el-form-item>
          <el-form-item label="救援人数">
            <el-input v-model="editForm.people"></el-input>
          </el-form-item>
          <el-form-item label="救援车辆数">
            <el-input v-model="editForm.car"></el-input>
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
      markerPoint: { lng: 116.4, lat: 39.9 },
      show: false,

      tableDataBegin: [
        {
          id: "3",
          name: "沈阳",
          code: "001",
          province: "辽宁",
          people: "100",
          car: "100"
        },
        {
          id: "4",
          name: "无锡",
          code: "214",
          province: "江苏",
          people: "200",
          car: "80"
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
      //控制增加交通信息的对话框的显示与隐藏
      addTrafficVisible: false,
      //添加物资的表单数据
      addForm: {
        id: "1",
        name: "",
        code: "",
        province: "",
        people: "",
        car: ""
      },

      //添加表单的验证规则对象
      addFormRules: {
        id: [
          {
            required: true,
            message: "请输入城市ID",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入城市名称",
            trigger: "blur"
          }
        ],
        people: [{
            required: true,
            message: "请输入救援人数",
            trigger: "blur"
          },
          { validator: isNum, trigger: 'blur' }],
        car: [{
            required: true,
            message: "请输入救援车辆数",
            trigger: "blur"
          },{ validator: isNum, trigger: 'blur' }]
      },
      //添加交通信息的验证规则对象
      addTrafficRules: {
        name: [
          {
            required: true,
            message: "请输入交通路线名称",
            trigger: "blur"
          }
        ],
        start: [
          {
            required: true,
            message: "请选择起点",
            trigger: "blur"
          }
        ],
        end: [
          {
            required: true,
            message: "请选择终点",
            trigger: "blur"
          }
        ]
      },
      //查询到的物资修改对象
      editForm: {
        id: "",
        name: "",
        code: "",
        province: "",
        people: "",
        car: ""
      },
      center: { lng: 116.404, lat: 39.915 }, 
  start: {lng: 0, lat: 0}, 
  end: {lng: 0, lat: 0}, zoom: 15,
  
      //表单中得到的交通信息
      addTrafficForm: {
        id: "",
        name: "",
        start: "",
        end: "",
        length: "",
        ps: ""
      },
      
      
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
    //监听新增交通情况对话框的关闭事件
    resetTrafficForm() {
      this.$refs.addTrafficForm.resetFields();
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
        this.$message.success("添加信息成功！");
      });
    },
    //展示编辑物资信息的对话框
    showEditDialog(id, name, code, province, people, car) {
      console.log(id, name, code, province, people, car);
      this.editForm = {
        id,
        name,
        code,
        province,
        people,
        car
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
    },
    handleClick (row) 
  { this.start.lng = 113.14999 
  this.start.lat = 27.879228 
  this.end.lng = 118.852544 
  this.end.lat = 31.947559 },

    addTraffic() {
      console.log(this.addTrafficForm);
      // this.$refs.addTrafficForm.validate(valid => {
      //   if (!valid) return;
      this.$refs.addTrafficForm.validate(valid => {
        if (!valid) return;
        this.addTrafficVisible = false;

        this.$message.success("添加成功！");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.map {
  width: 553px;
  height: 398px;
}

.el-breadcrumb  /deep/  .el-breadcrumb__inner 
      {
        color: #ccc !important;
    }

.el-card {
  /* box-shadow: 0 1px 1px rgba(115, 171, 194, 0.15)!important; */
  background: #ffffff60;
  background: linear-gradient(to right bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.3));
  border-radius: 25px;
  
}
</style>



