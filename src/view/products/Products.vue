<template>
  <section>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium relative">
        Product bo'limi
        <span class="indicate">{{ store.products.length }}</span>
      </h3>
      <router-link to="/products/add">
        <SButton variant="primary"> Yangi Product qo'shish </SButton>
      </router-link>
    </div>

    <div v-if="store.products.length" class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <ProductTable
        :tableData="store.products"
        :isLoading="store.deleteLoading"
        @delete="fetchDelete"
        update="/products/update/"
      ></ProductTable>
    </div>
    <div v-else>
      <h2 class="text-gray-700 text-3xl font-medium min-w-max text-center mt-20">Products Not Found</h2>
    </div>
  </section>
</template>

<script setup>
import { reactive, watch } from "vue";
import SButton from "/src/components/buttons/SButton.vue";
import ProductTable from "../../components/tables/ProductsTable.vue";
import { useProductsStore } from "../../store/product";
const store = useProductsStore();

store.getAllProducts();

// const tableData = reactive({ thead: [], tbody: [] });
// watch(
//   () => store.products,
//   (data) => {
//     if (data.length) {
//       data = data.map((val) => {
//         if (val.__v == 0) {
//           const { __v, ...filteredVal } = val;
//           return filteredVal;
//         }
//         return val;
//       });
//       tableData.thead = Object.keys(data[0]);
//       tableData.tbody = data.map((el) => Object.values(el));
//     }
//   }
// );

const fetchDelete = (id) => {
  store.delProducts(id);
  store.deleteLoading = id;
};
</script>
