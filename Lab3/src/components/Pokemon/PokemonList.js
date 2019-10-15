import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';
import ReactPaginate from "react-paginate";

export default class PokemonList extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    data: [],
    loading: true,
    pageCount: 0,
    offset: 0,
    page: this.props.match.params.page,
    url: "https://pokeapi.co/api/v2/pokemon/"

  };
}
componentWillMount() {
  this.getList();
}
//function using React Paginate syntax/jquery functionality to render the list
getList() {
  $.ajax({
    url: this.state.url,
    data:{ limit: 20, offset: this.state.offset},
    dataType: 'json',
    type: 'GET',

    success: rec => {
      console.log(rec);
        this.setState({
          data: rec,
          pageCount: Math.ceil(rec.count/ 20),
        });
    },
    error: (err) => {
      console.error(err.toString());
    }
  });
}

//On click pushes the new page # as well as updates variab;es and calls the getList function
handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * 20);
    this.props.history.push("/pokemon/page/" + selected);
    this.setState({ offset: offset }, () => {
      this.getList();
    });
  };
  //Valid function to check that the pages are at the correct location
  isValid = () => {
    if(isNaN(this.state.page) || this.state.page > this.state.pageCount || this.state.page < 0) {
      return false
    }
    return true
  }
  //Render method to error check the pages as well as hide the next/previous buttons when not needed
  render() {
    let objBody;
    console.log(this.isValid());
    if(this.isValid() == false) {
      return <div> 404 No Page Found </div>
      } else {
        if(this.props.match.params.page == 0) {
          $(".prevC").hide();
        } else {
          $(".prevC").show();
        }
        if(this.props.match.params.page == this.state.pageCount-1) {
          $(".nextC").hide();
        } else {
          $(".nextC").show();
        }
      }
    //Map function to receive the specific values required to grab the pokemon IDs/Names
    let x;
    if(this.state.data.results){
      x = this.state.data.results.map(mon => {
      return ( <li key={mon.url.split('/')[6]}>
       <Link to={`/pokemon/${mon.url.split('/')[6]}`}>{mon.name}</Link>
      </li>
      )});
      }
      else {
      x = [];
    }
   objBody = (
     <div>
     <h1><u>Pokemon List</u></h1>
     <div className = "PList2">
      {x}
     </div>
        <div className="PList">
       <ReactPaginate
         initialPage = {parseInt(this.state.page)}
         previousLabel={'previous'}
         nextLabel={'next'}
         breakLabel={'See More Pages'}
         breakClassName={'break-me'}
         pageCount={this.state.pageCount}
         marginPagesDisplayed={2}
         pageRangeDisplayed={5}
         onPageChange={this.handlePageClick}
         activeClassName={'active'}
         previousClassName={'prevC'}
         nextClassName={'nextC'}
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
