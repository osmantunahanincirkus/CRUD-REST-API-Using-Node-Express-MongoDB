const app = require("./app");
const port = process.env.PORT || 5001
const cors= require("cors")

app.use(cors())

app.listen(port, () => {
    console.log(`Server Started From Port ${port}...`);
});