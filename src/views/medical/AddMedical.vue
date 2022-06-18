<template>
  <bread-crumb path1="/TCM">
    <template v-slot:one>药品管理</template>
    <template v-slot:two>药品列表</template>
    <template v-slot:three>添加药品</template>
  </bread-crumb>
  <el-card>
    <el-alert title="添加药品区域" type="info" center show-icon/>
    <!--      步骤栏-->
    <el-steps :active="activeIndex" align-center class="steps" finish-status="success">
      <el-step v-for="(item,index) in stepList" :key="index" :title="item"/>
    </el-steps>
    <!--      导航栏-->
    <el-form
        ref="addMedical"
        :model="addMedical"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
        label-position="top"
    >
      <el-tabs :tab-position="tabPosition"
               v-model="activeIndex"
               class="demo-tabs"
               :before-leave="beforeTabLeave">


        <el-tab-pane label="基本信息" name="0">
          <el-form-item label="药品名称" prop="goods_name">
            <el-input v-model="addMedical.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="药品价格" prop="goods_price">
            <el-input v-model="addMedical.goods_price" type="number"></el-input>
          </el-form-item>
          <el-form-item label="药品规格" prop="goods_size">
            <el-input v-model="addMedical.goods_size"></el-input>
          </el-form-item>
          <el-form-item label="药品数量" prop="goods_number">
            <el-input v-model="addMedical.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="药品剂型" prop="goods_type">
            <div class="block">
              <span class="demonstration">请选择剂型</span>
              <el-cascader
                  v-model="addMedical.goods_type"
                  :options="MedicalType"
                  :props="typeProps"
                  @change="handleChange"
              >
              </el-cascader>
            </div>
          </el-form-item>
          <el-form-item label="药品分类" prop="goods_sort">
            <div class="block">
              <span class="demonstration">请选择分类</span>
              <el-cascader
                  v-model="addMedical.goods_sort"
                  :options="MedicalSort"
                  :props="itemProps"
                  @change="handleChange"
              >
              </el-cascader>
            </div>
          </el-form-item>
        </el-tab-pane>


        <el-tab-pane label="药品详情" name="1">
          <el-form-item label="生产厂家" prop="goods_production">
            <el-input v-model="addMedical.goods_production"></el-input>
          </el-form-item>
          <el-form-item label="有效期" prop="validity">
            <el-input v-model="addMedical.validity" type="number"></el-input>
          </el-form-item>
          <el-form-item label="性状">
            <el-input v-model="addMedical.goods_character" type="goods_character"></el-input>
          </el-form-item>
          <el-form-item label="贮藏">
            <el-input v-model="addMedical.Storage"></el-input>
          </el-form-item>
          <el-form-item label="执行标准">
            <el-input v-model="addMedical.standard"></el-input>
          </el-form-item>
          <el-form-item label="用量用法" prop="use">
            <el-input v-model="addMedical.goods_use" :rows="2" type="textarea" placeholder="Please input"/>
          </el-form-item>
          <el-form-item label="注意事项" prop="note">
            <el-input v-model="addMedical.note" :rows="2" type="textarea" placeholder="Please input"/>
          </el-form-item>
          <el-form-item label="禁忌事项" prop="taboo">
            <el-input v-model="addMedical.taboo" :rows="2" type="textarea" placeholder="Please input"/>
          </el-form-item>
        </el-tab-pane>


        <el-tab-pane label="药品功效" name="2">
          <el-form-item label="药品药效" prop="goods_effect">
            <el-input v-model="addMedical.goods_effect" :rows="20" type="textarea" placeholder="Please input"/>
          </el-form-item>
        </el-tab-pane>


        <el-tab-pane label="药品图片" name="3">
          <el-form-item label="药品图片" prop="pics">
            <upload @handleSuccess="handleSuccess"
                    :pics=addMedical.pics
                    @handleRemove="handleRemove"/>
          </el-form-item>
          <div class="addButton">
            <el-button type="primary" @click="Add('addMedical')">确认添加该商品</el-button>
          </div>
        </el-tab-pane>

      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
import {AddMedicalItem, MedicalCateList, MedicalSize} from "@/network/medical";

import Upload from "@/components/content/upload/Upload";


export default {
  name: "AddMedical",
  components: {
    Upload
  },
  created() {
    this.getMedicalCateList()
    this.getMedicalSize()
  },
  data() {
    return {
      stepList: ['基本信息', '药品详情', '药品功效', '药品图片', '完成'],
      activeIndex: '0',
      tabPosition: 'left', //，控制导航栏显示左侧，

      addMedical: {
        goods_name: '',
        goods_price: '',
        goods_size: '',
        goods_type: [],
        goods_sort: [],
        goods_number: '100',
        goods_production: '',
        goods_use: '',
        validity: '',
        goods_character: '',
        standard: '国家药品监督管理局标准：WS3-B1320-2002',
        Storage: '',
        note: '',
        taboo: '尚不明确',
        goods_effect: '',
        //图片的数组
        pics: [],
      },
      MedicalType: [],
      MedicalSort: [],
      itemProps: {
        value: 'medical_type',
        label: 'medical_type',
        children: 'children'
      },
      typeProps: {
        value: 'size',
        label: 'size',
        children: 'children'
      },

      rules: {
        goods_name: [{required: true, message: '请输入药品名称', trigger: 'blur'},],
        goods_price: [{required: true, message: '请输入药品价格', trigger: 'change'},],
        goods_size: [{required: true, message: '请输入药品规格', trigger: 'blur'},],
        goods_use: [{required: true, message: '请输入药品使用用法', trigger: 'blur'},],
        validity: [{required: true, message: '请输入有效年份', trigger: 'blur'},],
        note: [{required: true, message: '请输入注意事项', trigger: 'blur'},],
        taboo: [{required: true, message: '请输入禁忌事项', trigger: 'blur'},],
        goods_effect: [{required: true, message: '请输入药效', trigger: 'blur'},],
        goods_type: [{type: 'array', message: '请选择剂型', trigger: 'change'}, {required: true, message: '请选择剂型'}],
        goods_sort: [{type: 'array', message: '请选择剂型', trigger: 'change'}, {required: true, message: '请选择剂型'}],
        pics: [{required: true, message: '请选择至少一张图片', trigger: 'blur'}]
      },
    }
  },
  methods: {
    //添加药品
    Add(item) {
      this.$refs[item].validate((valid) => {
        if (valid) {
          AddMedicalItem(this.addMedical).then(res => {
            if (res.flag) {
              this.$message.success(res.msg)
              this.$router.push({name: "TCMedical"})
            } else {
              this.$message.error(res.msg);
            }

          })
        } else {
          this.$message.error('您还有必填项没有填，请前往填写')
        }
      });
    },
    //获取级联规格选择
    getMedicalSize() {
      MedicalSize().then(res => {
        console.log(res.sizeResult)
        this.MedicalType = res.sizeResult
        console.log(this.MedicalSize)
      })
    },
    // 获取级联选择分类
    getMedicalCateList() {
      MedicalCateList().then(res => {
        this.MedicalSort = res.CateList
        console.log(this.MedicalType)
      })
    },
    beforeTabLeave(activeName, oldActiveName) {
      if (oldActiveName === '0' && this.addMedical.goods_type.length !== 2 && this.addMedical.goods_sort.length !== 2) {
        this.$message.error('请选择分类和剂型')
        return false
      }
      if (oldActiveName === '1' && this.addMedical.taboo == '') {
        this.$message.error('请填写禁忌事项')
        return false
      }
      if (oldActiveName === '2' && this.addMedical.goods_effect == '') {
        this.$message.error('请填写药品药效')
        return false
      }
      if (oldActiveName === '3' && this.addMedical.pics.length == 0) {
        this.$message.error('请添加商品图片')
        return false
      }
    },
    handleChange(value) {
      console.log(value)
    },
    handleRemove(newPics) {
      this.addMedical.pics = newPics
      console.log(this.addMedical.pics)
    },
    handleSuccess(response) {
      this.addMedical.pics.push(response.tmp_path)
      console.log(this.addMedical.pics)
    }
  }
}
</script>

<style scoped>
.steps {
  margin: 20px;

}

.demo-tabs {
  margin: 20px;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}

.addButton {
  text-align: center;
  margin-top: 80px;
}

</style>
