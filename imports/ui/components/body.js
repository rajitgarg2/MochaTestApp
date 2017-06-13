import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { Tasks } from '/imports/api/tasks/tasks.js';
 
import './body.html';
import './task.js';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('tasks.all');
});
 
Template.body.helpers({
  tasks() {
    // Show newest tasks at the top
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    if(!text || text==''){
      Bert.alert( 'Empty task cannot be post', 'danger', 'growl-top-right' );
      return;
    }
 
    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
      owner: Meteor.userId()/*,
      username: Meteor.user().username,*/
    });
 
    // Clear form
    target.text.value = '';
  },
});


