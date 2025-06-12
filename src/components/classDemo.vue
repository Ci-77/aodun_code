
<style>
.acitve {
  color: rgb(28, 213, 120);
}
.text-danger {
  color: rgb(232, 23, 23);
}
</style>


<template>
  <div>
    <p :class="{ acitve: isActive, 'text-danger': hashErr }">这是属性绑定</p>
  </div>
</template>



<script>
export default {
  name: 'classDemo',
  data() {
    return {
      isActive: true,
      hashErr: false,
    }
  },
}
</script>