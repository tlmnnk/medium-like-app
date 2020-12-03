import Vue from 'vue'
import { Button, Form, FormItem, Input, Menu, MenuItem } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// configure language
locale.use(lang)

Vue.use(Button, { locale })
Vue.use(Form, { locale })
Vue.use(FormItem, { locale })
Vue.use(Input, { locale })
Vue.use(Menu, { locale })
Vue.use(MenuItem, { locale })
