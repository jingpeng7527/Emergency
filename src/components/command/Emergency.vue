//指挥人员紧急事件处理界面
<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/commander' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>指挥人员界面</el-breadcrumb-item>
      <el-breadcrumb-item>紧急事件处理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 搜索与添加区 -->
      <!-- 栅格布局 -->
      <el-row :gutter="20">
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
        <el-table :data="tableDataEnd" tooltip-effect="dark" style="width: 100%" :default-sort="{ prop: 'id' }">
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
              <el-tag type="success" v-if="scope.row.state == '事件已处理'">
                事件已处理
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="填写调动" placement="top" :enterable="false">
                <el-button type="primary" icon="el-icon-edit" circle @click="showEditDialog(
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
                scope.row.state,
                scope.row.usePeople,
                scope.row.usePeopleNum,
                scope.row.useResource,
                scope.row.useResourceNum,
                scope.row.x,
                scope.row.y),change()"></el-button>
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

      <!-- 修改信息的对话框 -->
      <el-dialog title="填写处理事件内容" :visible.sync="editDialogVisible" width="50%" label-width="auto" size="mini"
        @close="editDialogClosed">
        <!-- 内容主体区 -->
        <el-steps :active="activeIndex" finish-status="success" align-center>
          <el-step title="接报维护"></el-step>
          <el-step title="接报审批"></el-step>
          <el-step title="专家介入"></el-step>
          <el-step title="审批完成"></el-step>
          <el-step title="处理事件"></el-step>
        </el-steps>

        <el-form :model="editForm" ref="editForm" label-width="auto">
          <el-form-item label="ID">
            <el-input v-model="editForm.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="调动人员">
            <!-- <el-input v-model="editForm.usePeople" disabled></el-input>
            <el-input v-model="editForm.usePeopleNum" disabled></el-input> -->
            <el-select v-model="editForm.usePeople" placeholder="请选择人员类型">
              <el-option label="消防员" value="消防员"></el-option>
              <el-option label="医护人员" value="医护人员"></el-option>
              <el-option label="特警" value="特警"></el-option>
            </el-select>
            <el-input-number v-model="editForm.usePeopleNum" :min="1" :max="5" label="描述文字">
            </el-input-number>
          </el-form-item>
          <el-form-item label="调动物资">
            <el-select v-model="editForm.useResource" placeholder="请选择物资类型">
              <el-option label="方便面" value="消防员"></el-option>
              <el-option label="农夫山泉" value="医护人员"></el-option>
              <el-option label="棉被" value="特警"></el-option>
            </el-select>
            <el-input-number v-model="editForm.useResourceNum" :min="1" :max="10" label="描述文字">
            </el-input-number>
          </el-form-item>
          <el-form-item label="位置">
            <div class="map">
              <!-- <el-input v-model="editForm.x" disabled></el-input> -->
              <!-- 给地图加点击事件getLocationPoint，点击地图获取位置相关的信息，经纬度啥的 -->
              <!-- scroll-wheel-zoom：是否可以用鼠标滚轮控制地图缩放，zoom是视图比例 -->
              <baidu-map class="bmView" :center="{lng:editForm.x,lat:editForm.y}" :scroll-wheel-zoom="true" :zoom="zoom"
                ak="NfH4n0hrjmWGSviuZLg3mUwQUzU47SSl">
                <bm-view style="width: 100%; height:200px; flex: 1"></bm-view>
                <bm-local-search :keyword="addressKeyword" :auto-viewport="true" style="display: none">
                </bm-local-search>
              </baidu-map>
            </div>
          </el-form-item>
        </el-form>

        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="pass()">确 定</el-button>
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
            name: "地震灾害",
            num: "360",
            type: "五级",
            creatTime: "2021-05-03 11:11:11",
            person: "苹果",
            phone: "243",
            seq: "16",
            alarmTime: "2021-05-03",
            enterprise: "石油公司",
            lastModifyTime: "2021-05-03 12:55:55",
            lastModifyPerson: "专家人员1",
            state: "已通过",
            usePeople: "消防员",
            usePeopleNum: "5",
            useResource: "方便面",
            useResourceNum: "10",
            x: 113.27,
            y: 23.13
          },
          {
            id: "2",
            name: "居民楼着火",
            num: "1700",
            type: "二级",
            creatTime: "2021-05-03 11:11:11",
            person: "谢俊彦",
            phone: "5446",
            seq: "3",
            date: "2021-1-17",
            alarmTime: "2021-05-03",
            enterprise: "斯科达企业",
            lastModifyTime: "2021-05-03 12:35:11",
            lastModifyPerson: "指挥人员1",
            state: "已通过",
            usePeople: "消防员",
            usePeopleNum: "5",
            useResource: "方便面",
            useResourceNum: "10",
            x: 116.326961,
            y: 39.924297
          },
          {
            id: "3",
            name: "自然灾害水旱灾害",
            num: "600",
            type: "一级",
            creatTime: "2021-05-03 11:11:11",
            person: "谢俊彦",
            phone: "6565",
            seq: "16",
            date: "2021-05-03",
            alarmTime: "2021-05-03",
            enterprise: "石油公司",
            lastModifyTime: "2021-05-03 12:55:55",
            lastModifyPerson: "指挥人员1",
            state: "已通过",
            usePeople: "消防员",
            usePeopleNum: "5",
            useResource: "方便面",
            useResourceNum: "10",
            x: 123.499033,
            y: 41.65672
          },
          {
            id: "4",
            name: "矿泉水污染",
            num: "25",
            type: "一级",
            creatTime: "2021-05-03 12:35:11",
            person: "桃桃",
            phone: "36",
            seq: "19",
            date: "2021-05-03",
            alarmTime: "2021-05-03",
            enterprise: "斯科达企业",
            lastModifyTime: "2021-05-03 12:55:55",
            lastModifyPerson: "专家人员1",
            state: "已通过",
            usePeople: "消防员",
            usePeopleNum: "5",
            useResource: "方便面",
            useResourceNum: "10",
            x: 113.27,
            y: 23.13
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
        // //控制添加信息对话框的显示与隐藏
        // addDialogVisible: false,
        //控制修改信息对话框的显示与隐藏
        editDialogVisible: false,
        //修改备注的验证规则对象
        activeIndex: 1,
        //查询到的信息修改对象
        editForm: {},
        point: "",
        num: 1,
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
      showEditDialog(id, name, num, seq, type, creatTime, person, phone, alarmTime, enterprise, lastModifyTime,
        lastModifyPerson, state, usePeople, usePeopleNum, useResource, useResourceNum, x, y) {
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
          state,
          usePeople,
          usePeopleNum,
          useResource,
          useResourceNum,
          x,
          y
        }
        this.editDialogVisible = true;
      },
      editDialogClosed() {
        this.$refs.editForm.resetFields()
      },

      // 每次打开对话框根据状态改变进度条
      change() {
        const _this = this;
        let itemForm = JSON.parse(JSON.stringify(this.editForm));
        if (itemForm.state == "已通过") {
          this.activeIndex = 4
        }else if (itemForm.state == "事件已处理") {
          this.activeIndex = 5
        }
      },

      pass() {
        this.$confirm('确认调动吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            const _this = this;
            let itemForm = JSON.parse(JSON.stringify(this.editForm));
            console.log(itemForm)
            let keywords = itemForm.id;
            console.log(keywords)

            if (itemForm.state == "事件已处理") {
              // this.editDialogVisible = true;
              this.$message({
                type: 'error',
                message: '事件已处理无法再次处理!'
              });
            } else {
              this.tableDataBegin.forEach((value, index) => {
                if (value.id) {
                  if (value.id == keywords) {
                    _this.tableDataBegin.splice(index, 1)
                    _this.$set(itemForm, 'state', "事件已处理")
                    this.activeIndex = 5
                    _this.$set(itemForm, 'lastModifyPerson', "指挥人员2")

                    var date = new Date()
                    var y = date.getFullYear();
                    var m = date.getMonth() + 1;
                    m = m < 10 ? "0" + m : m;
                    var d = date.getDate();
                    var ho = date.getHours();
                    ho = ho < 10 ? "0" + ho : ho; // 如果只有一位，则前面补零
                    var mi = date.getMinutes();
                    mi = mi < 10 ? "0" + mi : mi; // 如果只有一位，则前面补零
                    var se = date.getSeconds();
                    se = se < 10 ? "0" + se : se; // 如果只有一位，则前面补零
                    var currentTime = y + "-" + m + '-' + d + ' ' + ho + ':' + mi + ':' + se
                    _this.$set(itemForm, "lastModifyTime", currentTime)
                  }
                }
              });
              _this.tableDataBegin.push(itemForm)
              // console.log(_this.tableDataBegin);
              //隐藏添加用户的对话框
              this.editDialogVisible = true;
              this.$message({
                type: 'success',
                message: '提交成功!'
              });
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
      },

      mapReady({
        BMap,
        map
      }) {
        // 选择一个经纬度作为中心点
        // console.log(this.$refs.location22.value)
        // 113.27, 23.13
        // console.log(this.editForm.y)
        // let locc = this.editForm.location

        this.point = new BMap.Point(this.editForm.x, this.editForm.y);
        console.log(this.editForm.x, this.editForm.y);
        console.log(this.point)
        map.centerAndZoom(this.point, 12);
      }
    }
  }
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