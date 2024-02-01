import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const admin = defineStore("admin", {
  state: () => ({ isRegisteration: false }),
  actions: {
    async loginUser(data) {
      const toast = useToast();
      const { email, password } = data;
      if (email === "eldor" && password === "sharipov8267") {
        return (this.isRegisteration = true);
      } else {
        toast.error("Email yoki Password xato");
      }
    },
    logout() {
      this.isRegisteration = false;
    },
  },
  persist: true,
});
