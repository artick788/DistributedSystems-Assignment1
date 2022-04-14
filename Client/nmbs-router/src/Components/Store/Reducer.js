
export let initialState = {
    stations: [],
    stationNames: [],
    fromStation: null,
    toStation: null,
    selectedStation: null,
    map: null
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case "stations":
            return {...state, stations: action.value}
        case "stationNames":
            return {...state, stationNames: action.value}
        case "fromStation":
            return {...state, fromStation: action.value}
        case "toStation":
            return {...state, toStation: action.value}
        case "selectedStation":
            return {...state, selectedStation: action.value}
    }
}