<template>
  <el-tabs  v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane :label="item"
                 :name="item"
                 v-for="(item,index) in List.name"
                 :key="index">
                <div class="type_box">{{item}}</div>
    </el-tab-pane>
    <medical-item class="item" :showList="List.showList"></medical-item>
  </el-tabs>
</template>

<script>
import MedicalItem from "@/components/content/medical/MedicalItem";
export default {
  name: "Tab",
  components:{
    MedicalItem
  },
  props:{
    List:{
      type:Object,
      default:{},
    },
  },
  data() {
    return {
      activeName:''
    }
  },
  methods:{
    handleClick(tab){
      let type = tab.props.label
      this.$emit('getMedicalSmallType',type)

    }
  }
}
</script>

<style scoped>
el-tab-pane{
  height: 100%;
}
.tab[data-v-afd9c4f2]{
  top:0px
}
.type_box{
  position: relative;
  font-weight: bold;
  font-size: 20px;
  /*margin-bottom: 20px;*/
  left:45%;
}



</style>
