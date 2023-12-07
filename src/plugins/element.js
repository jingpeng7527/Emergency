import Vue from 'vue'
import { Button } from 'element-ui'
import ElementUI from 'element-ui'   
import { MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'   //引用 element-ui 样式

Vue.use(ElementUI )  //最后要use ElementUI ，不然会报错
Vue.use(Button)
Vue.prototype.$confirm = MessageBox.confirm