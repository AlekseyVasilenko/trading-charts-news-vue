<template>
  <div class="card auth-form">
    <div class="card-body">
      <Logo/>
      <h4>Sign In</h4>

      <form @submit.prevent="login">
        <div class="form-group" v-for="(field, i) in fields" :key="field.name">
          <label :for="field.name">{{ field.label }}</label>
          <b-form-input
            :id="field.name"
            :type="field.type"
            v-model="field.value"
            :state="fieldState(i)"
            required
            trim
          />
          <transition name="fade" mode="out-in">
            <b-form-invalid-feedback v-if="$store.state.auth.error.errText">
              {{ $store.state.auth.error.errText }}
            </b-form-invalid-feedback>
          </transition>
        </div>

        <b-button type="submit" variant="primary" :disabled="isLoading">
          <v-icon v-if="isLoading" name="redo" spin/>&nbsp;Log in
        </b-button>
        <b-button to="/register" variant="link">Register page</b-button>
      </form>
    </div>
  </div>
</template>

<script>
  import Logo from './Logo'
  import {BButton, BFormInput, BFormInvalidFeedback} from 'bootstrap-vue'
  import 'vue-awesome/icons/redo'
  import VIcon from 'vue-awesome/components/Icon'
  import {mapGetters} from "vuex";

  export default {
    components: {Logo, BButton, BFormInput, BFormInvalidFeedback, VIcon},
    data: () => ({
      fields: [
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
          type: 'password'
        }
      ]
    }),
    computed: {
      ...mapGetters([
        'isLoading'
      ])
    },
    methods: {
      fieldState: function (i) {
        if (this.fields[i].name !== this.$store.state.auth.error.field) {
          return null
        } else {
          return false
        }
      },
      login: function () {
        let user = {};

        this.fields.forEach(el => {
          user[el.name] = el.value;
        });

        this.$store.dispatch('login', user)
      },
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
