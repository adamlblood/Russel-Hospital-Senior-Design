//-----------------------------Supporting Functions-----------------

//---------------------------------Classes----------------------------

function PortForm(number) {
    var self = this;
    self.number = number;
    self.type = ko.observable();
    self.input_output = ko.observableArray(["Input", "Output"]);
    self.inputOutputSelected = ko.observable();
    self.input_categories = ko.observableArray(["Temperature", "Humidity", "Air Flow", "Air Pressure", "C02", "Fan", "Water"]);
    self.output_categories = ko.observableArray(["Damper Position", "Valve Position", "Fan Speed"]);
    self.input_types = ko.observableArray(["Outdoor Air", "Return Air", "Mixed Air", "Preheat Air", "Supply Air"]);
    self.output_types = ko.observableArray(["Outdoor Air Dampper", "Return Air Damper", "relief/exhaust damper"]);
    self.ioTypeSelected = ko.observable();
}

function Device(name, ip_address) {
    var self = this;
    self.name = name;
    self.ip_address = ip_address;
}


//---------------------------------Model------------------------------
function IndexViewModel() {
    var self = this;

    self.device_name = ko.observable();
    self.ip_address = ko.observable();
    self.mac_address = ko.observable();
    self.ini_name = ko.observable();
    self.io_ports = ko.observableArray(["8", "16"]);
    self.numPortsSelected = ko.observable();
    self.portForms = ko.observableArray([]);
    self.devices = ko.observableArray([]);

    // Operations
    self.displayPortForms = function(formElement) {
        self.portForms.removeAll();
        for (var i = 1; i <= self.numPortsSelected(); i++) {
            self.portForms.push(new PortForm(i));
        }
        //console.log($("#submit-ports").prop("disabled"));
        $("#submit-ports").removeClass("disabled");
    }

    self.submitFormData = function(formElement) {
        self.portForms.removeAll();
        $("#submit-ports").addClass("disabled");
    }

    $.getJSON("http://localhost:5000/rh/api/v1.0/get-equipment", function(data) { 
        for (device in data) {
            self.devices.push(new Device(data[device].name, data[device].ip));
        }
        console.log(data);
    })

}

// Activates knockout.js
ko.applyBindings(new IndexViewModel(), document.getElementById('main_content'));

