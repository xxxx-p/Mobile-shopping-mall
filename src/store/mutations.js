const mutations = {
    ['SET_CLASSID'](state, classId) {
        state.classId = classId
    },
    ['SET_BUYLIST'](state, buylist) {
        state.buylist = buylist
    },
    ['SET_SELECT'](state, select) {
        state.select = select
    },
    ['SET_PRICE'](state, price) {
        state.price = price
    },
    ['SET_COUNT'](state, count) {
        state.count = count
    },
    ['SET_IMGICON'](state, imgicon) {
        state.imgicon = imgicon
    },
    ['SET_ADDRESS'](state, address) {
        state.address = address
    },
    ['SET_CHOSENADDRESSID'](state, chosenAddressId) {
        state.chosenAddressId = chosenAddressId
    },
    ['SET_ADDRESSINFO'](state, addressinfo) {
        state.addressinfo = addressinfo
    },
    ['SET_EDITCHOSENADDRESSID'](state, editChosenAddressId) {
        state.editChosenAddressId = editChosenAddressId
    },
    ['SET_SELECTSHOP'](state, selectshop) {
        state.selectshop = selectshop
    },
}

export default mutations

