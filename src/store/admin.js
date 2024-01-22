import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

export const admin = defineStore("admin", {
  state: () => ({ isRegisteration: false }),
  actions: {
    async loginUser(data) {
      const toast = useToast();
      const { email, password } = data;
      if (email === "test@gmail.com" && password === "1234") {
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
