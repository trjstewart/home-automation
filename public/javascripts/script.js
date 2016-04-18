$(document).ready(function() {
	updateDeviceList();

});

var updateDeviceList = function() {
	var deviceList = $('#DeviceList');

	$.get('wol/devices', function(devices) {
		devices = JSON.parse(devices);
		deviceList.empty();

		devices.forEach(function(device) {
			deviceList.append("" +
				"<li class='list-group-item list-group-item'>" +
					deviceTypeIcon(device.type) +
					device.name +
					"<span class='pull-right'>" +
						"<a onclick='showInfo(" + device.id + ")'><i class='fa fa-info'></i></a>" +
						"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
						"<a onclick='wakeDevice(" + device.id + ")'><i class='fa fa-power-off'></i></a>" +
					"</span>" +
				"</li>"
			)
		});
	});
};

var deviceTypeIcon = function(type) {
	if (type == 'pc') {
		return "<i class='fa fa-desktop'></i>&nbsp;";
	} else if (type == 'laptop') {
		return "<i class='fa fa-laptop'></i>&nbsp;";
	}

	// TODO: Add other device types.
};

var wakeDevice = function(id) {
	$.post('wol/wake', { id: id } );

	// TODO: Add error handeling on response.
};

// Bootstrap Popovers - Enable Everywhere.
$(function () { $('[data-toggle="popover"]').popover() });
// Bootstrap Tooltips - Enable Everywhere.
$(function () { $('[data-toggle="tooltip"]').tooltip() });

