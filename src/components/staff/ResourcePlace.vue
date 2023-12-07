//工作人员物资位置维护界面
<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工作人员界面</el-breadcrumb-item>
      <el-breadcrumb-item>物资位置维护</el-breadcrumb-item>
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
              content="根据物资存放处模糊查询"
              placement="top"
            >
              <el-input
                placeholder="请输入物资存放处名称"
                v-model="tableDataName"
              >
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
        <el-col :span="6"
          ><div>
            <!-- <el-button type="danger" round>删除</el-button> -->
          </div></el-col
        >
      </el-row>

      <div class="tablecontainer">
      <!-- 物资列表区域 -->
      <el-table
        ref="multipleTable"
        :data="tableDataEnd"
        tooltip-effect="dark"
        style="width: 100%"
        :default-sort="{ prop: 'id' }"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column prop="id" label="ID" sortable=""> </el-table-column>
        <el-table-column prop="place" label="物资存放地点" width="400px">
        </el-table-column>
        <el-table-column prop="content" label="物资内容" width="200px">
        </el-table-column>
        <el-table-column prop="location" label="地理位置"  width="200px">
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改物资位置记录"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click="
                  showEditDialog(
                    scope.row.id,
                    scope.row.place,
                    scope.row.content,
                    scope.row.location
                  )
                "
              ></el-button>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              content="删除物资位置记录"
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
        title="添加物资位置记录"
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
          <el-form-item label="物资存放处：" prop="place">
            <el-input v-model="addForm.place"></el-input>
          </el-form-item>
          <el-form-item label="物资内容：" prop="content">
            <el-input v-model="addForm.content"></el-input>
          </el-form-item>
          <el-form-item label="地理位置：" prop="position">
            <el-input v-model="addForm.location"></el-input>
          </el-form-item>

          <el-form-item>
            <div class="map">
              <el-input
               
                v-model="addressKeyword"
                placeholder="请输入地址来直接查找相关位置"
              ></el-input>
              <!-- 给地图加点击事件getLocationPoint，点击地图获取位置相关的信息，经纬度啥的 -->
              <!-- scroll-wheel-zoom：是否可以用鼠标滚轮控制地图缩放，zoom是视图比例 -->
              <baidu-map
                class="bmView"
                :scroll-wheel-zoom="true"
                :center="location"
                :zoom="zoom"
                @click="addLocationPoint"
                ak="NfH4n0hrjmWGSviuZLg3mUwQUzU47SSl"
              >
                <bm-view style="width: 100%; height:200px; flex: 1"></bm-view>
                <bm-local-search
                  :keyword="addressKeyword"
                  :auto-viewport="true"
                  style="display: none"
                ></bm-local-search>
              </baidu-map>
            </div>
          </el-form-item>
        </el-form>

        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addResource">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改物资的对话框 -->
      <el-dialog
        title="修改物资位置记录"
        :visible.sync="editDialogVisible"
        width="50%"
        label-width="auto"
        size="mini"
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
          <el-form-item label="物资存放处">
            <el-input v-model="editForm.place" ></el-input>
          </el-form-item>
          <el-form-item label="物资内容">
            <el-input v-model="editForm.content"></el-input>
          </el-form-item>
          <el-form-item label="地理位置">
            <el-input v-model="editForm.location" ></el-input>
          </el-form-item>

           <el-form-item>
            <div class="map">
              <el-input
               
                v-model="addressKeyword"
                placeholder="请输入地址来直接查找相关位置"
              ></el-input>
              <!-- 给地图加点击事件getLocationPoint，点击地图获取位置相关的信息，经纬度啥的 -->
              <!-- scroll-wheel-zoom：是否可以用鼠标滚轮控制地图缩放，zoom是视图比例 -->
              <baidu-map
                class="bmView"
                :scroll-wheel-zoom="true"
                :center="location"
                :zoom="zoom"
                @click="editLocationPoint"
                ak="NfH4n0hrjmWGSviuZLg3mUwQUzU47SSl"
              >
                <bm-view style="width: 100%; height:200px; flex: 1"></bm-view>
                <bm-local-search
                  :keyword="addressKeyword"
                  :auto-viewport="true"
                  style="display: none"
                ></bm-local-search>
              </baidu-map>
            </div>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editResourcePlace">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      tableDataBegin: [
        {
          id: "192",
          place: "应急食物供应企业的提货点",
          content: "方便面",
          location: "（120，36）",
        },
        {
          id: "103",
          place: "市政中心供水站",
          content: "饮用水",
          location: "（2，98）",
        },
        {
          id: "134",
          place: "境内贸易港口应急物资调度中心",
          content: "新鲜水果",
          location: "（32，125）",
        },
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
        id: "100",
        place: "",
        content: "",
        location: "",
      },
      //添加表单的验证规则对象
      addFormRules: {
        id: [{ required: true, message: "请输入物资ID", trigger: "blur" }],
        place: [{ required: true, message: "请输入物资名称", trigger: "blur" }],
      },
      //查询到的物资修改对象
      editForm: {
        id: "",
        place: "",
        content: "",
        location: "",
      },

      location: {
        lng: 116.404,
        lat: 39.915,
      },
      zoom: 12.8,
      addressKeyword: "",
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
    addLocationPoint(e) {
      this.lng = e.point.lng;
      this.lat = e.point.lat;
      /* 创建地址解析器的实例 */
      let geoCoder = new BMap.Geocoder();
      /* 获取位置对应的坐标 */
      geoCoder.getPoint(this.addressKeyword, (point) => {
        this.selectedLng = point.lng;
        this.selectedLat = point.lat;
      });
      /* 利用坐标获取地址的详细信息 */
      geoCoder.getLocation(e.point, (res) => {
        console.log(res);
        this.addForm.location = "(" +this.lng+ " , "+ this.lat+ ")"
      });
    },

    editLocationPoint(e) {
      this.lng = e.point.lng;
      this.lat = e.point.lat;
      /* 创建地址解析器的实例 */
      let geoCoder = new BMap.Geocoder();
      /* 获取位置对应的坐标 */
      geoCoder.getPoint(this.addressKeyword, (point) => {
        this.selectedLng = point.lng;
        this.selectedLat = point.lat;
      });
      /* 利用坐标获取地址的详细信息 */
      geoCoder.getLocation(e.point, (res) => {
        console.log(res);
        this.editForm.location = "(" +this.lng+ " , "+ this.lat+ ")"
      });
    },

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
        if (value.place) {
          if (value.place.indexOf(this.tableDataName) >= 0) {
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
      this.addForm= {
        id: "100",
        place: "",
        content: "",
        location: "",
      }
      this.addressKeyword = "";
    },
    // 点击按钮，添加新的记录
    //尚未实现持久化
    addResource() {
      const _this = this;
      this.$refs.addForm.validate((valid) => {
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
    showEditDialog(id, place, content, location) {
      console.log(id, place, content, location);
      this.editForm = { id, place, content, location };
      this.editDialogVisible = true;
    },

    //修改物资位置并且提交
    editResourcePlace() {
      const _this = this;

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

    //根据id删除信息
    async removeById(id) {
      //弹框询问用户是否需要删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该记录, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
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
  },
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
