<template>
  <div class="modal">
    <div class="modal__form">
      <el-form :label-position="labelPosition"
               :model="form"
               :rules="rules"
               ref="rules"
      >
        <h3>Сохранить запрос</h3>
        <el-form-item label="Запрос">
          <el-input :disabled="type === 'ADD'" v-model="query"></el-input>
        </el-form-item>
        <el-form-item label="Название" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Сортировать по">
          <el-select v-model="form.sort" placeholder="Сортировать по">
            <el-option label="По дате" value="date"></el-option>
            <el-option label="По рейтингу" value="rating"></el-option>
            <el-option label="По числу просмотров" value="viewCount"></el-option>
          </el-select>
        </el-form-item>
        <div class="form-range">
          <span class="demonstration">Максимальное колличество</span>
          <div class="slider">
            <el-slider v-model="form.range"></el-slider>
            <span class="range-counter">{{ form.range }}</span>
          </div>
        </div>
        <div class="form-buttons" v-if="type === 'ADD'">
          <el-button plain @click="$emit('handlerCloseModal')">Не сохранять</el-button>
          <el-button @click="submitForm" type="primary">Сохранить</el-button>
        </div>
        <div class="form-buttons" v-if="type === 'EDIT'">
          <el-button plain @click="$emit('handlerCloseModal')">Не изменять</el-button>
          <el-button @click="submitForm" type="primary">Изменить</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavouritesModal',
  props: {
    query: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      labelPosition: 'top',
      form: {
        name: '',
        sort: '',
        value: this.query,
        range: 12,
      },
      rules: {
        name: [{
          required: true,
          message: 'Пожалуйста введите название!',
          trigger: 'blur',
        },
        {
          min: 1,
          max: 10,
          message: 'Максимальная длина названия 10 символов',
          trigger: 'blur',
        }],
      },
    };
  },
  methods: {
    /* eslint-disable */
    submitForm() {
      this.$refs.rules.validate((valid) => {
        if (valid) {
          this.$store.commit('addFavourite', this.form);
          this.$emit('handlerCloseModal');
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(117, 199, 255, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-form {
    padding: 35px 40px;
  }

  &__form {
    background-color: #fff;
    width: 510px;
    box-shadow: 0 10px 30px rgba(19, 144, 229, 0.8);
    border-radius: 10px;
  }

  .form-range {
    margin-bottom: 30px;
  }

  .form-buttons {
    display: flex;
    justify-content: space-between;
  }

  .el-button {
    width: 50%;
  }
}

.slider {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-slider {
    width: 100%;
  }

  .range-counter {
    padding: 12px 15px;
    border: 1px solid rgba(23, 23, 25, 0.2);
    border-radius: 5px;
    margin-left: 20px;
  }
}
</style>
