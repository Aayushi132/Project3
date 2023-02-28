const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const port = 5000;

//Controllers
const ProductsController = require('./controllers/Products')
const UsersController = require('./controllers/Users')
app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send("Server is up")
});

app.get('/products', async (req, res) => {
  const products= await ProductsController.products()
  res.json({result: products})
});

app.post('/registerUser', async(req, res) => {
  try{
  const registeredUser = await UsersController.register(req.body)
  res.send(registeredUser);
} catch (err) {
  res.status(500).json({ message: err.message });
}
})

app.post('/loginUser', async(req, res) => {
  try{
    const LoggedInUser = await UsersController.login(req.body)
    res.send(LoggedInUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

app.post('/enterAddress', async(req, res) => {
  try{
    const LoggedInUser = await UsersController.addaddress(req.body)
    res.send(LoggedInUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

app.post('/getUserInfo', async(req, res) => {
  try{
    const UserInfo = await UsersController.getUserInfo(req.body)
    res.send(UserInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

const uri =
  "mongodb+srv://aayushibhargava1910:aoAWeawfZgLl83wu@cluster0.mf5sbz3.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});