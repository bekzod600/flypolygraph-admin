import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
    product: {},
    loading: false,
    updLoading: false,
    deleteLoading: "",
    // token: JSON.parse(sessionStorage.getItem("admin")).token,
  }),
  actions: {
    async getAllProducts() {
      const toast = useToast();
      try {
        const res = await axios.get("/products/?status=all");
        this.products = res.data;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    async getOneProduct(id) {
      const toast = useToast();
      try {
        const res = await axios.get(`/products/${id}`);
        this.product = res.data;
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    addProduct: async function (data) {
      const toast = useToast();
      try {
        await axios.post("/products", data);
        toast.success("product successfully created");
      } catch (error) {
        if (error.response) toast.error(error.response.data.message);
      } finally {
        this.loading = false;
      }
    },
    updProduct: async function (data, id) {
      const toast = useToast();
      try {
        await axios.patch(`/products/${id}`, data);
        toast.success("product successfully updated");
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.updLoading = false;
      }
    },
    async delProducts(id) {
      const toast = useToast();
      this.deleteLoading = id;
      try {
        await axios.delete(`/products/${id}`);
        this.products = this.products.filter((el) => el._id !== id);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        this.deleteLoading = "";
      }
    },
  },
});
