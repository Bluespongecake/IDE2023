// Sample device data
const devices = [
  { name: "Kitchen", batteryLevel: 80, status: "good" ,alerts: "No Alerts"},
  { name: "Living Room", batteryLevel: 50, status: "bad", alerts: "CO Warning!" },
  { name: "Garage", batteryLevel: 20, status: "check", alerts: "Low Battery!" },
  { name: "Office", batteryLevel: 0, status: "bad", alerts: "No Connection" },
];

// Function to generate the battery level class based on the battery percentage
function getBatteryLevelClass(batteryLevel) {
  if (batteryLevel >= 95) {
    return "battery-full";
  } else if (batteryLevel >= 70) {
    return "battery-high";
  } else if (batteryLevel >= 25) {
    return "battery-medium";
  } else {
    return "battery-low";
  }
}

// Function to populate the device list with battery levels
function populateDeviceList() {
  const deviceList = document.getElementById("device-list");
  devices.forEach((device) => {
    const listItem = document.createElement("li");

    const deviceName = document.createElement("span");
    deviceName.className = "device-name";
    deviceName.textContent = "Loading...";


    const alertsWrapper = document.createElement("span");
    alertsWrapper.className = "alerts";
    alertsWrapper.textContent = "Loading...";


    const statusWrapper = document.createElement("div");
    statusWrapper.className = "status " + "noStatus";
    // statusWrapper.textContent = device.status;

    const batteryLevel = document.createElement("div");
    batteryLevel.className = "battery-level " + "noBattery";
    // batteryLevel.textContent = device.batteryLevel + "%";
    batteryLevel.textContent = "";

    listItem.appendChild(deviceName);
    listItem.appendChild(alertsWrapper);
    listItem.appendChild(statusWrapper);
    listItem.appendChild(batteryLevel);

    deviceList.appendChild(listItem);
    
    setTimeout(function() {
      deviceName.textContent = device.name;
      alertsWrapper.textContent = device.alerts;
      alertsWrapper.className = "alerts"  + " a" + device.status;
      statusWrapper.className = "status " + device.status;
      batteryLevel.className = "battery-level " + getBatteryLevelClass(device.batteryLevel);


    }, 2000);
  });
}

// Function to update the scrolling mechanic
function updateScroll(indexToHighlight) {
  // Variable to store the index of the element to highlight

  // Get the list element by its ID
  var list = document.getElementById('device-list');

  // Get the list items within the list
  var listItems = list.getElementsByTagName('li');

  indexToHighlight = indexToHighlight % listItems.length

  // Check if the index is within the bounds of the list
  if (indexToHighlight >= 0 && indexToHighlight < listItems.length) {

    // Remove the highlight class from all list items
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].classList.remove('highlight');
    }

    // Add the highlight class to the selected list item
    listItems[indexToHighlight].classList.add('highlight');
  }

}

// Call the function to populate the device list on page load
populateDeviceList();

//set scroll progress to 0
updateScroll(0);

var currScroll = 0;
var x = document.getElementsByTagName("BODY")[0];

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowDown") {
    currScroll += 1;
    updateScroll(currScroll);
  }
  if (event.key === "ArrowUp") {
    currScroll -= 1;
    updateScroll(currScroll);
  }
  if (event.key === "Enter") {
    self.location="devices.html";
  }
  if (event.key === "a") {
    self.location="alarmTrigger.html";
  }
});


// setTimeout(function() {
//   window.location.reload();
// }, 5000);