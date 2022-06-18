<template>
  <el-table
      :data="CateList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
  >
    <el-table-column prop="medical_type" label="分类名称" sortable width="250"/>
    <el-table-column  label="分类排序" width="180">
      <template v-slot="scope" >
        <el-tag v-if="scope.row.level == '1'">一级</el-tag>
        <el-tag v-else-if="scope.row.level == '2'" type="success">二级</el-tag>
      </template>
    </el-table-column>
      <el-table-column  label="是否有效"  width="250">
        <template v-slot="scope" >
          <el-tag v-if="scope.row.status == '1'"><el-icon><SuccessFilled /></el-icon>有效</el-tag>
          <el-tag v-else ><el-icon><CloseBold /></el-icon>无效</el-tag>
        </template>
      </el-table-column>
    <el-table-column label="操作" width="200">
      <template v-slot="scope">
        <el-button-group class="ml-4">
          <el-tooltip class="box-item" effect="dark" content="编辑信息" placement="top">
            <el-button type="primary" icon="Edit" @click="ShowEdit(scope.row)">编辑</el-button>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" content="删除信息" placement="top">
            <el-button type="danger" icon="Delete" @click="deleteSort(scope.row.id)">删除</el-button>
          </el-tooltip>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
  <edit-medical-type ref="EditMedicalType" @Edit="EditParent" ></edit-medical-type>

</template>

<script>
import {DeleteCateList} from "@/network/medical";

import EditMedicalType from "@/views/medical/dialog/EditMedicalType";

export default {
  name: "MedicalTypeTable",
  components:{
    EditMedicalType
  },
  created() {
    setTimeout(()=>{
      console.log(this.CateList)
    },1000)

  },
  props:{
    CateList:{
      type:Array,
      default:[]
    }
  },
  data(){
    return{
      defaultProps:{
        children: 'children',
        label: 'medical_type'
      }
    }
  },
  methods:{
    ShowEdit(item){
      console.log(item)
      this.$refs.EditMedicalType.MedicalTypeDetail = item
      this.$refs.EditMedicalType.EditDialogVisible = true
    },
    deleteSort(id) {
      ElMessageBox.confirm(
          '您确定要删除此分类？ 此操作不可逆转',
          '警告',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          },
      ) .then(() => {
        DeleteCateList(id).then(res=>{
          if(res.flag){
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
          }else{
            ElMessage({
              type: 'error',
              message:res.msg,
            })
          }

        })

        setTimeout(()=>{
          this.$emit('getCateList')
        },200)
      })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已经取消删除',
            })
          })
    },
    EditParent(){
      this.$emit('Edit')
    }
  }
}
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.ml-4{
  display: flex;
  justify-content: center;
}
</style>
