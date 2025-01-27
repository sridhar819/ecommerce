// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {details} = props
  const {id, imageUrl, title, price, brand, rating} = details
  return (
    <li className="productItem">
      <img src={imageUrl} alt="similar product" />
      <h3>{title}</h3>
      <p>by {brand}</p>
      <div className="last">
        <p>Rs {price}/-</p>
        <p>
          {rating}
          <img
            alt="star"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
          />
        </p>
      </div>
    </li>
  )
}

export default SimilarProductItem
