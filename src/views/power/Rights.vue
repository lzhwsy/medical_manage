<template>
  <div>
    <bread-crumb>
      <template v-slot:one>权限管理</template>
      <template v-slot:two>权限列表</template>
    </bread-crumb>
    <el-card>
      <el-table :data="rightsList" border style="width: 100%" stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="权限名称" width="180" />
        <el-table-column  label="权限等级" width="180">
          <template v-slot="scope" >
            <el-tag v-if="scope.row.level == '0'">一级</el-tag>
            <el-tag v-else-if="scope.row.level == '1'" type="success">二级</el-tag>
            <el-tag v-else-if="scope.row.level == '2'" type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from "@/components/content/common/BreadCrumb";

import {RightsList} from "@/network/power";

export default {
  name: "Rights",
  data(){
    return{
      rightsList:[]
    }
  },
  created() {
    this.getRightList()
  },
 methods:{
    getRightList(){
      RightsList('list').then(res=>{
        console.log(res)
        this.rightsList = res.Roles
        console.log(this.rightsList)
      })
    }
 }

}
</script>

<style lang="less" scoped>

</style>
