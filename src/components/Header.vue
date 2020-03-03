<template>
    <header class="header">
        <div class="container">
            <div class="header__logo">
                <svg>
                    <use xlink:href="../../static/icons.svg#logo"></use>
                </svg>
            </div>

            <b-dropdown :text="this.$store.state.user.email" size="sm" split>
                <b-dropdown-item @click="logout">Logout</b-dropdown-item>
            </b-dropdown>
        </div>
    </header>
</template>

<script>
    import scss from '../assets/scss/header.scss'

    import {BDropdown, BDropdownItem} from 'bootstrap-vue'

    export default {
        components: {
            BDropdown,
            BDropdownItem
        },
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/login')
                    })
            }
        }
    }
</script>
