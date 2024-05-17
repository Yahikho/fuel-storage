# Welcome to Fuel Storage API-REST
This API-REST is created with **Nest.js**, this app manages files in AWS S3 from a local service API-REST.

## Workflow
When the user registers in the APP, this service creates a user in AWS-IAM and create a bucket in AWS-S3, also creating a policy to the user to manages the process in the bucket, the credentials of the user (accsess_key and secret_access_key) are saved in DB, and then used to create, delete, get and list objects from the bucket.  

### Setup APP

- Nest.js
- AWS (IAM,S3)
-  SQL SERVER (T-SQL)
-  Jest and Supertest

### To clone this repo
- Configure AWS CLI with an ADMIN user, this user must have permissions to create buckets and and user in AWS (IM).
> Important, is not recommend use the root user in a external application AWS.
- Create environment variables in `` .env`` file.
> Important, this app use JWT, so you will should assign secret key.
- Clone this repo
```
git clone https://github.com/Yahikho/fuel-storage.git
```
- Download dependencies 
```
$  npm install
```
- Run migrations from TypeORM
 ```
 npm run typeorm:run
``` 
- Execute app
```
npm run start:dev
```