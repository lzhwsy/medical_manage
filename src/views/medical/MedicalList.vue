<template>
  <div>
    <bread-crumb>
      <template v-slot:one>药品管理</template>
      <template v-slot:two>药品列表</template>
    </bread-crumb>
    <el-card >
      <el-row>
        <!--        类型-->
        <el-col :span="8">
          <type-tab :TabList="TabList" :type="type" @SType="changeType"/>
        </el-col>
        <!--        添加-->
        <el-col :span="3">
          <el-button type="primary" @click="AddMedical">药品添加</el-button>
        </el-col>
        <!--       input-->
        <el-col :span="10">
          <medical-all-input :queryInfo="queryInfo" @getMedicalAll="getMedicalAll"/>
        </el-col>
      </el-row>
      <!--      分类-->
      <tab class="tab" :List="NavList" @getMedicalSmallType="getMedicalSmallType"/>

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
import Tab from "@/components/common/Tabs/Tab";
import BreadCrumb from "@/components/content/common/BreadCrumb";
import TypeTab from "@/components/common/Tabs/TypeTab";
import MedicalAllInput from "@/components/content/input/MedicalAllInput";
import UserPagination from "@/components/content/pagination/UserPagination";

import {MedicalAll} from "@/network/medical";
import {MedicalType} from "@/network/medical";


export default {
  name: "Traditional Chinese medical",
  components: {
    BreadCrumb,
    TypeTab,
    Tab,
    MedicalAllInput,
    UserPagination,
  },
  provide(){
    return{
      getMedicalAll : this.getMedicalAll
    }
  },
  data() {
    return {
      TabList: ['中成药', '西药', '保健品'],
      NavList: {
        name: [],
        showList: [],
      },
      type: '中成药',
      queryInfo: {
        query: '',
        pageNum: 1,//当前页码
        pageSize: 8 //每页条数
      },
      total: 0,
      smallType: '',
    }
  },
  created() {
    this.getMedicalAll()
    this.getMedicalType()
  },
  methods: {
    getMedicalAll() {
      console.log('asdas')
      MedicalAll(this.queryInfo, this.type).then(res => {
        this.NavList.showList = res.data
        this.total = res.total
        // console.log(this.NavList.showList)
      })
    },
    getMedicalType() {
      MedicalType(this.type).then(res => {
        this.NavList.name = res.data.map(n => {
          return n.medical_type
        })
      })
    },
    getMedicalSmallType(smallType) {
      this.smallType = smallType
      MedicalAll(this.queryInfo, this.type, smallType).then(res => {
        this.NavList.showList = res.data
        this.total = res.total
      })
    },
    //每页多少条数据
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize
      if (this.smallType != '') {
        this.getMedicalSmallType(this.smallType)
      } else {
        this.getMedicalAll()
      }
    },
    // 监听页码值改变
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pageNum = newPage
      if (this.smallType != '') {
        this.getMedicalSmallType(this.smallType)
      } else {
        this.getMedicalAll()
      }
    },
    changeType(type) {
      this.type = type
      console.log(type)
      this.smallType = ''
      this.getMedicalType()
      this.getMedicalAll()
    },
    //药品添加跳转
    AddMedical() {
      this.$router.push({name: 'AddMedical'})
    }
  }
}
</script>

<style scoped>
.tab {
  position: relative;
  top: 30px;
}


.fenYe {
  position: absolute;
  bottom: 10px;
  left: 20%;
}
</style>
