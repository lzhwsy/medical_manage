<template>
  <div>
    <bread-crumb path1="/TCM">
      <template v-slot:one>订单管理</template>
      <template v-slot:two>订单处理</template>
    </bread-crumb>

    <el-card>
      <el-row>
        <!--       输入框-->
        <el-col :span="10">
          <order-process-input :queryInfo="queryInfo"></order-process-input>
        </el-col>
      </el-row>
<!--      表格-->
      <el-row>
        <el-col>
          <order-process-table :List="List"></order-process-table>
        </el-col>
      </el-row>

      <!--      分页-->
      <user-pagination :queryInfo="queryInfo"
                       :total="total"
                       class="fenYe"
                       @handleCurrentChange="handleCurrentChange"
                       @handleSizeChange="handleSizeChange"
      />
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from "@/components/content/common/BreadCrumb";

import OrderProcessInput from "@/components/content/input/OrderProcessInput";
import OrderProcessTable from "@/views/order/table/OrderProcessTable";

import {OrderList} from "@/network/order";

export default {
  name: "OrderProcessing",
  components: {
    BreadCrumb,
    OrderProcessInput,
    OrderProcessTable
  },
  created() {
    this.getOrderList()
  },
  data() {
    return {
      queryInfo: {
        query: '',
        pageNum: 1,//当前页码
        pageSize: 10//每页条数
      },
      total: 0,
      List:[]
    }
  },
  methods:{
    getOrderList(){
      OrderList(this.queryInfo).then(res=>{
        console.log(res)
        this.List = res.data
        this.total = res.total
      })
    }
  }
}
</script>

<style scoped>
div.el-row{
  margin-bottom:10px
}
</style>
