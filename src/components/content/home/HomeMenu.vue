<template>
  <div class="ZuJian">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px" >
      <el-radio-button :label="false" @click="change('open')">展开</el-radio-button>
      <el-radio-button :label="true" @click="change('close')">缩小</el-radio-button>
    </el-radio-group>
  </div>

  <el-menu
      active-text-color="#32f5ef"
      background-color="#5b6078"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      default-active="2"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
      :unique-opened="true"
      router
  >
    <el-sub-menu :index="item.path+''" v-for="item in menuList.afterData" :key="item.id">
      <template #title>
        <el-icon>
          <component :is="iconMenu[item.id]"></component>
        </el-icon>
        <span>{{ item.origin }}</span>
      </template>
      <el-menu-item :index="children.router_path+''"
                    v-for="children in item.children"
                    :key="item.id">
        <el-icon>
          <component :is="iconMenu[children.id]"></component>
        </el-icon>
        {{ children.name }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>

</template>

<script>

export default {
  name: "HomeList",
  components: {},
  props: {
    menuList: {}
  },
  data() {
    return {
      iconMenu: {
        1: "Avatar",
        2: "User",
        3: "User",
        4: "FirstAidKit",
        5: "FirstAidKit",
        6: "FirstAidKit",
        7: "FirstAidKit",
        8: "List",
        9: "FolderChecked",
        10: "SuccessFilled",
        11: "Van",
        12: "OfficeBuilding",
        13: "OfficeBuilding"
      },
      isCollapse: false
    }
  },
  methods: {
    change(status) {
      if (status == 'open') this.isCollapse = false
      else this.isCollapse = true
    }
  }
}
</script>

<style scoped>
.ZuJian {
  width: 200px;
  height: 32px;
  text-align: center;
  margin-bottom: 0;
}
.ZuJian span{
  width: 100px;
}
.el-radio-group{
  height: 100%;
}

</style>
