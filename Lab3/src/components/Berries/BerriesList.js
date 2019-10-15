import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import $ from 'jquery';
import ReactPaginate from "react-paginate";

export default class BerriesList extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    data: [],
    loading: true,
    pageCount: 0,
    offset: 0,
    page: this.props.match.params.page,
    url: "https://pokeapi.co/api/v2/berry/"

  };
}
componentWillMount() {
  this.getList();
}

getList() {
  $.ajax({
    url: this.state.url,
    data:{ limit: 20, offset: this.state.offset},
    dataType: 'json',
    type: 'GET',

    success: rec => {
        this.setState({
          data: rec,
          pageCount: Math.ceil(rec.count / 20),
        });
    },

    error: (err) => {
      console.error(err.toString());
    }
  });
}

handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * 20);
    this.props.history.push("/berries/page/" + selected);
    this.setState({ offset: offset }, () => {
      this.getList();
    });
  };

  isValid = () => {
    if(isNaN(this.state.page) || this.state.page > this.state.pageCount || this.state.page < 0) {
      return false
    }
    return true
  }

  render() {
    let objBody;
    if(this.isValid() == false) {
      return <div> 404 No Page Found </div>
      } else {
        if(this.props.match.params.page == 0) {
          $(".prevC").hide();
        } else {
          $(".prevC").show();
        }
        if(this.props.match.params.page== this.state.pageCount-1) {
          $(".nextC").hide();
        } else {
          $(".nextC").show();
        }
      }
    let x;
    if(this.state.data.results){
      x = this.state.data.results.map(mch => {
      return ( <li key={mch.url.split('/')[6]}>
       <Link to={`/berries/${mch.url.split('/')[6]}`}>{mch.name.charAt(0).toUpperCase() + mch.name.slice(1)} Berry</Link>
      </li>
      )});
      }
      else {
      x = [];
      }
   objBody = (
     <div>
     <h1><u>Berries List</u></h1>
       <div className = "PList2">
        {x}
       </div>
        <div className="PList">
       <ReactPaginate
         initialPage = {parseInt(this.state.page)}
         previousLabel={'previous'}
         nextLabel={'next'}
         breakLabel={'...'}
         breakClassName={'break-me'}
         pageCount={this.state.pageCount}
         activeClassName={'active'}
         previousClassName={'prevC'}
         nextClassName={'nextC'}
         marginPagesDisplayed={2}
         pageRangeDisplayed={5}
         onPageChange={this.handlePageClick}
         containerClassName={'pagination'}
         subContainerClassName={'pages pagination'}
         ariaLabelBuilder={(page, selected) => selected ? 'Current page' : 'Goto page ' + page }
       />
     </div>
   </div>
 );
   return objBody;
 }
}
