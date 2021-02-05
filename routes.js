const express = require('express');
const router = express.Router();
const http = require('http');

const async = require("async");
const process = require('process');

router.get('/versions', function (req, res) {
  let service_dict = {}

  async.forEachOf(process.env, (value, key, callback) => {
    if (key.includes("K8S_SERVICE_ENDPOINT_")) {
      const service_name = key.replace("K8S_SERVICE_ENDPOINT_", "").toLowerCase();
      service_dict[service_name] = value
    }
    callback();
  }, err => {
    if (err) console.error(err.message);
    let response = {}

    async.forEachOf(service_dict, (version_endpoint, service, callback) => {
      getversion(version_endpoint, (version) => {
        response[service] = version
        callback()  
      })
    }, err => {
      console.log(`response ${response}`)
      res.status(200).json(response);
    })
  });
});

function getversion(version_endpoint, cb) {
  const k8s_service_response_version_key = "version"
  http.get(version_endpoint, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      let version = JSON.parse(data)[k8s_service_response_version_key]
      cb(version);
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

module.exports = router;