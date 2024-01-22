<template>
  <h2 class="font-semibold pb-6 text-3xl">Kategoriyani o'zgartirish bo'limi</h2>

  <form method="POST">
    <div class="space-y-8">
      <div v-if="addImage" class="space-y-3">
        <SButton variant="primary" @click="resetImage">
          <i class="fas fa-reply"></i>
          <span class="ml-1">Reset images</span>
        </SButton>
        <UploadImages :multiplebol="false" desc="Upload images" :error="''" image="" @upload="getImages" />
      </div>
      <div v-else>
        <div class="flex gap-2 justify-end pb-3">
          <SButton variant="primary" @click="addImage = true">
            <i class="fas fa-folder-plus"></i>
            <span class="ml-1">Add images</span>
          </SButton>
        </div>
        <img
          class="w-32 h-28 md:w-56 md:h-48 rounded-md object-cover object-center"
          :src="form.image.secure_url"
          alt="image"
        />
      </div>

      <div class="grid md:grid-cols-2 w-full gap-2">
        <ProductInput v-model="form.title" label="Sarlavha" />
      </div>

      <SButton type="submit" variant="primary" :loading="store.updLoading" @click.prevent="handleSubmit">
        Saqlash
      </SButton>
    </div>
  </form>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import ProductInput from "../../components/input/productInput.vue";
import SButton from "../../components/buttons/SButton.vue";
import UploadImages from "../../components/input/uploadImages.vue";
import { useCategoryStore } from "../../store/category";
import { useRouter, useRoute } from "vue-router";
import { ref, watch } from "vue";
const store = useCategoryStore();
const router = useRouter();
const route = useRoute();

const id = route.params.id;
store.getOneCategory(id);

const addImage = ref(false);

const form = reactive({
  title: "",
  imageFiles: "",

  image: "",
});

const resetImage = () => {
  addImage.value = false;
  form.imageFiles = "";
};

watch(
  () => store.category,
  (val) => {
    if (val.title) {
      form.title = val.title;
      form.image = val.image;
    }
  }
);

const handleSubmit = async () => {
  let formData = new FormData();
  if (form.imageFiles) formData.append("image", form.imageFiles);
  formData.append("title", form.title);
  await store.updCategory(formData, id);
  router.push("/categories");
};

const getImages = (e) => (form.imageFiles = e.file);
</script>

<style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style>
