const mutations = {
 /* addCart(state, info) {
    console.log(info);
    // 1.查看是否添加过
    const oldInfo = state.cartList.find(item => item.iid === info.iid)

    // 2.+1或者新添加
    if (oldInfo) {
      //oldInfo.count += 1
      state.commit('addCounter',oldInfo)
    } else {
      info.count = 1
      //info.checked = true
     // state.cartList.push(info)
     state.commit('addToCart',info)
    }
  }*/
addCounter(state,payload){
    payload.count++
},
addToCart(state,payload){
    state.cartList.push(payload)
}
}

export default mutations

