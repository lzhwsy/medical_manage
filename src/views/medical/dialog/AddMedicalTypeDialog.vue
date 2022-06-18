<template>
  <el-dialog title="添加类别" v-model="dialogFormVisible" @close="CloseDialog">
    <el-form :model="form" ref="AddTypeForm" :rules="rules" >
      <el-form-item label="主分类(一级)" :label-width="formLabelWidth" prop="sort">
        <el-select v-model="form.sort" placeholder="请选择主类别" >
          <el-option label="中成药" value="中成药"></el-option>
          <el-option label="西药" value="西药"></el-option>
          <el-option label="保健品" value="保健品"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新增类别(二级)" :label-width="formLabelWidth" prop="type">
        <el-input v-model="form.type" autocomplete="off" ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('AddTypeForm')">确 定</el-button
      >
    </span>
    </template>
  </el-dialog>
</template>


<script>
import {AddMedicalCateList} from "@/network/medical";

export default {
name: "MedicalTypeDialog",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        sort:'',
        type:''
      },
      formLabelWidth: '120px',
      rules: {
        sort: [
          {required: true, message: '请选择主类型', trigger: 'blur'},
        ],
        type: [
          {required: true, message: '请输入新增类型', trigger: 'blur'},
          {min:2 ,message: '类型至少取名2个字符以上', trigger: ['blur', 'change']}
        ],
      }
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          AddMedicalCateList(this.form).then(res => {
            if (res.flag) {
              this.$message.success('添加成功')
            } else {
              this.$message.error('此类型已存在,请重新创建');
            }
            this.dialogFormVisible = false
            this.$emit('AddSort')
          })
        } else {
          this.$message.error('添加失败!!');
          this.dialogFormVisible = false
          return false;
        }

      });
    },
    CloseDialog(){
      this.$refs.AddTypeForm.resetFields()
    }
  }
}
</script>

<style scoped>

</style>
