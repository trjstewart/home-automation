var router = require('express').Router();
var wol = require('wake_on_lan');
var arp = require('arp-dash');


var broadcast = '192.168.0.255';
var devices = [
	{ id: '1', type: 'pc', name: 'Stormtrooper', ip: '192.169.0.67', mac: '60:A4:4C:40:E2:48' },
	{ id: '2', type: 'pc', name: 'Stormtrooper', ip: '192.169.0.1', mac: '60:A4:4C:40:E2:41' },
	{ id: '3', type: 'laptop', name: 'Stormtrooper', ip: '192.169.0.2', mac: '60:A4:4C:40:E2:42' },
	{ id: '4', type: 'pc', name: 'Stormtrooper', ip: '192.169.0.3', mac: '60:A4:4C:40:E2:43' },
	{ id: '5', type: 'pc', name: 'Stormtrooper', ip: '192.169.0.4', mac: '60:A4:4C:40:E2:44' },
	{ id: '6', type: 'pc', name: 'Stormtrooper', ip: '192.169.0.5', mac: '60:A4:4C:40:E2:45' },
	{ id: '7', type: 'laptop', name: 'Stormtrooper', ip: '192.169.0.6', mac: '60:A4:4C:40:E2:46' },
	{ id: '8', type: 'laptop', name: 'Stormtrooper', ip: '192.169.0.7', mac: '60:A4:4C:40:E2:47' },
	{ id: '9', type: 'pc', name: 'Stormtrooper', ip: '192.169.0.8', mac: '60:A4:4C:40:E2:48' },
	{ id: '10', type: 'pc', name: 'Stormtrooper', ip: '192.169.0.9', mac: '60:A4:4C:40:E2:49' }
];

router.get('/devices', function(req, res) {
	// Return a list of available devices.
	res.send(JSON.stringify(devices));
});

router.post('/wake', function (req, res) {
	// Find correct device.
	var device = devices.filter(function (device) { return device.id === req.body.id; })[0];

	// Send Magic Packets to targeted device.
	wol.wake(device.mac, { address: broadcast }, function(error) {
		res.send((error) ? {result: 'error', message: error} : {result: 'success', message: 'packets sent'});
	});
});

module.exports = router;