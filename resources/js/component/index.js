export default function(selector, options) {
    var dom = document.querySelector(selector);
    var database = options.database;
    var newstate = database.getState();
    var oldstate = newstate;

    // TODO 判断dom是否存在

    function dispatch(diretive) {
        database.dispatch(diretive);
    }

    database.subscribe(function() {
        newstate = database.getState();
        options.subscribe(newstate, oldstate);
        oldstate = newstate;
    });


    return {
        dispatch: dispatch,
        dom: dom
    }
}
