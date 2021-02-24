import React, {Component} from 'react'
import WithRestoService from '../hoc'
import {connect} from 'react-redux'
import {menuError, menuLoaded, menuRequested} from '../../actions'
import Error from '../error'
import Spinner from '../spinner'

import './item-page.scss'

const View = ({item : {title, url, category, price} }) => {
	return(
		<div className = "item_page">
			<div className="menu__item item_block">
				<div className="menu__title">{title}</div>
				<img className="menu__img" src={url} alt={title}></img>
				<div className="menu__category">Category: <span>{category}</span></div>
				<div className="menu__price">Price: <span>{price}$</span></div>
				<button className="menu__btn">Add to cart</button>
				<span className = {`menu__category_Img ${category}`}></span>
			</div>
		</div>
	)
}

class ItemPage extends Component {

	componentDidMount() {
		this.props.menuRequested()

		const {RestoService} = this.props
		RestoService.getMenuItems()
								 .then(res=>this.props.menuLoaded(res))
								 .catch(error => this.props.menuError())
	}

	render() {
		if (this.props.error){
			return <Error/>
		}
		if (this.props.loading){
			return <Spinner/>
		}
		const item = this.props.menuItems.find(el => +el.id === +this.props.match.params.id)
		return <View item={item}/>
	}
}


const mapStateToProps = (state) => {
	return {
		menuItems: state.menu,
		loading: state.loading,
		error: state.error
	}
}

const mapDispatchToProps = {
	menuLoaded,
	menuRequested,
	menuError
}

export default WithRestoService()(connect(mapStateToProps,mapDispatchToProps)(ItemPage))
