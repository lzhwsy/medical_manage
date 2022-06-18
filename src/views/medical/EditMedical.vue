<template>
  <div>
    <bread-crumb path1="/TCM">
      <template v-slot:one>药品管理</template>
      <template v-slot:two>药品列表</template>
      <template v-slot:three>药品详情编辑</template>
    </bread-crumb>

    <el-card>
      <div class="common-layout">
        <el-container class="box">
          <!--          图片区域-->
          <el-aside width="40%">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in item.goods_big_logo" :key="item">
                <img :src="item" alt="" class="carouselImg">
              </el-carousel-item>
            </el-carousel>
            <el-tag class="ml-2" type="warning" >温馨提醒：商品包装因厂家更换频繁，如有不符请以实物为准。</el-tag>
          </el-aside>
          <!--          详情区域-->
          <el-container>
            <el-header>
              <span style="background: salmon;border-radius: 30% ;margin: 10px;padding:10px">处方</span>
              <span style="font-weight: bold">{{ item.goods_name }}</span>
            </el-header>
            <el-main>
              <el-row >
                <el-col :span="12" ><span class="textForm">通用名: </span>{{ item.goods_name }} </el-col>
                <el-col :span="12"><span class="textForm">包装规格:</span>{{ item.goods_size }}</el-col>
              </el-row>
              <el-row >
                <el-col :span="12"><span class="textForm">剂型/型号: </span>{{ item.goods_type }} </el-col>
                <el-col :span="12"><span class="textForm" >有效期: <span style="color: red">{{ item.validity }} 月</span></span></el-col>
              </el-row>
              <el-row >
                <el-col :span="24"><span class="textForm">批准文号:</span>{{ item.standard }}</el-col>
              </el-row>
              <el-row >
                <el-col :span="24"><span class="textForm">生产企业:</span>{{ item.goods_production }}</el-col>
              </el-row>
              <el-row >
                <el-col :span="24"><span class="textForm">适应症:</span>{{ item.goods_effect }}</el-col>
              </el-row>
              <el-row style="background-color: oldlace" :span="10">
                <el-col :span="24"><span class="textForm">商家报价:</span>
                  <span style="color: #ff0000;font-size: larger">￥{{ item.goods_price }}</span></el-col>
              </el-row>
            </el-main>
            <el-footer class="editButton">
              <span>剩余数量：{{item.goods_number}}</span>
              <el-button @click="medicalDetail">药品详情</el-button>
              <medical-detail ref="MedicalDetail" :itemDetail="item"></medical-detail>
              <el-button @click="EditMedicalDetail" >药品参数修改</el-button>
              <edit-medical-detail ref="EditMedicalDetail"></edit-medical-detail>
            </el-footer>
          </el-container>
        </el-container>
      </div>

    </el-card>
  </div>
</template>

<script>
import BreadCrumb from "@/components/content/common/BreadCrumb";

import MedicalDetail from "@/views/medical/dialog/MedicalDetail";
import EditMedicalDetail from "@/views/medical/dialog/EditMedicalDetail";

export default {
  name: "EditMedical",
  components: {
    BreadCrumb,
    MedicalDetail,
    EditMedicalDetail
  },
  created() {
    this.item = this.$route.params
    console.log(this.item)
  },
  data() {
    return {
      item: {}
    }
  },
  methods:{
    //展示商品详细信息
    medicalDetail(){
      this.$refs.MedicalDetail.visible = true
    },
    //编辑药品参数
    EditMedicalDetail(){
      this.$refs.EditMedicalDetail.medicalDetail = this.item
     this.$refs.EditMedicalDetail.EditVisible = true
    }
  }
}
</script>

<style scoped>
.box {
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.carouselImg {
  width: 100%;
  height: 100%;
}

header.el-header {
  text-align: center;
  --el-header-height: 20px;
}

.ml-2{
  width: 100%;
}

.editButton{
  display: flex;
  justify-content: space-evenly;
}
.el-col{
  margin-bottom: 10px;
  border-bottom-style: inset;
}


</style>
