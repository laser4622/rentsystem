import Item from '../components/Item';

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import  Items  from '../../models/item';
 
// App component - represents the whole app
class ItemListView extends Component {
     

  renderItems() {
    return this.props.items.map((item) => (
      <Item key={item._id} item={item} />
    ));
  }


  render() {

    return (
      <div style = {{background: "white", padding: "70px 0 0 0"}}>
        <ul style = {{ margin: 0, padding: 0, background: "white"}}>
          {this.renderItems()}
        </ul>
      </div>
    );
  }
}


export default withTracker(() => {
    return {
        items: Items.find({}).fetch(),
        currentUser: Meteor.user(),
    };
  })(ItemListView);
