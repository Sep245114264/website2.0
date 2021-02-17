import { getCurrentInstance, VNode, withScopeId } from 'vue';

export function toFirstUpper(str: string) {
  return str.replace(str[0], str[0].toUpperCase());
}

// export function getStyle(element, stylename) {
//   const computed = document.defaultView.getComputedStyle(element, '');
//   return element.style[stylename] || computed ? computed[stylename] : null;
// }

export function formatTime(time: number) {
  return new Date(time).toLocaleString('zh', { hour12: false }).replace(/\//g, '-');
}

export function injectScopeId(fn: Function) {
  const instance = getCurrentInstance();
  const scopeId = (instance?.type as any).__scopeId;
  return withScopeId(scopeId)(fn);
}
