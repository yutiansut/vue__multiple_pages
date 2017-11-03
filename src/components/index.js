import City from "./coCity.vue";
import CommonNav from "./coCommonNav.vue";
import MessageIcon from "./coMessageIcon.vue";
import NewsList from "./coNewsList.vue";
import VerticalSwipe from "./coVerticalSwipe.vue";
import WithStatusBar from "./coWithStatusBar.vue";
import ToastBtn from "./coToastBtn.vue";
import MultiSlide from "./multiSlide.vue";

import Mask from './Mask';
import Loading from './Loading';
import Group from './Group';
import Cell from './Cell';
import toast from '../assets/js/toast';
import {alert} from '../assets/js/alert';
import {alertBtn} from '../assets/js/alertBtn';
import loading from '../assets/js/loading';
import Picker from './Picker';
import PickerOption from './PickerOption';
import Loadmore from './Loadmore';

const pbUI = {
  City,
  CommonNav,
  MessageIcon,
  NewsList,
  VerticalSwipe,
  WithStatusBar,
  ToastBtn,
  MultiSlide,
  Mask,
  Loading,
  Group,
  Cell,
  Picker,
  PickerOption,
  Loadmore
}

const install = Vue => {
  if (install.installed) return;

  // components
  Object.keys(pbUI).forEach(key => {
    Vue.component(pbUI[key].name, pbUI[key]);
  });
  Vue.$toast = Vue.prototype.$toast = toast;
  Vue.$alert = Vue.prototype.$alert = alert;
  Vue.$alertBtn = Vue.prototype.$alertBtn = alertBtn;
  Vue.$loading = Vue.prototype.$loading = loading;
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...pbUI,
};

