<template>
  <h2 class="font-semibold pb-6 text-3xl">Categoriya qo'shish bo'limi</h2>

  <form method="POST">
    <div class="space-y-8">
      <div class="grid md:grid-cols-2 w-full gap-2">
        <ProductInput v-model="form.title" label="Sarlavha" />
      </div>

      <UploadImages :multiplebol="false" desc="Upload images" error="" image="" @upload="getImages" />

      <SButton type="submit" variant="primary" :loading="store.loading" @click.prevent="handleSubmit">
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
import { useRouter } from "vue-router";
const store = useCategoryStore();
const router = useRouter();

const form = reactive({
  title: "",
  imageFiles: "",
});

const handleSubmit = async () => {
  if (form.imageFiles) {
    let formData = new FormData();
    formData.append("image", form.imageFiles);
    formData.append("title", form.title);
    await store.addCategory(formData);
    router.push("/categories");
  }
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
