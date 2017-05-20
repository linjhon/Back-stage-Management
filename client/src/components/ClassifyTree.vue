<template>
  <div class="tree">
    <Tree :data="baseData" @on-select-change="selectType">
    </Tree>
  </div>
</template>

<script>
export default {
  props: ['type'],
  data() {
    return {
      currentType: '',
      baseData: []
    }
  },
  created: function () {
    this.$http.get(`http://localhost:3000/cate/data/${this.type}`).then(res => {
      console.log(res)
      res.data[0].expand = true;
      this.baseData = res.data;
    })
  },
  methods: {
    selectType: function (node) {
      if (node[0]) {
        console.log(node[0].type);
        this.$store.state.currentType = node[0].type;
      } else {
        this.$store.state.currentType = '';
      }
    }
  }
}
</script>

<style scoped>
.tree {
  margin-left: 10px;
  border-right: 1px solid #e1e5f0;
  height: 100%;
}
</style>



