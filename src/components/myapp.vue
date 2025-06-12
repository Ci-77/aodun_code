<template>
  <div>
    <h1>条件渲染</h1>
    <div v-if="flag">你能看见我吗</div>
    <div v-show="flag">你看的见我吗</div>
  </div>
</template>

<style>
.appclass {
  color: red;
  font-size: 50px;
}
</style>


<script>
export default {
  name: 'App',
  data() {
    return {
      dynamicId: 'appid',
      dynamicClass: 'appclass',
      dyId: 'id1',
      dycalss: 'class1',
      isbutton: true,
      objdata: {
        id: 'id2',
        class: 'class2',
      },
      flag: false,
    }
  },
}
</script>