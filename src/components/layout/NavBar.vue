<template>
  <nav
    class="navbar is-success"
    aria-label="main navigation"
    role="navigation"
  >
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace">
          Noteballs
        </div>

        <a
          @click.prevent="showMobileNav = !showMobileNav"
          class="navbar-burger"
          :class="{ 'is-active' : showMobileNav }"
          aria-expanded="false"
          aria-label="menu"
          data-target="navbarBasicExample"
          role="button"
          ref="navbarBurger"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active' : showMobileNav }"
        ref="navbarRef"
      >
        <div class="navbar-end">
          <RouterLink
            :to="link.url"
            class="navbar-item"
            active-class="is-active"
            v-for="link of links"
            :key="link.url"
            @click="closeNavBar"
          >
            {{ link.name }}
          </RouterLink>

          <button
            v-if="storeAuth.user.id"
            class="button is-small is-info ml-2 mt-3"
            @click="logout"
          >
            Log out {{ storeAuth.user.email }}
          </button>

        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStoreAuth } from "@/stores/storeAuth.js";

const storeAuth = useStoreAuth()

const showMobileNav = ref(false),
      navbarRef = ref(null),
      navbarBurger = ref(null)

const links = [
  {
    name: 'Notes',
    url: '/'
  },
  {
    name: 'Stats',
    url: '/stats'
  },
  {
    name: 'Auth',
    url: '/auth'
  },
];

const closeNavBar = () => showMobileNav.value = false

const logout = () => {
  closeNavBar()
  storeAuth.logout()
}

onClickOutside(navbarRef, (event) => closeNavBar(), {
  ignore: [navbarBurger]
})

</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>