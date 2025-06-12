<template>
  <div>
    <div :id="dyId" :class="dyclass">计算机</div>
    <div>开发工程师</div>
  </div>
</template>

<style>
.class1 {
  color: black;
  font-size: 30px;
}
</style>


<script>
export default {
  data() {
    return {
      dynamicId: 'appid',
      dynamicClass: 'appclass',
      dyId: 'id1',
      dyclass: 'class1',
      isbutton: true,
      objdata: {
        id: 'id2',
        class: 'class2',
      },
    }
  },
}
</script>