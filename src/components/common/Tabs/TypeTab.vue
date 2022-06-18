<template>
  <el-dropdown >
    <span class="el-dropdown-link">
      类型<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item  v-for="(item,index) in TabList"
                          :key="index"
                           @click="clickTab(item)"
        >{{item}}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <span>当前的类型为: <span class="typeBox">{{type}}</span> </span>
</template>

<script>
export default {
name: "TypeTab",
  props:{
    TabList:{
      type:Array,
      default:{}
    },
    type:{
      type:String,
      default:''
    }
  },
  data(){
  return{
  }
  },
  methods:{
    clickTab(type){
      this.$emit('SType',type)
    }
  }
}
</script>

<style scoped>
.el-dropdown-link{
  border: 1px solid;
  margin: 30px;
  padding:5px;
  border-radius: 20%;
}
.typeBox{
  background-color: #21d1cf;
  border-radius: 30%;
  padding: 5px;
  color: white;
  background: rgb(64,167,252);
  background: linear-gradient(0deg, rgba(64,167,252,1) 0%, rgba(104,192,235,1) 100%);
}
</style>
