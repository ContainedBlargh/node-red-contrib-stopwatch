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
                msg.raw = diff[0]*1000 + diff[1] / 1000000;
                msg.payload = pretty;
                node.send(msg);
            } else {
                state.time = process.hrtime();
                state.running = true;
            }
        });
    }
    RED.nodes.registerType("stopwatch", stopwatch);
}
