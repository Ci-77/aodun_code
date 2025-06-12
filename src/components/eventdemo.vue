<template>
  <div>
    <div>
      <p>这是一个事件计数器</p>
      <button v-on:click="count++">Add</button>
      <p>{{ count }}</p>
    </div>
    <div>
      <p>这是方法事件计数器</p>
      <button @click="handleClick">add</button>
      <p>{{ count2 }}</p>
    </div>
  </div>
</template>

<style>
</style>

<script>
export default {
  data() {
    return {
      // 基本的内连事件绑定
      count: 0,
      count2: 0,
    }
  },
  methods: {
    // 事件处理函数
    handleClick() {
      this.count2++
    },
  },
}
</script>