export let initialState = {
    stations: [],
    stationNames: []
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case "stations":
            return {...state, stations: action.value}
        case "stationNames":
            return {...state, stationNames: action.value}
    }
}