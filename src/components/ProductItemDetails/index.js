// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

class ProductItemDetails extends Component {
  state = {getProductList: {}, isFailure: false, isLoading: true, count: 1}

  onIncrease = () => {
    this.setState(pre => ({count: pre.count + 1}))
  }

  onDecrease = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(pre => ({count: pre.count - 1}))
    }
  }

  componentDidMount() {
    this.getProductDetailsData()
  }

  getProductDetailsData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/products/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        ...data,
        imageUrl: data.image_url,
        totalReviews: data.total_reviews,
        similarProducts: data.similar_products.map(product => ({
          ...product,
          imageUrl: product.image_url,
          totalReviews: product.total_reviews,
        })),
      }

      this.setState({getProductList: updatedData, isLoading: false})
    } else {
      this.setState({isFailure: true})
    }
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderMainProduct = () => {
    const {getProductList, count} = this.state
    const {
      id,
      imageUrl,
      title,
      price,
      description,
      rating,
      availability,
      brand,
      totalReviews,
      similarProducts,
    } = getProductList
    return (
      <>
        <div className="productDetails-card">
          <img src={imageUrl} alt="product" />
          <div className="details-card">
            <h1>{title}</h1>
            <p>Rs {price}/-</p>
            <div>
              <p>
                {rating}
                <img
                  alt="star"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                />
              </p>
              <p>{totalReviews} Reviews</p>
            </div>
            <p>{description}</p>
            <p>
              <span>Available: </span> {availability}
            </p>
            <p>
              <span>Brand: </span>
              {brand}
            </p>
            <hr />
            <div className="btn-card">
              <button
                onClick={this.onDecrease}
                type="button"
                data-testid="minus"
              >
                <BsDashSquare />
              </button>

              <p>{count}</p>

              <button
                onClick={this.onIncrease}
                type="button"
                data-testid="plus"
              >
                <BsPlusSquare />
              </button>
            </div>
            <button className="addCart" type="button">
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="similar-card">
          <h1>Similar Products</h1>
          <ul className="similarItemcard">
            {similarProducts.map(each => (
              <SimilarProductItem key={each.id} details={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  onChangeProductRoute = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderFailureView = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1>Product Not Found</h1>
      <p>oops something wrong!</p>
      <button
        onClick={this.onChangeProductRoute}
        className="addCart"
        type="button"
      >
        Continue Shopping
      </button>
    </div>
  )

  render() {
    const {isLoading, isFailure} = this.state

    return (
      <>
        <Header />
        {isFailure
          ? this.renderFailureView()
          : isLoading
          ? this.renderLoader()
          : this.renderMainProduct()}
      </>
    )
  }
}

export default ProductItemDetails
