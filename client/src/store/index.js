import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);



export default new Vuex.Store({
    state:{
        login:false,
        currentName:'',
        menu:[
            {name:'user',icon:'ios-navigate',title:'用户管理'},
            {name:'article',icon:'document-text',title:'文章管理'},
            {name:'classify',icon:'ios-albums',title:'分类管理'},
            {name:'comment',icon:'chatbubble-working',title:'评论管理'},
            {name:'ablum',icon:'images',title:'相册管理'},
            {name:'upload',icon:'upload',title:'上传管理'}
        ]
    }
})