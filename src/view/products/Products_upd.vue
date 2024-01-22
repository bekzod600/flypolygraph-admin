<template>
  <h2 class="font-semibold pb-6 text-3xl">Product qo'shish bo'limi</h2>

  <form method="POST">
    <div class="space-y-8">
      <div class="grid md:grid-cols-2 w-full gap-2">
        <ProductInput v-model="form.title" label="Sarlavha" />
        <ProductInput v-model="form.price" label="Narxi" input-type="number" />
        <Select
          class="w-full mt-2"
          :data="selectedData"
          label="Kategoriyalar"
          @getVal="chooseCategory"
          :disabled="!selectedData.length"
        ></Select>
        <Select
          class="w-full mt-2"
          :data="currencyData"
          label="Birlik"
          @getVal="chooseCurrency"
          :disabled="false"
        ></Select>
      </div>

      <div>
        <input class="mr-1" v-model="form.status" type="checkbox" id="hasproduct" />
        <label for="hasproduct">Mahsulot hozirda mavjud</label>
      </div>

      <div v-if="addImage" class="space-y-3">
        <SButton variant="primary" @click="resetImage">
          <i class="fas fa-reply"></i>
          <span class="ml-1">Reset images</span>
        </SButton>
        <p :class="{ 'text-red-600': imageError }">Rasm kamida 2ta va ko'pi bilan 4ta bolishi kerak.</p>
        <UploadImages :multiplebol="true" desc="Upload images" :error="''" image="" @upload="getImages" />
      </div>
      <div v-else>
        <div class="flex gap-2 justify-end pb-3">
          <SButton variant="primary" @click="addImage = true">
            <i class="fas fa-folder-plus"></i>
            <span class="ml-1">Add images</span>
          </SButton>
        </div>
        <ul class="flex gap-3 flex-wrap">
          <li v-for="image in form.images" :key="image._id">
            <img
              class="w-32 h-28 md:w-56 md:h-48 rounded-md object-cover object-center"
              :src="image.secure_url"
              alt="image"
            />
          </li>
        </ul>
      </div>

      <Textarea v-model="form.description" placeholder="Ta'rif"></Textarea>

      <SButton type="submit" @click.prevent="handleSubmit" variant="primary" :loading="store.updLoading">
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
import { useCategoryStore } from "../../store/category";
import { useProductsStore } from "../../store/product";
import { useRouter, useRoute } from "vue-router";
import { ref, watch, computed } from "vue";
const categoryStore = useCategoryStore();
const store = useProductsStore();
const router = useRouter();
const route = useRoute();

const id = route.params.id;
store.getOneProduct(id);

const imageError = ref(false);
const addImage = ref(false);

categoryStore.getAllCategories();
let selectedData = reactive([]);
selectedData = computed(() =>
  categoryStore.categories.map((val) => {
    return { name: val.title, value: val._id, selected: false };
  })
);

const currencyData = reactive([
  { selected: false, value: "kg", name: "kilogramm" },
  { selected: false, value: "gr", name: "gramm" },
  { selected: true, value: "dona", name: "dona" },
]);

const form = reactive({
  title: "",
  description: "",
  category_id: "",
  imageFiles: "",
  price: "",
  currency: "dona",
  status: true,

  images: [],
});

const resetImage = () => {
  addImage.value = false;
  form.imageFiles = "";
};

watch(
  () => store.product,
  (val) => {
    if (!val.title) return;
    form.title = val.title;
    form.description = val.description;
    form.category_id = val.category_id;
    form.price = val.price;
    form.currency = val.currency;
    form.status = val.status;
    form.images = val.images;
    currencyData.map((currency) => (currency.selected = currency.value == val.currency));
    selectedData.value = selectedData.value.map((category) => (category.selected = category.value == val.category_id));
  }
);

const handleSubmit = async () => {
  if (form.imageFiles) if (form.imageFiles.length > 4) return (imageError.value = true);
  if (form.title && form.description && form.category_id && form.price) {
    store.updLoading = true;
    let formData = new FormData();
    if (form.imageFiles) {
      for (let i = 0; i < form.imageFiles.length; i++) formData.append("images", form.imageFiles[i]);
    }
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category_id", form.category_id);
    formData.append("price", form.price);
    formData.append("currency", form.currency);
    formData.append("status", form.status);
    await store.updProduct(formData, id);
    router.push("/products");
  }
};

const chooseCurrency = (val) => {
  form.currency = val;
  currencyData.map((currency) => (currency.selected = currency.value == val.currency));
};
const chooseCategory = (val) => (form.category_id = val);
const getImages = (e) => (form.imageFiles = e.files);
</script>

<style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style>
