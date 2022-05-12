<template>
  <div>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>


      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户数据管理</span>
        </template>
        <el-menu-item index="1-2">医生管理</el-menu-item>
        <el-menu-item index="1-1">消费者管理</el-menu-item>
      </el-submenu>


      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
      </el-submenu>


      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>药品管理</span>
        </template>
        <el-menu-item index="4">
          <el-submenu index="4-1">
            <template slot="title">药品分类</template>
            <el-menu-item index="4-1-1">中成药</el-menu-item>
            <el-menu-item index="4-1-2">西药</el-menu-item>
            <el-menu-item index="4-1-3">保健品</el-menu-item>
          </el-submenu>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "ElAside",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>

</style>
