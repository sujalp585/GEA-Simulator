async function setup(gatewayAccessToken)
{
  //process: gateway sync -> register device presence

  //step 1:
  const myHeaders = new Headers();
  myHeaders.append('Host', 'device.mysmarthq.com')
  myHeaders.append('Authorization', gatewayAccessToken);
  myHeaders.append('Content-Type', 'application/json');

  let data = {
    "devices": [{
     "deviceType": "cloud.smarthq.device.hood",
     "defaultNickname": "Hood",
     "updId": "D828C9000000",
     "macAddress": "D828C9000000",
     "cookie": {
      "applianceId": "D828C9000000",
      "deviceCategory": "APPLIANCE",
      "userId": "abcdefghijklmno"
     },
     "defaultIcon": "cloud.smarthq.icon.hood",
     "removable": true,
     "model": "ABC123",
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
      },
      {
        "serviceType": "cloud.smarthq.service.toggle",
        "domainType": "cloud.smarthq.domain.delay.off",
        "supportedCommands": [ "cloud.smarthq.command.toggle.set" ],
        "state": {"on": "false"},
        "serviceId": "cf502bc1c13eb48ba2e6586c5cec03b646de3910744008231a8a18232f8faa3c",
        "serviceDeviceType": "cloud.smarthq.device.fan",
        "config": {}
      }
     ],
     "deviceId": "123456789",
     "connectionType": "cloud.smarthq.connection.wifi"
    }],
    "kind": "gateway#sync",
    "gateway": {
     "serial": "abcdefghijklmno",
     "model": "BrillionAdapter",
     "version": "1.0",
     "gatewayId": "abcdefghijklmno"
    }
   };

  let response = await fetch('https://device-fld.mysmarthq.com/v2/gateway', 
  {
    method: 'POST',
    headers: myHeaders,
    body: data
  });

  if(response.ok)
  {
    let response_data = await response.json();
    console.log(response_data);

    if(response_data.success == "false")
    {
      alert("SyncToGateway failed!");
      return;
    }
    else
    {
      console.log("SyncToGateway success. Last sync time: " + response_data.syncTime);
    }
  }
  else
  {
    alert("HTTP Error (SyncToGateway): " + response.status);
    return;
  }


  //step 2:
  data = {
    kind: "device#presence",
    deviceId: "123456789",
    presence: "ONLINE"
  }

  response = await fetch('https://device-fld.mysmarthq.com/v2/device/presence', 
  {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data)
  });

  if(response.ok)
  {
    let response_data = await response.json();
    console.log(response_data);

    if(response_data.success == "false")
    {
      alert("RegisterDevice failed!");
    }
    else
    {
      console.log("RegisterDevice success!");
    }
  }
  else
  {
    alert("HTTP Error (RegisterDevice): " + response.status);
  }
}


var global_light_state = "cloud.smarthq.type.mode.off";
var global_fan_state = "cloud.smarthq.type.mode.off";
var global_delay_active = "false";

async function update_state(button_name)
{
  const myHeaders = new Headers();
  myHeaders.append('Host', 'device.mysmarthq.com')
  myHeaders.append('Authorization', gatewayAccessToken);
  myHeaders.append('Content-Type', 'application/json');

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
      global_delay_active = "true";
      break;
    case "delay_off":
      global_delay_active = "false";
      break;
  }

  let data = {
    kind: "device#services",
    deviceId: "123456789",
    service: [
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

  let response = await fetch('https://device-fld.mysmarthq.com/v2/device/state', 
  {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data)
  });

  if(response.ok)
  {
    let response_data = await response.json();
    console.log(response_data);

    if(response_data.success == "false")
    {
      alert("Device command was not successful!");
    }
    else
    {
      console.log("Updated device state successfully!");
    }
  }
  else
  {
    alert("HTTP Error (device state update): " + response.status);
  }
}