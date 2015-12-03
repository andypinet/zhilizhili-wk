import { createStore } from 'redux';

function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state
    }
}

let store = createStore(counter);

var component1 = Component("#component1", {
    database: store,
    subscribe: function(newstate, oldstate) {
    }
});

var component2 = Component("#component2", {
    database: store,
    subscribe: function(newstate, oldstate) {
        console.dir(newstate);
        component2.dom.innerHTML = newstate;
    }
});

component1.dom.querySelector('button').addEventListener('click', function() {
    component1.dispatch({type: 'INCREMENT'});
});


