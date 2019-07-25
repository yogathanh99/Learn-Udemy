import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = name => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: name
})

export const removeIngredient = name => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: name
})

const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients
})

const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
})

export const fetchIngredients = () => {
  return distpatch => {
    axios
      .get('https://burger-app-react-thanhvo.firebaseio.com/ingredients.json')
      .then(res => {
        distpatch(setIngredients(res.data))
      })
      .catch(error => {
        distpatch(fetchIngredientsFailed())
      })
  }
}
