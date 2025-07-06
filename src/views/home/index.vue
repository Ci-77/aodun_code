
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
.avatar-container {
  position: relative;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}
.popover-info h3,
.popover-info p {
  margin: 2px 0;
  padding: 0;
  font-size: 12px;
  line-height: 1.4;
}

.popover-info {
  width: 300px;
  height: 250px;
  top: 60px;
  position: absolute;
  border: 1px solid #999;
  padding: 0px;
  color: black;
  background-color: #edeff1;
  right: 0px;

  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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
        <div class="header-content">
          <div class="logo-area">
            <span>我的logo</span>
          </div>
          <div class="header-actions">
            <el-switch style="margin-right: 20px" v-model="isDark"></el-switch>
            <div class="avatar-container" @click="toggleInfo">
              <el-avatar :size="50" :src="circleURL"></el-avatar>
              <div
                v-if="isHovered"
                class="popover-info"
                @click.stop
              >
                <el-avatar :size="30" :src="circleURL"></el-avatar>
                <h3>个人信息</h3>
                <p><strong>用户名:</strong> UserName</p>
                <p><strong>邮箱:</strong> user@example.com</p>
                <p><strong>职位:</strong> 前端开发</p>
                <p><strong>注册时间:</strong> 2021-05-05</p>
                <el-button @click="logout" type="primary">退出登录</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-header>

      <el-container>
        <!--侧边栏-->

        <el-aside class="aside" width="200px">
          <el-menu
            router
            :default-active="$route.path"
            mode="vertical"
            class="el-menu-vertical-demo"
            @select="handleSelect"
          >
            <el-menu-item index="/home">
              <template #title>
                <el-icon>
                  <HomeFilled />
                </el-icon>
                <span>首页</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/doc">
              <el-icon><document /></el-icon>
              <span>文档管理</span>
            </el-menu-item>
            <el-menu-item index="/user">
              <el-icon><User /></el-icon>
              <span>个人中心</span>
            </el-menu-item>
            <el-menu-item index="/setting">
              <el-icon><Setting /></el-icon>
              <span>设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-container>
          <!--主体区域-->
          <el-main>
            <router-view />
          </el-main>
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
import { ref } from 'vue'
import userAvatar from '@/assets/images/清漪.png'
import { useRouter } from 'vue-router'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'

const router = useRouter()
const circleURL = ref(userAvatar)
const isDark = ref(false)
const isHovered = ref(false)
const toggleInfo = () => {
  isHovered.value = !isHovered.value
}
// 点击弹窗外部关闭
import { onMounted, onBeforeUnmount } from 'vue'
const handleClickOutside = (e) => {
  if (!e.target.closest('.avatar-container')) {
    isHovered.value = false
  }
}
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
const handleSelect = (index) => {
  router.push(index)
}
const logout = ()=>{
  //写退出登录
  request.post('/api/logout').then((res)=>{
    if (res.code==0){
      router.push('/login')
    }else{
      ElMessage.error('登出失败')
    }
  })
}
</script>