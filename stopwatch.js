let state = {
    running: false,
    hrstart: null
};
module.exports = (RED) => {
    const process = require('process');
    function stopwatch(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function(msg) {
            if (state.running) {
                state.running = false;
                const diff = process.hrtime(state.time);
                const pretty = `${diff[0]}s ${diff[1] / 1000000}ms`
                msg.payload = pretty;
                node.send(msg);
            } else {
                state.time = process.hrtime();
                state.running = true;
                // msg.payload = null;
                // node.send(msg);
            }
        });
    }
    RED.nodes.registerType("stopwatch", stopwatch);
}
