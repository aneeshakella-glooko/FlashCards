import thunk from 'redux-thunk'
import myLogger from '../middlewares/myLogger'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
  thunk,
  myLogger,
)
