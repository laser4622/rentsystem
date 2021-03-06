import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import {withRouter} from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data';
import Items from "../../models/item";
import ItemList from "../components/ItemListView";
const FormItem = Form.Item;

class AllItems extends React.Component {

  render() {
    console.log(this.props.items);


    return (
      <div style={{background: "white", padding: "100px 0 20px 0", minHeight:1000}}>
        <div style={{textAlign: "center", font: "font: normal 50px/1 Arial Black, Gadget, sans-serif"}}>
          <h1>RENTSHOP</h1>
        </div>


        <div style={{margin: "0 30px 0 30px"}}>
          <ItemList items={this.props.items}  currentUser={this.props.currentUser}/>
        </div>

      </div>


    );
  }
}



export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
    items: Items.find({}).fetch()
  };
})(AllItems);
