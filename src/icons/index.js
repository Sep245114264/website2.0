/**
 * 全局注册svgIcon组件
 * 自动导入svgIcon
 */
import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon';

Vue.component('svg-icon', SvgIcon);
const svgFiles = require.context('./svg', false, /\.svg$/);
const requireSvg = context => context.keys().map(context);
requireSvg(svgFiles);
