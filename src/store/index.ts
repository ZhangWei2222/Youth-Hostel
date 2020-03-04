import Vue from "vue";
import Vuex, { Store } from "vuex";

Vue.use(Vuex);

// const moduleA = {
//   namespaced: true,
//   state: { count: 1 },
//   mutations: {
//     add(state) {
//       state.count = state.count + 1;
//     },
//     reduction(state) {
//       state.count = state.count - 1;
//     }
//   }
//   // mutations: { ... },
//   // actions: { ... },
//   // getters: { ... }
// };

// const moduleB = {
//   state: { count: 1 },
//   mutations: {
//     add(state) {
//       state.count = state.count + 1;
//     },
//     reduction(state) {
//       state.count = state.count - 1;
//     }
//   }
//   // mutations: { ... },
//   // actions: { ... }
// };

interface State {
  userState: {
    // name: string,
    // password: string,
    // sex: string,
    // bornDate: any,
    // phoneNum: string,
    // schoolName: string,
    // education: string,
    // graduationTime: any,
    // message: string
    avatorUrl: string
  }
}

const cacheState: State = {
  userState:
  {
    // name: "",
    // password: "",
    // sex: "",
    // bornDate: "",
    // phoneNum: "",
    // schoolName: "",
    // education: "",
    // graduationTime: "",
    // message: ""
    avatorUrl: "cat.png"
  }
}

const store: Store<any> = new Vuex.Store({
  strict: true,
  state: cacheState,
  // getters: {
  //   getStateCount(state) {
  //     return state.count + 1;
  //   }
  // },
  mutations: {
    SET_USER_AVATOR(state, payload) {
      console.log(state, payload)
      state.userState.avatorUrl = payload;
    }
    // add(state) {
    //   state.count = state.count + 1;
    // },
    // reduction(state) {
    //   state.count = state.count - 1;
    // }
  },
  // actions: {
  //   addFun(context) {
  //     context.commit("add");
  //   },
  //   reductionFun(context) {
  //     context.commit("reduction");
  //   }
  // }
  // modules: { a: moduleA, b: moduleB }
});

export default store;
