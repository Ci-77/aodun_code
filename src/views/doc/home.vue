<style>
.home_style {
  text-align: center;
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-bottom: 50px;
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="home_style">
    <h2>这是首页</h2>
    <el-row :gutter="20">
      <el-col :span="3">输入名字</el-col>
      <el-col :span="3">
        <el-input v-model="name"></el-input>
      </el-col>
      <el-button type="primary" >提交</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    }
  },
}
</script>