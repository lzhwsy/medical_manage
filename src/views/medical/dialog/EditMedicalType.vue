<template>
  <el-dialog v-model="EditDialogVisible" title="修改用户" width="40%" draggable @close="EditClose">
    <el-form ref="MedicalTypeDetail" :model="MedicalTypeDetail" :rules="rules">
      <el-form-item label="药品名" prop="medical_type">
        <el-input class="input" v-model="MedicalTypeDetail.medical_type" prefix-icon="message"></el-input>
      </el-form-item>
      <el-form-item label="药品分类" prop="medical_sort">
        <el-select v-model="MedicalTypeDetail.medical_sort" placeholder="请输入您的职业">
          <el-option label="中成药" value="中成药"/>
          <el-option label="西药" value="西药"/>
          <el-option label="保健品" value="保健品"/>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="EditDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="Edit('MedicalTypeDetail')">确认修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {EditMedicalType} from "@/network/medical";

export default {
  name: "EditMedicalType",
  data() {
    return {
      EditDialogVisible: false,
      MedicalTypeDetail: {
        id:'',
        medical_type: '',
        medical_sort: '',
        level:'',
      },
      rules: {
        medical_type: [
          {required: true, message: '请修改分类名', trigger: 'blur'},
        ],
        medical_sort: [
          {required: true, message: '请选择分类列表',trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    Edit(item) {
      this.$refs[item].validate((valid) => {
        if (valid) {
          EditMedicalType(this.MedicalTypeDetail).then(res => {
            if (res.flag) {
              this.$message.success(res.msg)
            } else {
              this.$message.error(res.msg);
            }
            this.EditDialogVisible = false
            this.$emit('Edit')
          })
        } else {
          this.$message.error('格式错误!!');
          this.EditDialogVisible = false
          return false;
        }
      });
    },
    EditClose(){
      this.$refs.MedicalTypeDetail.resetFields()
    }
  },

}
</script>

<style scoped>

</style>
