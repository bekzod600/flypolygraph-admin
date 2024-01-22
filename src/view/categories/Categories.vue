<template>
  <section>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium min-w-max">Categoriyalar</h3>
      <router-link to="/categories/add">
        <SButton variant="primary" class="ml-auto mt-3">Categoriya Qo'shish</SButton>
      </router-link>
    </div>

    <div v-if="store.categories.length" class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
        <CategoryTable
          :table-data="store.categories"
          :isLoading="store.deleteLoading"
          @delete="deleteHandle"
          update="/categories/update/"
        />
      </div>
    </div>
    <div v-else>
      <h2 class="text-gray-700 text-3xl font-medium min-w-max text-center mt-20">Products Not Found</h2>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, watch } from "vue";
import CategoryTable from "../../components/tables/CategoriesTable.vue";
import SButton from "../../components/buttons/SButton.vue";
import { useCategoryStore } from "../../store/category";
const store = useCategoryStore();

const deleteHandle = (id) => store.delCategory(id);
onMounted(() => store.getAllCategories());
</script>
