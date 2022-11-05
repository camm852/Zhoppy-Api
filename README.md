
# Zhoppy Backend    

Zhoppy api

## API Reference


For endpoints that require authentication or adinistrator, the JWT must be sent back at the time of logging in.

### Get all users

#### Endpoint for admin

```http
  GET /api/users/
```


### Sign Up

```http
  POST /api/users/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string`   | **Required**.  |
| `email`    | `string`   | **Required**.  |
| `address`    | `string`   | **Required**.  |
| `password`    | `string`   | **Required**. |
| `phone`    | `string`   | **Required**. |

Look at the photo of the database

### Login
```http
  POST /api/users/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`    | `string`   | **Required**.  |
| `password`    | `string`   | **Required**.  |


### Profile

#### Endpoint for authenticated

```http
  PUT /api/users/profile
```

Edit your profile information

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string`   | optional.  |
| `email`    | `string`   | **Required**. the email must always be the same .  |
| `address`    | `string`   | optional.  |
| `phone`    | `string`   | optional. |



### Get All Providers

#### Endpoint for admin

```http
  GET /api/providers/
```

### New Provider

#### Endpoint for admin

```http
  POST /api/providers/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string`   | **Required**. |
| `city`    | `string`   | **Required**. where does the provider come from |
| `address`    | `string`   | **Required**. |
| `phone`    | `string`   | **Required**. |


### Delete Provider

#### Endpoint for admin

```http
  DELETE /api/providers/:id
```

In the URL must be the provider id

### Update Provider

#### Endpoint for admin

```http
  PUT /api/providers/:id
```

In the URL must be the provider id


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string`   | **Required**. |
| `city`    | `string`   | **Required**. where does the provider come from |
| `address`    | `string`   | **Required**. |
| `phone`    | `string`   | **Required**. |


### Get All Shoes

#### Endpoint for admin

```http
  GET /api/shoes/
```

### New Shoes

#### Endpoint for admin

```http
  POST /api/shoes/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string`   | **Required**. |
| `price`    | `string or number`   | **Required**.|
| `stock`    | `string or number`   | **Required**. |
| `description`    | `string`   | **Required**. |
| `image`    | `file`   | **Required**. |



### Delete Shoe

#### Endpoint for admin

```http
  DELETE /api/shoes/:id
```

In the URL must be the provider id

### Update Shoe

#### Endpoint for admin

```http
  PUT /api/providers/:id
```

In the URL must be the provider id

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string`   | **Required**. |
| `price`    | `string or number`   | **Required**.|
| `stock`    | `string or number`   | **Required**. |
| `description`    | `string`   | **Required**. |
| `image`    | `file`   | **Required**. |



### Shoes Home

```http
  GET /api/shoes/home
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`: Server port

`DATABASE_NAME`: Database name

`DATABASE_USERNAME`: Database username

`DATABASE_PASSWORD`: Database password

`JWT_SECRET`: Word to unsign a JWT 

#### Cloudnary config

`CLOUD_NAME`

`API_KEY`

`API_SECRET`
 

## Database

![Database](https://res.cloudinary.com/daboamwpv/image/upload/v1667684678/Captura_de_pantalla_20221105_044152_g8tqy1.png)


## Authors

- [@camm852](https://github.com/camm852)


## 🔗 Links

[![FRONTEND](https://img.shields.io/badge/Frontend-Github-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/camm852/Zhoppy-Front)
