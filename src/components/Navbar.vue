<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/hand.jpg" />
      <h1>
        <router-link :to="{ name: 'Home' }">Gimmesong</router-link>
      </h1>
      <div class="links">
        <div v-if="user">
          <router-link class="playlist" :to="{ name: 'UserPlaylists' }"
            >My playlists</router-link
          >
          <span>Hi here, <strong>{{ user.displayName }}</strong> </span>
          <button @click="handleClick">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'Login' }">Log in</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "@/composables/useLogout";
import { useRouter } from "vue-router";
import getUser from "@/composables/getUser";
export default {
  setup() {
    const { user } = getUser();
    const { error, logout } = useLogout();
    const router = useRouter();

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        console.log("User logged out");
        router.push({ name: "Login" });
      }
    };
    return { error, logout, handleClick, user };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav h1 {
  margin-left: 20px;
}

nav .links {
  margin-left: auto;
}

nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}

img {
  max-height: 60px;
}
span {
  font-size: 14px;
  display: inline-block;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid #eee;
}
.playlist:hover, .playlist:focus {
  border-bottom: 2px solid #eee;
}
</style>
