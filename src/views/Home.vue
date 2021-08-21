<template>
  <div class="home">
    <div v-if="error" class="error">
      Could not fetch the data
    </div>
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
  </div>
</template>

<script>
import getCollection from "../composables/getCollection";
import ListView from "../components/ListView"
export default {
  name: "Home",
  setup() {
    const { error, documents } = getCollection("playlists");
    return { error, documents };
  },
  components: {
    ListView
  }
};
</script>
