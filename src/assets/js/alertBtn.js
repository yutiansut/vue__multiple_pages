import Vue from 'vue';
import OriginAlert from '../../components/AlertBtn';

const AlertBtn = Vue.extend(OriginAlert);

// Alert框
export const alertBtn = option => {

  let alertInstance = new AlertBtn({
    el: document.createElement('div'),
  });

  document.body.appendChild(alertInstance.$el);

  Object.assign(alertInstance, option);

  Vue.nextTick(() => {
    alertInstance.show();
  });
};
