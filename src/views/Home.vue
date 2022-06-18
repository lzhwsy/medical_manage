<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <home-header></home-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <home-menu :menuList="menuList"></home-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from "@/components/content/home/HomeHeader";
import HomeMenu from 'components/content/home/HomeMenu'

import {HomeList} from "@/network/user";

export default {
  components:{
    HomeHeader,
    HomeMenu,
  },
  data(){
    return{
      menuList:{}
    }
  },
  name: "Home",
  created() {
    this.getHomeList()
  },
  methods: {
    getHomeList(){
      HomeList().then(res=>{
        this.menuList = res
        console.log(this.menuList)
      })
    },


  }
}
</script>

<style scoped lang="less">
.common-layout{
  height: 100%;
}
.el-header {
  padding: 0;
  background: rgb(92, 133, 167);
  background: linear-gradient(0deg, rgba(92, 133, 167, 1) 0%, rgba(92, 133, 167, 1) 100%);
  text-align: center;
  font-size: 40px;
  color: white;

}

.el-aside {
  background: rgb(158, 161, 217);
  background: linear-gradient(0deg, rgba(158, 161, 217, 1) 0%, rgba(158, 161, 217, 1) 100%);
  height: 100%;

}

.el-main {
  background: rgb(227, 227, 227);
  background: linear-gradient(0deg, rgba(227, 227, 227, 1) 0%, rgba(227, 227, 227, 1) 100%);
  padding: 0;
}

.el-container{
  height: 100%;
}
</style>
