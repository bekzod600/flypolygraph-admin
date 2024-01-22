import axios from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const useCategoryStore = defineStore("categories", {
  state: () => ({
    categories: [],
    category: {},
    deleteLoading: false,
    loading: false,
    updLoading: false,
  }),
  actions: {
    getAllCategories: async function () {
      const toast = useToast();
      try {
        const res = await axios.get("/categories");
        this.categories = res.data;
      } catch (error) {
        toast.error(error.message);
      }
    },
    async getOneCategory(id) {
      const toast = useToast();
      try {
        const res = await axios.get(`/categories/${id}`);
        this.category = res.data;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    addCategory: async function (data) {
      const toast = useToast();
      this.loading = true;
      try {
        await axios.post("/categories", data);
        toast.success("category successfully created");
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        this.loading = false;
      }
    },
    updCategory: async function (data, id) {
      const toast = useToast();
      this.updLoading = true;
      try {
        await axios.patch(`/categories/${id}`, data);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        this.updLoading = false;
      }
    },
    delCategory: async function (id) {
      const toast = useToast();
      this.deleteLoading = id;
      try {
        await axios.delete(`/categories/${id}`);
        this.categories = this.categories.filter((el) => el._id != id);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        this.deleteLoading = "";
      }
    },
  },
});
