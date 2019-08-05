const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipesSchema = new Schema({
  title: { type: String, required: true },
  level: { enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: { enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date }
});

const Recipe = mongoose.model('recipe', recipesSchema)

Recipe.create({
  title: 'Pollo al curry',
  level: 'Easy Peasy',
  ingredients: ['de todo'],
  cuisine: 'Asiatica',
  dishType: ['Dish'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef Victor'
})
  .then(
    recipe => {
      console.log('receta creada ', recipe.title)
      return Recipe.insertMany(data)
    }
  )
  .then(
    recipes => {
      recipes.forEach((recipe) => { console.log(recipe.title) })
      Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
    }
  )
  .then(() => {
    console.log('Success')
    Recipe.findByIdAndRemove({ title: 'Carrot Cake' })
  }
  )
  .then(() => {
    console.log('Carrot Cake Deleted');
    mongoose.connection.close();
  })
  .catch(err => { console.log('error: ', err) });


