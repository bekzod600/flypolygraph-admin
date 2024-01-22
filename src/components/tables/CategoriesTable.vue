<template>
  <table class="min-w-max">
    <thead>
      <tr>
        <th class="th">Nomi</th>
        <th class="th">Rasmi</th>
        <th class="th">Yaratilgan Vaqti</th>
        <th class="th">O'zgartirilgan Vaqti</th>
        <th class="th"></th>
      </tr>
    </thead>

    <tbody class="bg-white">
      <tr v-for="item in props.tableData" :key="item._id">
        <td class="td">{{ item.title }}</td>
        <td class="td">
          <img
            class="w-12 mx-auto aspect-square object-contain object-center"
            :src="item.image.secure_url"
            :alt="item.title"
          />
        </td>

        <td class="td">{{ formatDate(item.createdAt) }}</td>
        <td class="td">{{ formatDate(item.updatedAt) }}</td>

        <td class="td">
          <div class="flex gap-2">
            <SButton variant="danger" :loading="props.isLoading == item._id" @click="deleteUser(item._id)">
              <i class="fas fa-trash"></i>
            </SButton>
            <RouterLink v-if="props.update" :to="props.update + item._id">
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
import DeleteModal from "/src/components/modal/DeleteModal.vue";
import SButton from "../buttons/SButton.vue";
import formatDate from "/src/helpers/formatDate";
import { ref } from "vue";

const props = defineProps(["tableData", "isLoading", "update"]);
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
.th {
  @apply px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider;
}
.td {
  @apply px-6 py-4  border-b border-gray-200;
}
</style>
