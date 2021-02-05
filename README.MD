# k8s-microservices-version

This little app lists the version of microservices. 

## Configuration

This app is configured via environment variables. We assume that each service has an endpoint that returns a Json string with a key named `version` containing the actual version number.  

If you want to add a service simply configure an env variable according to the following scheme: `K8S_SERVICE_ENDPOINT_<service-name>=<service-version-url>`. 

## Run
* `npm install`
* `npm start`
