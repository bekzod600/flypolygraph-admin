<template>
  <h2 class="font-semibold pb-6 text-3xl">Product qo'shish bo'limi</h2>

  <form method="POST">
    <div class="space-y-8">
      <div class="grid md:grid-cols-2 w-full gap-2">
        <ProductInput v-model="form.title" label="Sarlavha" />
        <ProductInput v-model="form.price" input-type="number" label="Narxi" />
        <Select
          class="w-full mt-2"
          :data="selectedData"
          selected="Kategoriyalar"
          label="Kategoriyalar"
          @getVal="chooseProduct"
          :disabled="!selectedData.length"
        ></Select>
        <Select
          class="w-full mt-2"
          :data="currencyData"
          label="Birlik"
          selected="Dona"
          @getVal="chooseCurrency"
          :disabled="false"
        ></Select>
      </div>

      <div class="space-y-3">
        <p :class="{ 'text-red-600': imageError }">Rasm ko'pi bilan 4ta bolishi kerak.</p>
        <UploadImages :multiplebol="true" desc="Upload images" :error="''" image="" @upload="getImages" />
      </div>

      <div>
        <input class="mr-1" v-model="form.status" type="checkbox" id="hasproduct" />
        <label for="hasproduct">Mahsulot hozirda mavjud</label>
      </div>

      <Textarea v-model="form.description" placeholder="Ta'rif"></Textarea>

      <SButton type="submit" @click.prevent="handleSubmit" variant="primary" :loading="store.loading">
        Saqlash
      </SButton>
    </div>
  </form>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import ProductInput from "../../components/input/productInput.vue";
import Textarea from "../../components/input/textarea.vue";
import UploadImages from "../../components/input/uploadImages.vue";
import Select from "../../components/input/select.vue";
import SButton from "../../components/buttons/SButton.vue";
import { useProductsStore } from "../../store/product";
import { useCategoryStore } from "../../store/category";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
const store = useProductsStore();
const categoryStore = useCategoryStore();
const router = useRouter();

const imageError = ref(false);

categoryStore.getAllCategories();
let selectedData = ref([]);
selectedData = computed(() =>
  categoryStore.categories.map((val) => {
    return { name: val.title, value: val._id };
  })
);
const currencyData = [
  { valu: "kg", name: "kilogramm" },
  { valu: "gr", name: "gramm" },
  { valu: "dona", name: "dona" },
];

const form = reactive({
  category_id: "",
  title: "",
  description: "",
  imageFiles: "",
  price: "",
  currency: "dona",
  status: true,
});

const handleSubmit = async () => {
  if (form.imageFiles.length > 4) return (imageError.value = true);
  if (form.title && form.description && form.price && form.category_id) {
    store.loading = true;
    let formData = new FormData();
    for (let i = 0; i < form.imageFiles.length; i++) formData.append("images", form.imageFiles[i]);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("currency", form.currency);
    formData.append("category_id", form.category_id);
    formData.append("status", form.status);
    await store.addProduct(formData);
    router.push("/products");
  }
};

const getImages = (e) => (form.imageFiles = e.files);
const chooseProduct = (val) => (form.category_id = val);
const chooseCurrency = (val) => (form.currency = val);
</script>

<style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style>
