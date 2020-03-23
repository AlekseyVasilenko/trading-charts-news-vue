<template>
  <header class="header">
    <div class="container">
      <div class="header__logo">
        <svg>
          <use xlink:href="../../static/icons.svg#logo"></use>
        </svg>
      </div>

      <b-button-group size="sm">
        <b-button
          v-for="(tab, key) in tabs"
          :key="key"
          :to="{name: tab.to}"
          variant="outline-secondary"
          exact-active-class="active outline-dark"
          exact
        >{{ tab.text }}
        </b-button>
      </b-button-group>

      <b-dropdown :text="this.$store.state.auth.user.email" size="sm" split>
        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
      </b-dropdown>
    </div>
  </header>
</template>

<script>
  import scss from '../assets/scss/header.scss'

  import {BButton, BButtonGroup, BDropdown, BDropdownItem} from 'bootstrap-vue'

  export default {
    components: {BDropdown, BDropdownItem, BButtonGroup, BButton},
    data: () => ({
      tabs: [
        {
          text: 'News',
          to: 'news'
        },
        {
          text: 'Charts',
          to: 'chart'
        },
      ]
    }),
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
