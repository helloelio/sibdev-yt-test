<template>
  <div class="search">
    <h2>Поиск видео</h2>
    <el-form :inline="true" class="demo-form-inline">
      <el-input placeholder="Что хотите посмотреть?" v-model="searchValue">
        <el-button @click="$emit('handleSearch', searchValue)" type="primary"
                   slot="append"
                   icon="el-icon-search">
          Найти
        </el-button>
      </el-input>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchValue: '',
    };
  },
};
</script>

<style scoped lang="scss">

.el-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

input.el-input__inner:focus {
  background-color: #409eff !important;
}

</style>
