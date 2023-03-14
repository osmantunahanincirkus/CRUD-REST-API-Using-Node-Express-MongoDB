# Backend

A CRUD application where you can do basic CRUD operations using Node, Express, Mongodb.

With this application you can do the following operations:

- Create
- Get
- Get All
- Update
- Delete

## Installation

Download all required node modules with npm install.

```bash
npm install
```
Codes can be tested before running the application.

```bash
npm run test
```
If server and database connection is established, the application can be run.

```bash
npm start
```

## Usage

If the server is successfully connected to the specified port, the message in the code below will appear on your terminal.

```javascript
app.listen(port, () => {
    console.log(`Server Started From Port ${port}...`);
});
```

If you have successfully connected to your database or somehow you cannot connect to your database, the message in the code below will appear on your terminal.

```javascript
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    'useNewUrlParser': true,
    'useUnifiedTopology': true
})
    .then(() => {
        console.log("Successfully Connected to Database !");
    })
    .catch((err) => {
        console.log("Failed to Connect to Database ! : " + err);
    })
```

Then you can execute your database operations such as create, get, update and delete from the api platform you have chosen.

## Contribution

Thank you for your contributions.

- [@baristure](https://github.com/baristure)

## License

[MIT License](LICENSE)
