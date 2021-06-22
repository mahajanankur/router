# Utility
## _SearchUnify internal utility service._

This is a generic utility service to manage internal things like alerts, trials and infrastructure calculators etc.

## Features
- Trials management.
- Infrastructure calculator.

## Execution
#### PM2
Utility requires [Node 10.18+](https://nodejs.org/en/download/) to run and [PM2](https://www.npmjs.com/package/pm2/) to build.

1. Run mongodb and update credentials in utility default.json.
2. Update shell script path in default.json.
3. Update and create a trials directory in default.json.
4. Update other parameters like enabled flag in default.json.

```sh
cd utility
pm2 start index.js --name "utility"
pm2 start src/utils/swaggerClient.js --name "utility-swagger"
```
#### Docker
Utility requires [Docker 20.10.7+](https://docs.docker.com/get-docker/) and [Docker compose 1.21.2+](https://github.com/docker/compose/) to run and build.

#### Building for source
```sh
git clone https://gitlab.searchunify.com/searchunify/utility.git
cd utility
docker-compose --compatibility up --build -d
```
It will build an `utility:latest` docker image.
#### Run docker container
```sh
cd utility
docker-compose --compatibility up --build -d
# To run swagger. Update swagger url and serverName in default.json as per your DNS.
docker-compose -f docker-compose-swagger.yml --compatibility up --build -d
```
## Points to Remember
1. Trials access host machine directory during automation so trial feature should not be run inside docker.

2. To disable a particular service you need to update `servicesEnable` object `false in default.json`. The example configurations are mentioned below.
```json
{
    "servicesEnable": {
        "enableTrials": false,
        "enableInfraCalc": true
    }
}
```
**Powered by [SearchUnify](https://www.searchunify.com/)!**
