# RESTful API with Laravel Structure

This is a backend RESTful API project built with Node.js and TypeScript.

## Prerequisites

- Node.js 16 or greater
- TypeScript

## Getting Started
##### To install the project, run:
- clone ```.env.example to .env```. input your configuration
- ```npm install```
- ```npx sequelize db:migrate```
- ```npm run local```
- ```Import postman collection into your project from tynoRESTful.postman_collection.json file```

##### Generate app key
- npm run key:generate
Use this key for APP_KEY in .env file
##### Migration:
- Make new migration
    ```npx sequelize migration:create --name=<name>```
- Migrate DB
    ```npm run sequelize db:migrate```
- Help
    ```npx sequelize --help```
###Some Command line
##### To start the web server for local development, run:
```npm run local```
##### To run a command line, use:
```npm run cmd```
##### To get into console, use:
```npm run tinker```
###### Usage
- Get a service instance: ```global.container.get('<service_class_name>')```
##### To run a worker, use:
- Production: ```npm run queue:work --queue={queueName}```
- Local: ```npm run queue:listen --queue={queueName}```
- or specific connection ```npm run queue:work <connection_name> --queue={queueName}```

## Some Utils
- Use lodash: ```_.get(object, <field_name>)```
- Use container to get instance: ```container.get(<BoundClass>)```
## Dispatch job
- Dispatch: ``` new <JobClass>()
            .setJobData({
                field_1: 'filed_1',
                field_n: 'filed_n',
            })
            .dispatch();```
- Delayed Dispatching ``` new <JobClass>()
            .setJobData({
                field_1: 'filed_1',
                field_n: 'filed_n'
            }).delay(moment().add(5, 'minutes'))
            .dispatch();```

## Resource for building RESTful API

- [Express.js](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [Inversify](https://inversify.io/)
- [Commander](https://www.npmjs.com/package/commander)
- [RESTful API Design - Resource Naming](https://restfulapi.net/resource-naming/)