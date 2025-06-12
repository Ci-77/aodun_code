<template>
  <div>
    <h1>这是计算属性</h1>
    <button @click="handleClick">计数器</button>
    <p>计算值:{{ num }}</p>
    <p>{{ num + 1 }}</p>
    <p>{{ addNum }}</p>
  </div>
</template>

<style>
</style>

<script>
export default {
  // 组件名称
  name: 'computeDemo',
  // 组件的属性
  data() {
    return {
      num: 0,
    }
  },
  // 事件绑定
  methods: {
    // 事件处理函数
    handleClick() {
      this.num++
    },
  },
  //计算属性
  computed: {
    addNum() {
      return this.num + 1
    },
  },
}
</script>