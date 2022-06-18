<template>
  <el-dialog v-model="EditVisible" title="修改药品参数" width="50%" draggable @close="EditClose">
    <el-form ref="medicalDetail" :model="medicalDetail" :rules="rules">
      <el-form-item>
        <el-form-item label="药品名" prop="goods_name">
          <el-input class="input" v-model="medicalDetail.goods_name" prefix-icon="Suitcase" disabled></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="包装规格" prop="goods_size">
        <el-input class="input" v-model="medicalDetail.goods_size" prefix-icon="Tools"></el-input>
      </el-form-item>
      <el-form-item label="剂型/型号" prop="goods_type">
        <div class="block">
          <span class="demonstration">请选择剂型</span>
          <el-cascader
              v-model="medicalDetail.goods_type"
              :options="MedicalType"
              :props="typeProps"
          >
          </el-cascader>
        </div>
      </el-form-item>
      <el-form-item label="有效期" prop="validity">
        <el-input class="input" type="number" v-model="medicalDetail.validity" prefix-icon="SuccessFilled"></el-input>
      </el-form-item>
      <el-form-item label="药品价格" prop="goods_price">
        <el-input class="input" type="number" precision="2" v-model="medicalDetail.goods_price"
                  prefix-icon="TrendCharts"></el-input>
      </el-form-item>
      <el-form-item label="生产企业" prop="goods_production">
        <el-input class="input" v-model="medicalDetail.goods_production" prefix-icon="School"></el-input>
      </el-form-item>
      <el-form-item label="药品剩余数量" prop="goods_number">
        <el-input class="input" type="number" v-model="medicalDetail.goods_number" prefix-icon="box"></el-input>
      </el-form-item>
      <el-form-item label="禁忌">
        <el-input class="input" v-model="medicalDetail.taboo" prefix-icon="box"></el-input>
      </el-form-item>
      <el-form-item label="不良反应">
        <el-input class="input" v-model="medicalDetail.untoward_reaction" prefix-icon="box"></el-input>
      </el-form-item>
      <el-form-item label="贮藏">
        <el-input class="input" v-model="medicalDetail.Storage" prefix-icon="box"></el-input>
      </el-form-item>
      <el-form-item label="注意事项">
        <el-input class="input" type="textarea" v-model="medicalDetail.note" prefix-icon="box"></el-input>
      </el-form-item>
      <el-form-item label="适应症">
        <el-input class="input" type="textarea" v-model="medicalDetail.goods_effect" prefix-icon="box"></el-input>
      </el-form-item>
      <el-form-item label="用法用量">
        <el-input class="input" type="textarea" v-model="medicalDetail.goods_use" prefix-icon="box"></el-input>
      </el-form-item>
      <el-form-item label="性状">
        <el-input class="input" type="textarea" v-model="medicalDetail.goods_character" prefix-icon="box"></el-input>
      </el-form-item>
      <el-form-item label="注意事项">
        <el-input class="input" type="textarea" v-model="medicalDetail.note" prefix-icon="box"></el-input>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="EditVisible = false">取消</el-button>
        <el-button type="primary" @click="Edit('medicalDetail')">确认修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {MedicalSize} from "@/network/medical";
import {EditMedical} from "@/network/medical";


export default {
  name: "EditMedicalDetail",
  created() {
    this.getMedicalSize()
  },
  data() {
    return {
      EditVisible: false,
      MedicalType: [],
      typeProps: {
        value: 'size',
        label: 'size',
        children: 'children'
      },
      medicalDetail: {
        goods_name: '',
        goods_size: '',
        goods_type: '',
        validity: '',
        goods_price: '',
        goods_production: '',
        goods_number: '',
        note: '',
        goods_use: ''
      },
      rules: {
        goods_name: [{required: true, message: '请输入药品名', trigger: 'blur'},],
        goods_size: [{required: true, message: '请输入药品规格参数', trigger: 'blur'},],
        goods_type: [{required: true, message: '请选择剂型'}],
        validity: [{required: true, message: '请输入有效期月份', trigger: 'blur',},],
        goods_price: [{required: true, message: '请输入药品价格', trigger: 'blur'},],
        goods_production: [{required: true, message: '请输入厂家', trigger: 'blur'},],
        goods_number: [{required: true, message: '请输入产品剩余数量', trigger: 'blur'},],
      }
    }
  },
  methods: {
    //获取级联规格选择
    getMedicalSize() {
      MedicalSize().then(res => {
        console.log(res.sizeResult)
        this.MedicalType = res.sizeResult
      })
    },
    //编辑提交及校验
    Edit(item) {
      this.$refs[item].validate((valid) => {
        if (valid) {
          EditMedical(this.medicalDetail).then(res => {
            if (res.flag) {
              this.$message.success('修改成功')
            } else {
              this.$message.error('修改失败');
            }
            this.EditVisible = false
          })
        }
      });
    },
    EditClose() {
      this.$refs.medicalDetail.resetFields()
    }
  },
}
</script>

<style scoped>

</style>
