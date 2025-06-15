
<style>
.login {
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/images/清漪.png');
  background-size: cover;
  background-position: center;
}
.container {
  width: 500px;
  height: 300px;
  margin: auto; /*上右下左*/
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(218, 208, 208, 0.5); /* 半透明背景颜色 */
  border-radius: 10px;
}
form {
  display: flex;
  flex-direction: column;
  width: 300px;
}
label {
  margin-bottom: 5px;
}
input[type='text'],
input[type='password'],
select {
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
input[type='button'] {
  border-radius: 4px;
  border: none;
  padding: 10px 15px;
  margin-top: 5px;
  margin-left: 5px;
}

input[type='text']:focus,
input[type='password']:focus,
select:focus {
  border-color: #007bff;
  outline: none;
  border-width: 2px;
}
input[type='button']:hover {
  background-color: #5ba4f2;
  color: rgb(16, 16, 16);
  cursor: pointer;
  border-radius: 4px;
}
</style>

<template>
  <div class="login">
    <div class="container">
      <form action="">
        <label for="username">账号：</label>
        <input type="text" id="username" v-model="username" placeholder="your name..." />
        <label for="password">密码：</label>
        <input type="password" id="password" v-model="password" placeholder="your password..." />
        <label for="confirmPassword">确认密码：</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" />
        <div display="flex" justify-content="space-between">
          <input type="button" name="login" @click="register()" value="注册" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { ElMessage } from 'element-plus'
// 使用选项式实现
export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
    }
  },
  methods: {
    register() {
      const { username, password, confirmPassword } = this
      if (!username || !password || !confirmPassword) {
        ElMessage.error('账号或者密码不能为空')
        return
      }
      if (password !== confirmPassword) {
        ElMessage.error('两次密码输入不一致')
        return
      }
      request.post('/api/register', { username, password, confirmPassword }).then((res) => {
        if (res.code ==0) {
          this.$router.push('/login')
        } else {
          ElMessage.error(res.msg)
        }
      })
    },
  },
}
</script>