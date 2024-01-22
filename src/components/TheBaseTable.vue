<template>
  <!-- <pre>{{ tableData }}</pre> -->
  <table class="min-w-max">
    <thead>
      <tr>
        <th
          class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          v-for="(thead, i) in tableData.thead"
          :key="i"
        >
          {{ thead }}
        </th>
        <th
          class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
        ></th>
      </tr>
    </thead>

    <tbody class="bg-white">
      <tr v-for="item in tableData.tbody" :key="item[0]">
        <td v-for="el in item" :key="el" class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <p v-if="el.constructor.name === 'String'" class="min-w-[8rem] max-w-min line-clamp-3">{{ el }}</p>
          <p v-else-if="el.constructor.name === 'Number'" class="min-w-[8rem] max-w-min line-clamp-3">{{ el }}so'm</p>
          <p v-else-if="new Date(el) != 'Invalid Date'" class="min-w-[8rem] max-w-min line-clamp-3">
            {{ formatDate(el) }}so'm
          </p>
          <p v-else-if="el.constructor.name === 'Boolean'" class="min-w-[8rem] max-w-min line-clamp-3">
            <span v-if="el" class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded"
              >Mavjud</span
            >
            <span v-else class="bbg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">Tugagan</span>
          </p>
          <img
            class="w-24 h-20 object-cover object-center"
            v-else-if="el.constructor.name == 'Array'"
            :src="el[0].secure_url"
            alt="image"
          />
          <img class="!w-24 !h-20 object-contain object-center" v-else :src="el.secure_url" alt="image" />
        </td>

        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
          <div class="flex gap-2">
            <SButton variant="danger" :loading="props.isLoading == item[0]" @click="deleteUser(item[0])">
              <i class="fas fa-trash"></i>
            </SButton>
            <RouterLink v-if="props.update" :to="props.update + item[0]">
              <SButton variant="primary">
                <i class="fas fa-edit"></i>
              </SButton>
            </RouterLink>
          </div>
          <DeleteModal :is-open="openModal" @delete="emit('delete', deleteId)" @closeModal="openModal = $event" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed, ref } from "vue";
import DeleteModal from "/src/components/modal/DeleteModal.vue";
import SButton from "./buttons/SButton.vue";
import formatDate from "/src/helpers/formatDate";

const props = defineProps(["tableData", "isLoading", "update"]);
const tableData = computed(() => props.tableData);
const openModal = ref(false);
const deleteId = ref(null);

const deleteUser = (id) => {
  openModal.value = true;
  deleteId.value = id;
};
const emit = defineEmits(["delete"]);
</script>

<style scoped>
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
