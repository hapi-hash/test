import { Login } from "@/api/login";
import { setToken, setUsername, getUsername, removeAll, removeToken, removeUsername } from "@/utils/app";
const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    to_ken: '',
    //判断username是否存在
    username: getUsername() || ''
}

const getters = {
    isCollapse: state => state.isCollapse
}

const mutations = {
    SET_COLLAPSE(state){ //必须的 同步 没有回调处理事情
        state.isCollapse = !state.isCollapse
        //html5本地存储
        sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    },
    SET_TOKEN(state, value){
        state.to_ken = value
    },
    SET_USERNAME(state, value){
        state.username = value
    }
}

const actions = { //可以回调处理事情
    login(content, requestData){
        return new Promise((resolve, reject) => {
            //登录接口
            Login(requestData).then((response) => {
                //存储后台返token，字段有可能会改变
                // let data = response.data;
                content.commit('SET_TOKEN','6275a3406a415f2cc258e18dadecdb7f')
                setToken('6275a3406a415f2cc258e18dadecdb7f')
                //存用户名字，后台返回字段
                setUsername('哈皮牛的')
                content.commit('SET_USERNAME','哈皮牛的')
                resolve(response)
            }).catch((error) => {
                content.commit('SET_TOKEN','6275a3406a415f2cc258e18dadecdb7f')
                content.commit('SET_USERNAME','哈皮牛的')
                setToken('6275a3406a415f2cc258e18dadecdb7f')
                //存用户名字，后台返回字段
                setUsername('哈皮牛的')
                reject(error)
            })
        })
    },
    exit(content){
        return new Promise((resolve,reject) => {
            removeAll()
            content.commit('SET_TOKEN','')
            content.commit('SET_USERNAME','')
            resolve()
        })
        
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}
