async function authenticateWithSmartHQ(accessToken)
{
  if (accessToken == null || accessToken == undefined)
  {
    alert("OAuth access token cannot be null/undefined!");
    return null;
  }

  //Use the OAuth access token (bearer token) to perform the GE-specific auth stuff
  var bearerToken = accessToken;
  var userId = null;
  var gatewayProvisioningToken = null;
  var gatewayAccessToken = null;

  const myHeaders = new Headers();
    myHeaders.append('Host', 'client-fld.mysmarthq.com');
    myHeaders.append("Authorization", "Bearer " + bearerToken);
    myHeaders.append('Content-Type', 'application/json');

  let response = await fetch('https://client-fld.mysmarthq.com/v2/device', 
  {
    method: 'GET',
    headers: myHeaders,
  });

  if(response.ok)
  {
    let response_data = await response.json();
    console.log(response_data);

    if(response_data.success == "false")
    {
      alert("Device call failed!");
      return null;
    }
    else
    {
      userId = response_data.userId;
    }
  }
  else
  {
    alert("HTTP Error (device call): " + response.status);
    return null;
  }


  response = await fetch('https://client-fld.mysmarthq.com/v2/gateway', 
  {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(
      {
        "kind": "gateway#provision"
      }
    )
  });

  if(response.ok)
  {
    let response_data = await response.json();
    console.log(response_data);

    if(response_data.success == "false")
    {
      alert("Gateway call failed!");
      return null;
    }
    else
    {
      gatewayProvisioningToken = response_data.gatewayProvisioningToken;
    }
  }
  else
  {
    alert("HTTP Error (gateway call): " + response.status);
    return null;
  }


  response = await fetch('https://device-fld.mysmarthq.com/v2/gateway/provision', 
  {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(
      {
        "kind": "gateway#provision",
        "gatewayProvisioningToken": gatewayProvisioningToken,
        "adapterId": "77077d8953a7430b7a846bf1c070d992256e4e36",
        "adapterSecret": "5619818940d848763b2c70e9a16abdafba555d1b4758d773c7a0929fa583ab30",
        "adapterGatewayId": userId
      }
    )
  });

  if(response.ok)
  {
    let response_data = await response.json();
    console.log(response_data);

    if(response_data.success == "false")
    {
      alert("Gateway provisioning call failed!");
      return null;
    }
    else
    {
      gatewayAccessToken = response_data.gatewayAccessToken;
      return gatewayAccessToken;
    }
  }
  else
  {
    alert("HTTP Error (gateway provision call): " + response.status);
  }

  return null; //failed to retrieve gateway access token
}