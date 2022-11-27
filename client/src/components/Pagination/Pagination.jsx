import React, { Component } from 'react'
import paginationStyle from './pagination.module.css'
import image1 from '../../image/flecha-izquierda (1).png'
import image2 from '../../image/flecha-izquierda (2).png'
import { connect } from 'react-redux'


export class Pagination extends Component {


    handleClickBefore(){
        if(this.props.currentPage > 1 && this.props.currentPage <= this.props.pagenumbers.length){
            this.props.paginate(this.props.currentPage - 1)
        }
        window.scrollTo(0, 0)
    }
    handleClickAfter(){
        if(this.props.currentPage > 0 && this.props.currentPage < this.props.pagenumbers.length){
            this.props.paginate(this.props.currentPage + 1)
        }
        window.scrollTo(0, 0)
    }
    render() {
        return (
            <nav>
                <ul className={paginationStyle.ul}>
                    <li className={paginationStyle.li} onClick={()=>this.handleClickBefore()}><img src={image1} alt="" className={paginationStyle.image} /></li>
                    {this.props.pagenumbers.map((number) =>
                        <li key={number} className={paginationStyle.li}>
                            <a onClick={(e) => { e.preventDefault(); this.props.paginate(number); window.scrollTo(0, 0) }} href='/' className={paginationStyle.a}>{number}</a>
                        </li>)}
                    <li className={paginationStyle.li} onClick={()=>this.handleClickAfter()}><img src={image2} alt="" className={paginationStyle.image} /></li>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        currentPage : state.currentPage
    }
}

export default connect(mapStateToProps, null) (Pagination)