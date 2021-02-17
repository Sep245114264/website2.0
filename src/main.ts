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

const app = createApp(Apps);
app.use(store).use(router).mount('#app');
app.use(ElementPlus, { locale });
app.use(apiInstance);
app.component('svg-icon', SvgIcon);
app.component('bc-select', BcSelect);
app.component('bc-table', BcTable);
app.component('bc-dialog', BcDialog);
app.config.globalProperties.$api = api;
