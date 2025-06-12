
<style>
.form-demo {
  width: 100%;
}
</style>

<template>
  <div class="form-demo">
    <el-table :data="list" style="width: 100%">
      <el-table-column label="ID" prop="id" width="100" />
      <el-table-column label="姓名" prop="name" width="150" />
      <el-table-column label="地址" prop="address" width="150" />
      <el-table-column label="操作" fixed="right" min-width="150">
        <template #default="{row}">
          <el-button link type="primary" size="small" @click="editData(row.name)">编辑</el-button>
          <el-button link type="primary" size="small" @click="delData(row.name)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
// 开始写声明式api
import axios from 'axios'
import { ref } from 'vue'

var list = ref([
  {
    id: 1,
    name: '张三',
    address: '北京',
  },
  {
    id: 2,
    name: '李四',
    address: '上海',
  },
  {
    id: 3,
    name: '王五',
    address: '深圳',
  },
])

// 声明式api

var getData = () => {
  axios.get('/api/getData').then((res) => {
    list.value = res.data
  })
}
var editData = (id) => {
  console.log(id)
}
var delData = (id) => {
  console.log(id)
}
</script>