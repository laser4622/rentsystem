import { Class } from 'meteor/jagi:astronomy';


const Profile = Class.create({                  // Main class of users
  name: 'Profile',
  collection: new Meteor.Collection('profiles'),    // Creating the collection of users in database

  fields: {// fields that users will have and the type of this field

    userID: {
      type: String,
      optional: true,

    },

    phone: {
      type: String,
      optional: true,

    },

    question: {
      type: String,
      optional: true,

    },

    answer: {
      type: String,
      optional: true,
    },

    type: {
      type: String,
      optional: true,
    },
    
    rating: {
      type: Number,
      optional: true,
    },

    firstName: {
      type: String,
      optional: false,
    },

    lastName: {
      type: String,
      optional: false,
    },

    address: {
      type: String,
      optional: false,
    },

    isBanned: {
      type: Boolean,
      optional: true,
      default: false,
    },



  },

});


export default Profile