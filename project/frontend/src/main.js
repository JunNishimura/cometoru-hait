import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//---------- Base Components ----------//
import BaseCard from '@/components/UI/BaseCard.vue';
import BaseProfileContent from '@/components/UI/BaseProfileContent.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseTag from '@/components/UI/BaseTag.vue';
import BaseHorizontalTab from '@/components/UI/BaseHorizontalTab.vue';
import BaseModal from '@/components/UI/BaseModal.vue';
import BaseForm from '@/components/UI/BaseForm.vue';
import BaseVerticalDropdown from '@/components/UI/BaseVerticalDropdown.vue';
import BaseVerticalTab from '@/components/UI/BaseVerticalTab.vue';

//---------- Font Awesome ----------//
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faUserPlus, faUserMinus, faUsers, faMapMarkerAlt, faCheck, faEnvelope, faUniversity, faBookOpen, faTimes, faTag, faBolt, faBrain, faComments, faDollarSign, faHome, faBookmark, faSearch, faArrowLeft, faSignOutAlt, faSignInAlt, faBell, faLink, faPaperPlane, faSortUp, faSortDown, faTrash, faPencilAlt, faCalendarDay, faCog, faCaretDown, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faEdit, faLightbulb, faHandshake, faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faUser, faUserPlus, faUserMinus, faUsers, faMapMarkerAlt, faCheck, faEnvelope, faUniversity, faBookOpen, faTimes, faTag, faBolt, faBrain, faComments, faDollarSign, faHome, faBookmark, faSearch, faArrowLeft, faSignOutAlt, faSignInAlt, faBell, faLink, faPaperPlane, faSortUp, faSortDown, faTrash, faPencilAlt, faCalendarDay, faCog, faCaretDown, faEllipsisV,
            faFacebookSquare, faTwitterSquare, 
            faEdit, faLightbulb, faHandshake, faClock);
Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.config.productionTip = false
// add base components
Vue.component('BaseCard', BaseCard);
Vue.component('BaseProfileContent', BaseProfileContent);
Vue.component('BaseButton', BaseButton);
Vue.component('BaseTag', BaseTag);
Vue.component('BaseHorizontalTab', BaseHorizontalTab);
Vue.component('BaseModal', BaseModal);
Vue.component('BaseForm', BaseForm);
Vue.component('BaseVerticalDropdown', BaseVerticalDropdown);
Vue.component('BaseVerticalTab', BaseVerticalTab);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
