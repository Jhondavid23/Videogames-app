import React, { Component } from 'react'
import filter from './filter.module.css'

export class Filter extends Component {

  render() {

    return (
      <div className={filter.container}>
        <div className={filter.div}>
          <select name="SORT_BY_GENRE" id="" onChange={(e) => this.props.handleSubmitByGenre(e)} className={filter.select} >
            <option value="name" selected>Sort by genre</option>
            <option value="All">All</option>
            {this.props.genresOptions && this.props.genresOptions.map(genre =>
              <option value={genre} key={genre} >{genre}</option>
            )}
          </select>
        </div>
        <div className={filter.div}>
          <select name="" id="" onChange={(e) => this.props.handleSubmitByAdd(e)} className={filter.select}>
            <option value="All" selected>Sort by storage</option>
            <option value="Existing">Existing</option>
            <option value="Created">Created</option>
          </select>
        </div>
        <div className={filter.div}>
          <select name="" id="" onChange={(e) => this.props.handleSubmitByName(e)} className={filter.select} >
            <option value="name" selected>Sort by name</option>
            <option value="AZ">A-Z</option>
            <option value="ZA">Z-A</option>
          </select>
        </div>
        <div className={filter.div}>
          <select name="" id="" onChange={(e) => this.props.hanldleSubmitByRating(e)} className={filter.select}>
            <option value="name" selected>Sort by rating</option>
            <option value="Max-min">5 - 1</option>
            <option value="Min-max">1 - 5</option>

          </select>
        </div>

      </div>

    )
  }
}



export default Filter;


