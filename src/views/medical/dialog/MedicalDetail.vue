<template>
  <el-dialog
      v-model="visible"
      title="药品详情"
      width="50%"
  >
    <el-descriptions :column="1" border>
      <el-descriptions-item label="通用名" label-align="right" align="center" label-class-name="my-label"
                            class-name="my-content" width="50px">
        {{ itemDetail.goods_name }}
      </el-descriptions-item>
      <el-descriptions-item label="包装规格" label-align="right" align="center">
        <el-tag size="small">{{ itemDetail.goods_size }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="剂型/型号" label-align="right" align="center">
        <el-tag size="small">{{ itemDetail.goods_type }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="有效期" label-align="right" align="center">
        <el-tag size="small" type="danger">{{ itemDetail.validity }}月</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="有效期" label-align="right" align="center">
        ￥{{ itemDetail.goods_price }}元
      </el-descriptions-item>
      <el-descriptions-item label="批准文号" label-align="right" align="center">
        <el-tag size="small">{{ itemDetail.standard }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="生产企业" label-align="right" align="center">
        {{ itemDetail.goods_production }}
      </el-descriptions-item>
      <el-descriptions-item label="适应症" label-align="right" align="center">
        {{ itemDetail.goods_effect }}
      </el-descriptions-item>
      <el-descriptions-item label="用法用量" label-align="right" align="center">
        {{ itemDetail.goods_use }}
      </el-descriptions-item>
      <el-descriptions-item label="贮藏" label-align="right" align="center">
        {{ itemDetail.Storage }}
      </el-descriptions-item>
      <el-descriptions-item label="性状" label-align="right" align="center">
        {{ itemDetail.goods_character }}
      </el-descriptions-item>
      <el-descriptions-item label="注意事项" label-align="right" align="center">
        {{ itemDetail.note }}
      </el-descriptions-item>
      <el-descriptions-item label="禁忌" label-align="right" align="center">
        {{ itemDetail.taboo }}
      </el-descriptions-item>
      <el-descriptions-item label="不良反应" label-align="right" align="center">
      {{ itemDetail.untoward_reaction }}
    </el-descriptions-item>

    </el-descriptions>
  </el-dialog>
</template>

<script>
export default {
  name: "EditMedicalDetail",
  props: {
    itemDetail: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      visible: false
    }
  }
}
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.my-label {
  background: var(--el-color-success-light-9);
}
.my-content {
  background: var(--el-color-danger-light-9);
}

.el-dialog__header{
  text-align: center;
}
</style>
