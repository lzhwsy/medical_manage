<template>
  <div>
    <bread-crumb>
      <template v-slot:one>药品管理</template>
      <template v-slot:two>药品类型</template>
    </bread-crumb>
  </div>
  <el-card>
    <el-row>
<!--      添加分类-->
      <el-col>
        <el-button class="buttonAdd" type="primary" @click="addSort">添加分类</el-button>
<!--        对话框-->
        <medical-type-dialog ref="TypeDialog" @AddSort="getCateList"></medical-type-dialog>
      </el-col>
<!--      表格-->
      <medical-type-table :CateList="CateList" @getCateList="getCateList" @Edit="getCateList"></medical-type-table>
      <el-col>总计共{{total}}个分类</el-col>
    </el-row>

  </el-card>
</template>

<script>
import BreadCrumb from "@/components/content/common/BreadCrumb";
import UserPagination from "@/components/content/pagination/UserPagination";
import MedicalTypeTable from "@/views/medical/table/MedicalTypeTable";
import MedicalTypeDialog from "@/views/medical/dialog/AddMedicalTypeDialog";

import {MedicalCateList} from "@/network/medical";

export default {
name: "Western_medicine",
  components:{
    BreadCrumb,
    UserPagination,
    MedicalTypeTable,
    MedicalTypeDialog
  },
  created() {
    this.getCateList()
  },
  data(){
    return{
      CateList:[],
      queryInfo: {
        pageNum: 1,//当前页码
        pageSize: 3 //每页条数
      },
      total:''
    }
  },
  methods:{
    getCateList(){
      MedicalCateList().then(res=>{
        this.CateList = res.CateList
        this.total = res.total
        console.log(this.CateList)
      })
    },
    addSort(){
      this.$refs.TypeDialog.dialogFormVisible = true
    }
  }
}
</script>

<style scoped>
.buttonAdd{
  margin: 20px;
}
</style>
