import React from 'react';
import '../Styles/filter.css';
import queryString from 'query-string';
import axios from 'axios';

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            mealtype: undefined,
            location: undefined,
            cuisine: [],
            lcost: undefined,
            hcost: undefined,
            sort: undefined,
            page: undefined
        }
    }

    handleClick = (resId) => {
        this.props.history.push(`/details/?restaurant=${resId}`);
    }

    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const { mealtype, area } = qs;

        // Call filter API 
        axios({
            method: 'POST',
            url: 'http://localhost:6503/api/restaurantfilter',
            headers: { 'Content-Type': 'application/json' },
            data: {
                mealtype_id: mealtype,
                location_id: area
            }
        }).then(res => {
            this.setState({ restaurants: res.data.restaurant, mealtype: mealtype, location: area })
        }).catch()
    }

    handleSortChange = (sort) => {
        const { mealtype, location, cuisine, lcost, hcost, page } = this.state;
        axios({
            method: 'POST',
            url: 'http://localhost:6503/api/restaurantfilter',
            headers: { 'Content-Type': 'application/json' },
            data: {
                sort: sort,
                mealtype_id: mealtype,
                location_id: location,
                cuisine: cuisine,
                lcost: lcost,
                hcost: hcost,
                page: page
            }
        }).then(res => {
            this.setState({ restaurants: res.data.restaurant, sort: sort })
        }).catch()
    }

    handleCostChange = (lcost, hcost) => {
        const { mealtype, location, cuisine, sort, page } = this.state;
        axios({
            method: 'POST',
            url: 'http://localhost:6503/api/restaurantfilter',
            headers: { 'Content-Type': 'application/json' },
            data: {
                sort: sort,
                mealtype_id: mealtype,
                location_id: location,
                cuisine: cuisine,
                lcost: lcost,
                hcost: hcost,
                page: page
            }
        }).then(res => {
            this.setState({ restaurants: res.data.restaurant, lcost: lcost, hcost: hcost })
        }).catch()
    }

    handleCuisineChange = () => {
        // write the logic for cuisine change
    }

    handleLocationChange = () => {
        // write the logic for location change
    }

    handlePageChange = () => {
        // write the logic for page change
    }

    render() {
        const { restaurants } = this.state;
        return (
            <div>
                <div id="myId" className="heading">Breakfast Places in Mumbai</div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-4 filter-options">
                            <div className="filter-heading">Filters / Sort</div>
                            <span className="glyphicon glyphicon-chevron-down toggle-span" data-toggle="collapse"
                                data-target="#filter"></span>
                            <div id="filter" className="collapse show">
                                <div className="Select-Location">Select Location</div>
                                <select className="Rectangle-2236">
                                    <option>Select</option>
                                    <option>Delhi</option>
                                </select>
                                <div className="Cuisine">Cuisine</div>
                                <div>
                                    <input type="checkbox" />
                                    <span className="checkbox-items">North Indian</span>
                                </div>
                                <div>
                                    <input type="checkbox" />
                                    <span className="checkbox-items">South Indian</span>
                                </div>
                                <div>
                                    <input type="checkbox" />
                                    <span className="checkbox-items">Chineese</span>
                                </div>
                                <div>
                                    <input type="checkbox" />
                                    <span className="checkbox-items">Fast Food</span>
                                </div>
                                <div>
                                    <input type="checkbox" />
                                    <span className="checkbox-items">Street Food</span>
                                </div>
                                <div className="Cuisine">Cost For Two</div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => { this.handleCostChange(1, 500) }} />
                                    <span className="checkbox-items">Less than &#8377; 500</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => { this.handleCostChange(500, 1000) }} />
                                    <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => { this.handleCostChange(1000, 1500) }} />
                                    <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => { this.handleCostChange(1500, 2000) }} />
                                    <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => { this.handleCostChange(2000, 50000) }} />
                                    <span className="checkbox-items">&#8377; 2000 +</span>
                                </div>
                                <div className="Cuisine">Sort</div>
                                <div>
                                    <input type="radio" name="sort" onChange={() => { this.handleSortChange(1) }} />
                                    <span className="checkbox-items">Price low to high</span>
                                </div>
                                <div>
                                    <input type="radio" name="sort" onChange={() => { this.handleSortChange(-1) }} />
                                    <span className="checkbox-items">Price high to low</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8 col-md-8 col-lg-8">
                            {restaurants.length != 0 ? restaurants.map((item) => {
                                return <div className="Item" onClick={() => { this.handleClick(item._id) }}>
                                    <div>
                                        <div className="small-item vertical">
                                            <img className="img" src={`../${item.image}`} />
                                        </div>
                                        <div className="big-item">
                                            <div className="rest-name">{item.name}</div>
                                            <div className="rest-location">{item.locality}</div>
                                            <div className="rest-address">{item.city}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div>
                                        <div className="margin-left">
                                            <div className="Bakery">CUISINES : {item && item.cuisine ? item.cuisine.map(i => { return `${i.name}, ` }) : null}</div>
                                            <div className="Bakery">COST FOR TWO : &#8377; {item.min_price} </div>
                                        </div>
                                    </div>
                                </div>
                            }) : <div class="no-records"> No Records Found ... </div>}

                            {restaurants.length != 0 ? < div className="pagination">
                                <a href="#">&laquo;</a>
                                <a href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">3</a>
                                <a href="#">4</a>
                                <a href="#">5</a>
                                <a href="#">6</a>
                                <a href="#">&raquo;</a>
                            </div> : null}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Filter;

/* 3 phases in lifecycle -

1. Mounting Phase - rendered for 1st time
2. Update Phase - only starts when the end user interacts with the application
3. UnMounting Phase - removed from the DOM

Mounting -

1. Constructor - to Initialize the state valriables
2. getDerivedStateFromProps - to derive the state from props
2. render - render anything to browser
3. componentDidMount  - API Calls on load of component

setState

Update -

1. getDerivedStateFromProps - to derive the state from props
2. shouldComponentUpdate
1. render
4. componentDidUpdate - logic after the update

UnMounting -

1. componentWillUnmount

className Component - State, LifeCycle
Functional - State, LifeCycle doesn't work


Components
Props
State
LifeCycle

*/
