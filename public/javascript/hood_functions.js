let socket = null;

async function setup(gatewayAccessToken)
{
  const myHeaders = new Headers();
  myHeaders.append('Host', 'device.mysmarthq.com')
  myHeaders.append('Authorization', gatewayAccessToken);

  let response = await fetch('https://device-fld.mysmarthq.com/v2/websocket', 
  {
    method: 'GET',
    headers: myHeaders
  });

  if(response.ok)
  {
    let response_data = await response.json();
    console.log(response_data);

    if(response_data.success == "false")
    {
      alert("Socket setup failed!");
      return;
    }
    else
    {
      console.log("Socket setup success");
      setupSocket(response_data.endpoint);
    }
  }
  else
  {
    alert("HTTP Error (socket setup): " + response.status);
    return;
  }

  await setupGateway();
}

function setupSocket(socketEndpoint)
{
  socket = new WebSocket(socketEndpoint);

  socket.onopen = function(e) {
    //alert("Socket is open at " + socketEndpoint);
  };
  
  socket.onmessage = function(event) {
    alert("Socket message received " + event.data);
  };
  
  socket.onclose = function(event) {
    if (event.wasClean) {
      alert('Socket connection closed cleanly, code=${event.code} reason=${event.reason}');
    } else {
      alert('Socket Connection died!');
    }
  };
  
  socket.onerror = function(error) {
    alert('Socket error!');
  };
}

async function setupGateway()
{
  if(socket.readyState != WebSocket.OPEN){
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  //send "gateway sync" call to socket
  var payload = {
    "action": "gateway",
    "kind": "gateway#sync",
    "gateway": {
      "serial": "SERIAL",
      "model": "GatewaySimulator",
      "version": "VERSION",
      "gatewayId": "rt9e83niwhgp2s2Simulator"
     },
    "devices": [{
      "deviceType": "cloud.smarthq.device.hood",
      "removable": true,
      "deviceId": "123456789",
      "services": [
        {
         "serviceType": "cloud.smarthq.service.mode",
         "domainType": "cloud.smarthq.domain.brightness",
         "supportedCommands": ["cloud.smarthq.command.mode.set"],
         "serviceId": "1bb051964bd9c5dca58a",
         "serviceDeviceType": "cloud.smarthq.device.hood.light",
         "config": {
          "ordered": true,
          "supportedModes": [
           "cloud.smarthq.type.mode.off",
           "cloud.smarthq.type.mode.dim",
           "cloud.smarthq.type.mode.high"
          ]
         }
        },
        {
         "serviceType": "cloud.smarthq.service.firmware.v1",
         "domainType": "cloud.smarthq.domain.firmware",
         "supportedCommands": ["cloud.smarthq.command.firmware.v1.upgrade"],
         "serviceId": "620df6ba3c1a4b8f1fb5",
         "serviceDeviceType": "cloud.smarthq.device.wifi",
         "config": {}
        },
        {
         "serviceType": "cloud.smarthq.service.mode",
         "domainType": "cloud.smarthq.domain.speed",
         "supportedCommands": ["cloud.smarthq.command.mode.set"],
         "serviceId": "c8287e53df2909c50fe3",
         "serviceDeviceType": "cloud.smarthq.device.hood.fan",
         "config": {
          "ordered": true,
          "supportedModes": [
           "cloud.smarthq.type.mode.off",
           "cloud.smarthq.type.mode.low",
           "cloud.smarthq.type.mode.medium",
           "cloud.smarthq.type.mode.high",
           "cloud.smarthq.type.mode.boost"
          ]
         }
        },
        {
         "serviceType": "cloud.smarthq.service.firmware.v1",
         "domainType": "cloud.smarthq.domain.firmware",
         "supportedCommands": ["cloud.smarthq.command.firmware.v1.upgrade"],
         "serviceId": "db3b5203c7557975aed9",
         "serviceDeviceType": "cloud.smarthq.device.appliance",
         "config": {}
        }
       ]
     }]
  };

  socket.send(payload);

  //send "register device presence" to socket
  payload = {
    "action": "gateway",
    "kind": "device#presence",
    "deviceId": "123456789",
    "presence": "ONLINE"
  };

  socket.send(payload);
}


var global_light_state = "cloud.smarthq.type.mode.off";
var global_fan_state = "cloud.smarthq.type.mode.off";
var global_delay_active = false;

async function update_state(button_name)
{
  switch(button_name)
  {
    case "light_off":
      global_light_state = "cloud.smarthq.type.mode.off";
      break;
    case "light_high":
      global_light_state = "cloud.smarthq.type.mode.high";
      break;
    case "light_dim":
      global_light_state = "cloud.smarthq.type.mode.dim";
      break;

    case "fan_stop":
      global_fan_state = "cloud.smarthq.type.mode.off";
      break;
    case "fan_low":
      global_fan_state = "cloud.smarthq.type.mode.low";
      break;
    case "fan_mid":
      global_fan_state = "cloud.smarthq.type.mode.medium";
      break;
    case "fan_fast":
      global_fan_state = "cloud.smarthq.type.mode.high";
      break;
    case "fan_boost":
      global_fan_state = "cloud.smarthq.type.mode.boost";
      break;

    case "delay_on":
      global_delay_active = true;
      break;
    case "delay_off":
      global_delay_active = false;
      break;
  }

  let payload = {
    action: "gateway",
    kind: "device#services",
    deviceId: "123456789",
    services: [
      {
        serviceType: "cloud.smarthq.service.mode",
        state: global_light_state,
        serviceId: "1bb051964bd9c5dca58a"
      },
      {
        serviceType: "cloud.smarthq.service.mode",
        state: global_fan_state,
        serviceId: "c8287e53df2909c50fe3"
      },
      {
        serviceType: "cloud.smarthq.service.toggle",
        state: {
          on: global_delay_active
        },
        serviceId: "cf502bc1c13eb48ba2e6586c5cec03b646de3910744008231a8a18232f8faa3c"        
      }
    ]
  };

  socket.send(JSON.stringify(payload)); 
}