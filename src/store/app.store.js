//def. app store actions
export const ACTION_CHANGE_BATTERY_USED = "ActionBatteryUsed"
export const ACTION_CHANGE_BATTERY_TOTAL = "ActionBatteryTotal"
export const ACTION_CHANGE_ADDRESS = "ActionChangeAddress"

//def. app store mutations
const CHANGE_BATTERY_USED  = "ChangeBatteryUsed"
const CHANGE_BATTERY_TOTAL = "ChangeBatteryTotal"
const CHANGE_ADDRESS = "ChangeAddress"
//app state inicial
const state = {
    total: 10000,
    used: 0,
    address: ''
}

// getters 
const getters = {
    getTotal (state) {
        return state.total
    },
    getUsed (state) {
        return state.used
    },
    getAddress (state) {
        return state.address
    }
}

//app store actions
const actions = {
    [ACTION_CHANGE_BATTERY_USED] (context, amount) {
        context.commit(CHANGE_BATTERY_USED, amount);
    },
    [ACTION_CHANGE_BATTERY_TOTAL] (context, amount) {
        context.commit(CHANGE_BATTERY_TOTAL, amount); 
    },
    [ACTION_CHANGE_ADDRESS] (context, address) {
        context.commit(CHANGE_ADDRESS, address); 
    }
}

//app store mutations
const mutations = {
    [CHANGE_BATTERY_USED] (state, n) {
        state.used = Number(n)
        console.log("Batería utilizada: "+state.used)
    },
    [CHANGE_BATTERY_TOTAL] (state, n) {
        state.total = Number(n)
        console.log("Batería Total: "+state.total)
    },
    [CHANGE_ADDRESS] (state, n) {
        state.address = n
        console.log("Cambio de address: "+state.address)
    }
}

// Exportamos todo
export default {
    state,
    actions, 
    mutations,
    getters
}