
<template>
  <div>
    <h1>列表渲染</h1>
    <p :class="newClass" v-for="(name, index) in names" :key="index">{{ name }}</p>

    <div v-for="(item, index) in objdata" :key="index">
      <p :class="titleClase">编号：{{ item.id }}</p>
      <p :class="newClass">标签：{{ item.class }}</p>
    </div>
  </div>
</template>

<style>
.class1 {
  color: rgb(106, 106, 238);
}

.title {
  color: rgb(196, 229, 118);
}

</style>

<script>
export default {
  name: 'fordemo',
  data() {
    return {
      newClass: 'class1',
      titleClase: 'title',
      names: ['张三', '李四', '王五'],
      objdata: [
        {
          id: 'id2',
          class: 'class2',
        },
        {
          id: 'id3',
          class: 'class3',
        },
        {
          id: 'id4',
          class: 'class4',
        },
      ],
    }
  },
}
</script>