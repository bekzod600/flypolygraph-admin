import { createRouter, createWebHistory } from "vue-router";
import { admin } from "../store/admin";
import Home from "../view/HomeView.vue";
import Login from "../view/LoginView.vue";
// import AddUser from "../view/AddUserView.vue";
// import Calculate from "../view/calculates/Calculate.vue";
// import Partner from "../view/partners/Partners.vue";
// import PartnerAdd from "../view/partners/Partners_add.vue";
// import Contacts from "../view/contacts/Contacts.vue";
import Product from "../view/products/Products.vue";
import ProductAdd from "../view/products/Products_add.vue";
import ProductUpd from "../view/products/Products_upd.vue";
import Categories from "../view/categories/Categories.vue";
import CategoriesAdd from "../view/categories/Categories_add.vue";
import CategoriesUpd from "../view/categories/Categories_upd.vue";
// import News from "../view/news/News.vue";
// import NewsAdd from "../view/news/News_add.vue";

const routes = [
  { path: "/", name: "home", component: Home, meta: { auth: true } },
  // { path: "/users/add", name: "users_add", component: AddUser, meta: { auth: true } },
  { path: "/login", name: "login", component: Login, meta: { auth: false, layout: "login" } },
  // { path: "/calculates", name: "calculates", component: Calculate, meta: { auth: true } },
  // { path: "/partners", name: "partners", component: Partner, meta: { auth: true } },
  // { path: "/partners/add", name: "partners_add", component: PartnerAdd, meta: { auth: true } },
  // { path: "/contacts", name: "contacts", component: Contacts, meta: { auth: true } },
  { path: "/products", name: "Products", component: Product, meta: { auth: true } },
  { path: "/products/add", name: "Products_add", component: ProductAdd, meta: { auth: true } },
  { path: "/products/update/:id", name: "Products_upd", component: ProductUpd, meta: { auth: true } },
  { path: "/categories", name: "categories", component: Categories, meta: { auth: true } },
  { path: "/categories/add", name: "categories_add", component: CategoriesAdd, meta: { auth: true } },
  { path: "/categories/update/:id", name: "categories_upd", component: CategoriesUpd, meta: { auth: true } },
  // { path: "/news", name: "news", component: News, meta: { auth: true } },
  // { path: "/news/add", name: "news_add", component: NewsAdd, meta: { auth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

router.beforeEach((to, from, next) => {
  const store = admin();
  if ("auth" in to.meta && to.meta.auth && !store.isRegisteration) {
    next("/login");
  } else if ("auth" in to.meta && !to.meta.auth && store.isRegisteration) {
    next("/");
  }
  next();
});

export default router;
