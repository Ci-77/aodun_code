
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.common-layout,
.el-container {
  min-height: 100vh;
  width: 100vw;
}
.el-header {
  background-color: #409eff;
  color: white;
  height: 100%;
  width: 100%;
  line-height: 60px;
  text-align: center;
  font-weight: bold;
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.header-actions {
  display: flex;
  align-items: center;
}
.logo-area {
  display: flex;
  align-items: center;
}
.el-aside {
  background-color: #cbd2db;
  color: white;
  height: 100vh;
  overflow-y: auto;
}
.el-main {
  background-color: #f0f2f5;
  padding: 20px;
}
.el-footer {
  background-color: #d3dce6;
  text-align: center;
  color: white;
  line-height: 60px;
}
</style> 

<template>
  <div class="common-layout">
    <el-container>
      <!--顶部区域-->
      <el-header>
        header
        <div class="header-content">
          <div class="logo-area">
            <span>我的logo</span>
          </div>
          <div class="header-actions">
            <el-switch style="margin-right: 20px" v-model="isDark"></el-switch>
            <el-avatar>User</el-avatar>
          </div>
        </div>
      </el-header>

      <el-container>
        <!--侧边栏-->

        <el-aside class="aside" width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><HomeFilled /></el-icon>
                <span>首页</span>
              </template>
              <el-menu-item-group title="Group One">
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="1-4">
                <template #title>item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
              <el-icon><document /></el-icon>
              <span>文档管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><User /></el-icon>
              <span>个人中心</span>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon><Setting /></el-icon>
              <span>设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-container>
          <!--主体区域-->
          <el-main>Main</el-main>
          <!--底部区域-->
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {
  Location,
  Menu as IconMenu,
  Document,
  Setting,
  HomeFilled,
  User,
} from '@element-plus/icons-vue'
import { ref } from 'vue';

const isDark = ref(false)

</script>