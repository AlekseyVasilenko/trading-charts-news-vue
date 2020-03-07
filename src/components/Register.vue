<template>
    <div class="card auth-form">
        <div class="card-body">
            <Logo />
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

                <button type="submit" class="btn btn-primary">Register</button>
                <router-link to="/login" tag="button" class="btn btn-link" type="button">Login page</router-link>
            </form>
        </div>
    </div>
</template>

<script>
    import Logo from './Logo'
    import {BFormInput} from 'bootstrap-vue'

    export default {
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
        components: {
            Logo,
            BFormInput
        },
        methods: {
            register: function () {
                let payload = {};

                this.fields.forEach((val) => {
                    payload[val.name] = val.value;
                });

                this.$store.dispatch('register', payload)
                    .then(() => this.$router.push('/secure'))
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
