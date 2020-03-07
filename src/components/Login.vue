<template>
    <div class="card auth-form">
        <div class="card-body">
            <Logo />
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
                        <b-form-invalid-feedback v-if="$store.state.error.errText">
                            {{ $store.state.error.errText }}
                        </b-form-invalid-feedback>
                    </transition>
                </div>

                <button type="submit" class="btn btn-primary">Login</button>
                <router-link to="/register" tag="button" class="btn btn-link" type="button">Register page</router-link>
            </form>
        </div>
    </div>
</template>

<script>
    import Logo from './Logo'
    import {BFormInput, BFormInvalidFeedback} from 'bootstrap-vue'

    export default {
        components: {Logo, BFormInput, BFormInvalidFeedback},
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
        methods: {
            fieldState: function(i) {
                if (this.fields[i].name !== this.$store.state.error.field) {
                    return null
                } else {
                    return false
                }
            },
            login: function () {
                let payload = {};

                this.fields.forEach(el => {
                    payload[el.name] = el.value;
                });

                this.$store.dispatch('login', payload)
                    .then(() => this.$router.push('/cabinet'))
                    .catch(err => console.log(err))
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
