import { App, createApp } from 'vue'
import Apps from './App.vue'
import router from './router'
import store from './store'
import api, { apiInstance } from './api';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn'
import './permission';
import '@/style/reset.scss';
import SvgIcon from '@/components/SvgIcon.vue';
import BcSelect from '@/components/bcSelect.vue';
import BcTable from '@/components/bcTable/index';
import BcDialog from '@/components/bcDialog.vue';
import VueApollo from '@vue/apollo-option';

// import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

// // 与 API 的 HTTP 连接
// const httpLink = createHttpLink({
//   // 你需要在这里使用绝对路径
//   uri: 'http://localhost:3020/graphql',
// })

// // 缓存实现
// const cache = new InMemoryCache()

// // 创建 apollo 客户端
// const apolloClient = new ApolloClient({
//   link: httpLink,
//   cache,
// })

const app = createApp(Apps);
app.use(store).use(router).mount('#app');
app.use(ElementPlus, { locale });
app.use(apiInstance);
// app.use(new VueApollo({
//   defaultClient: apolloClient
// }));
app.component('svg-icon', SvgIcon);
app.component('bc-select', BcSelect);
app.component('bc-table', BcTable);
app.component('bc-dialog', BcDialog);
app.config.globalProperties.$api = api;
