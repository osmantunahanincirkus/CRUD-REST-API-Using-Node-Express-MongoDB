const mongoose= require("mongoose")


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