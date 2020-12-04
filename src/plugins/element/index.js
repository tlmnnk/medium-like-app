import Vue from 'vue'
import { Avatar, Badge, Button, Form, FormItem, Input, Menu, MenuItem, Row, Col, Pagination, Tag } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
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
Vue.use(Row, { locale })
Vue.use(Col, { locale })
Vue.use(Avatar, { locale })
Vue.use(Badge, { locale })
Vue.use(Pagination, { locale })
Vue.use(Tag, { locale })
