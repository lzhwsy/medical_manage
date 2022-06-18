<template>
  <div>
    <el-table
        :data="List"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        border
    >
      <el-table-column type="index" width="50"/>
      <el-table-column prop="order_number" label="订单编号" width="200"/>
      <el-table-column label="订单价格" width="100">
        <template v-slot="scope">
          ￥{{ scope.row.order_price }}
        </template>
      </el-table-column>
      <el-table-column prop="order_pay" label="是否付款" width="100">
        <template v-slot="scope" >
<!--          0 未支付 1 支付宝 2 微信 3 银行卡-->
          <el-tag v-if="scope.row.order_pay == '0'" type="info">未支付</el-tag>
          <el-tag v-else-if="scope.row.order_pay == '1'" type="success">支付宝支付</el-tag>
          <el-tag v-else-if="scope.row.order_pay == '2'" type="warning">微信支付</el-tag>
          <el-tag v-else-if="scope.row.order_pay == '3'" >银行卡支付</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="100"/>
      <el-table-column label="下单时间" width="120">
        <template v-slot="scope">
          {{scope.row.create_time | mapTime}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="scope">
              <el-button size="mini" type="primary" icon="Edit" @click="ShowEdit(scope.row)"></el-button>
              <el-button size="mini" type="warning" icon="Share"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapTime} from "@/components/common/utils";

export default {
  name: "OrderProcessTable",
  props: {
    List: {
      type: Object,
      default: {}
    }
  },
  created() {
    console.log(this.List)
  },
  methods:{
    mapTime
  }
}
</script>

<style scoped>

</style>
