<template>
    <div class="card auth-form">
        <div class="card-body">
            <Logo />
            <h4>Sign In</h4>

            <form @submit.prevent="login">
                <div class="form-group" v-for="(field, key) in fields" :key="key">
                    <label :for="key">{{ field.label }}</label>
                    <b-form-input
                        :id="key"
                        :type="key"
                        v-model="field.value"
                        :state="fieldState(key)"
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
            fields: {
                email: {
                    label: 'Enter your E-mail',
                    value: '',
                },
                password: {
                    label: 'Enter your Password',
                    value: '',
                }
            }
        }),
        methods: {
            fieldState: function(key) {
                if (key !== this.$store.state.error.field) {
                    return null
                } else {
                    return false
                }
            },
            login: function () {
                let payload = {};

                for(let key in this.fields) {
                    if (this.fields.hasOwnProperty(key)) {
                        payload[key] = this.fields[key].value;
                    }
                }

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
