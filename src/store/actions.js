const actions = {
    addCart(comtext, info) {
        console.log(info);
        // 1.查看是否添加过
        const oldInfo = comtext.state.cartList.find(item => item.iid === info.iid)
    
        // 2.+1或者新添加
        if (oldInfo) {
          //oldInfo.count += 1
          comtext.commit('addCounter',oldInfo)
        } else {
          info.count = 1
          info.checked = true
         // state.cartList.push(info)
         comtext.commit('addToCart',info)
        }
      }
}

export default actions

