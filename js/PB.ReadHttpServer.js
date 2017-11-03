/**
 * Created by pobo on 2016/11/3.
 */
!function (global) {
  var root = this;

  var pbReadConfig = function () {};

  var pbRC = new pbReadConfig();

  var xmlHttpRequest;
  var configAddr = '../conf/h5/cfHttpServer.json';
  var jsonConfig = {};

  function sendAjax() {
    xmlHttpRequest = null;
    xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET', configAddr, false);
    xmlHttpRequest.send(null);
    if (xmlHttpRequest.status == 200) {
      return JSON.parse(xmlHttpRequest.responseText);
    } else {
      return {};
    }
  }

  if (root.pbESYS) {
    jsonConfig = JSON.parse(pbESYS.readConfig('conf/h5/cfHttpServer.json'));
    //jsonConfig = sendAjax();
  } else {
    jsonConfig = sendAjax();
  }

  pbRC.RHS = function (moduleName, moduleSubkey) {
    if(root.pbESYS) {
      return root.pbESYS.readHttpServer(moduleName, moduleSubkey) ? root.pbESYS.readHttpServer(moduleName, moduleSubkey) : jsonConfig[moduleName][moduleSubkey];
    }
    else {
      return jsonConfig[moduleName][moduleSubkey];
    }
  }
  !global.pbRC && (global.pbRC = pbRC);
}(window)
