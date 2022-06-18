<template>
  <div class="itemClass">
    <el-container class="common-layout"
                  v-for="(item,index) in showList"
                  :key="index">
      <!--    左侧图片-->
      <el-aside width="100px" height="100px">
        <div class="demo-image__preview">
          <el-image
              style="width: 100px; height: 100px"
              :src="item.goods_big_logo[0]"
              :preview-src-list="srcList"
              :initial-index="4"/>
        </div>
      </el-aside>
      <el-container>
        <!--      头部标题-->
        <el-header height="5px">
          <span style="font-weight: bold ; margin-left:10px ">{{ item.goods_name }}</span>
        </el-header>
        <!--      主题内容-->
        <el-main>
          <el-row>
            <el-col :span="10">
              <div>规格：{{ item.goods_size }}</div>
              <div>剂型：{{ item.goods_type }}</div>
              <div class="production">
                <span>生产厂家：</span><span>{{ item.goods_production }}</span>
              </div>
              <div>价格：<span style="color: red">{{ item.goods_price }}</span></div>
              <div style="color:olivedrab">剩余数量:{{ item.goods_number }}</div>
            </el-col>
            <el-col :span="10">
              <div>
                <el-button type="primary" icon="Edit" @click="EditMedical(item)">药品编辑</el-button>
              </div>
              <div>
                <el-button type="danger" icon="Delete" @click="deleteMedical(item.goods_id)">药品删除</el-button>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {DeleteMedicalItem} from "@/network/medical";

export default {

  name: "MedicalItem",
  props: {
    showList: {
      type: Array,
      default: []
    },
  },
  data() {
    srcList:[]
  },
  inject: ['getMedicalAll'],
  methods: {
    //药品编辑详情页
    EditMedical(item){
      this.$router.push({name:'EditMedical',params:item })
    },
    //删除药品
    deleteMedical(goods_id) {
      ElMessageBox.confirm(
          '您确定要删除此药品？ 此操作不可逆转',
          '警告',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          },
      ) .then(() => {
        DeleteMedicalItem(goods_id)
        ElMessage({
          type: 'success',
          message: '删除药品成功',
        })
        setTimeout(()=>{
        this.getMedicalAll()
        },200)
      })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已经取消删除',
            })
          })
    }
  }
}
</script>

<style scoped>
.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}

element.style {
  object-fit: none;
}

el-container {
  width: 150px;
}


.el-main {
  padding: 10px;
}

section.el-container.common-layout {
  width: 50%;
  float: left;
  height: 150px;
}

.common-layout {
  font-size: 12px;
}

.itemClass {
  margin: 40px;
}

.production {
  display: flex;
}

.production span {
  flex: 1;
}
</style>
