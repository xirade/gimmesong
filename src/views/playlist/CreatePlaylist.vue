<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create new Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title" />
    <textarea
      required
      placeholder="Playlist description..."
      v-model="description"
    ></textarea>
    <!-- upload playlist image -->
    <label class="file">
      <input type="file" id="file" class="inputfile" @change="handleChange" />
      <span class="file-custom"> {{ name }} </span>
    </label>
    <div class="error">{{ fileError }}</div>
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("playlists");
    const { user } = getUser();
    const router = useRouter();

    const title = ref("");
    const description = ref("");
    const name = ref("Choose image...");
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp(),
        });
        isPending.value = false;
        if (!error.value) {
          router.push({ name: "PlaylistDetails", params: { id: res.id } });
        }
      }
    };

    // allowed file types
    const types = ["image/png", "image/jpeg"];

    const handleChange = (e) => {
      const selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        file.value = selected;
        name.value = selected.name;
        fileError.value = null;
      } else {
        file.value = null;
        name.value = "Choose file...";
        fileError.value = "Please select an image file (png or jpg)";
      }
    };

    return {
      title,
      description,
      name,
      file,
      fileError,
      handleSubmit,
      handleChange,
      isPending,
    };
  },
};
</script>

<style scoped>
/* upload input */
.inputfile {
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}
.file {
  position: relative;
  font-size: 0.9em;
  display: inline-block;
  cursor: pointer;
  height: 2.5rem;
}
.file-custom {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
  padding: 0.5rem 1rem;
  line-height: 1.5;
  color: #8b8b8b;
  border: 0.075rem solid #ddd;
  border-radius: 0.25rem;
  box-shadow: inset 0 0.2rem 0.4rem rgb(0 0 0 / 5%);
}
.file-custom:before {
  position: absolute;
  top: -0.075rem;
  right: -0.075rem;
  bottom: -0.075rem;
  display: block;
  content: "Browse";
  padding: 0.5rem 1rem;
  color: #555;
  background-color: #ebebeb;
  border: 0.075rem solid #ddd;
  border-radius: 0 0.25rem 0.25rem 0;
}
.file-custom:active::before {
  color: white;
  background-color: #4f515a;
}
button {
  margin-top: 20px;
}
</style>
