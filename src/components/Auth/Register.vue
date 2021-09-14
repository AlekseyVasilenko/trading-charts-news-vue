<template>
  <div class="card auth-form">
    <div class="card-body">
      <Logo/>
      <h4>Register</h4>

      <form @submit.prevent="register">
        <div class="form-group" v-for="field in fields" :key="field.name">
          <label :for="field.name">{{ field.label }}</label>
          <b-form-input
            :id="field.name"
            :type="field.type"
            v-model="field.value"
            required
            trim
          />
        </div>

        <b-button type="submit" variant="primary" :disabled="isLoading">
          <v-icon v-if="isLoading" name="redo" spin/>&nbsp;Register
        </b-button>
        <b-button to="/login" variant="link">Login page</b-button>
      </form>
    </div>
  </div>
</template>

<script>
  import Logo from '../Common/Logo'
  import {BButton, BFormInput} from 'bootstrap-vue'
  import 'vue-awesome/icons/redo'
  import VIcon from "vue-awesome/components/Icon";
  import {mapGetters} from "vuex";

  export default {
    components: {Logo, BButton, BFormInput, VIcon},
    data: () => ({
      fields: [
        {
          label: 'Enter your Name',
          name: 'name',
          value: '',
          type: 'text'
        },
        {
          label: 'Enter your E-mail',
          name: 'email',
          value: '',
          type: 'email'
        },
        {
          label: 'Enter your Password',
          name: 'password',
          value: '',
          type: "password"
        },
        {
          label: 'Confirm your Password',
          name: 'confirmPassword',
          value: '',
          type: "password"
        }
      ]
    }),
    computed: {
      ...mapGetters([
        'isLoading'
      ])
    },
    methods: {
      register: function () {
        let user = {};

        this.fields.forEach((val) => {
          user[val.name] = val.value;
        });

        this.$store.dispatch('register', user)
      }
    }
  }
</script>

<style scoped>
  .card {
    margin: auto;
    min-width: 400px;
    box-shadow: 0 0 20px 4px rgba(0, 0, 0, 0.2);
  }
</style>
