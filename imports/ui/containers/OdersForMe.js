import React from 'react';
import {Avatar, Button, Icon, Card, Popover, List} from "antd";

import { withTracker } from 'meteor/react-meteor-data';
import Profile from "../../models/profile";

import  Items  from '../../models/item';
import Item from '../components/Item';

import { Meteor } from 'meteor/meteor';
import Orders from "../../models/order";
import Order from "../components/Order";


class OrdersForMe extends React.Component {


  render() {
    if(!this.props.currentUser)
      return '';

    return (
      <div  style={{height:1000, background: 'white', color: 'black'}}>

        <div style={{height:100}}/>
        <List
          header={<h1>Orders for me</h1>}
          bordered
          itemLayout="vertical"
          dataSource={this.props.orders.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1)}
          renderItem={ord=>ord.OwnerID === this.props.currentUser._id?  <Order date = {true} ord = {ord}/>:'' }
        />
      </div>
    );
  }
}


export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
    profiles: Profile,
    orders: Orders.find({}).fetch(),
  };
})(OrdersForMe);

