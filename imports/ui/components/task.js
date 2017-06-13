import { Template } from 'meteor/templating';

import { Tasks } from '/imports/api/tasks/tasks.js';

import './task.html';

Template.task.helpers({
    isCurrentUserTask() {
        return Meteor.userId() === this.owner;
    },
});

Template.task.events({
    'click .delete' () {
        Meteor.call('tasks.remove', this._id, function(err, result) {
            if (err) {
                Bert.alert('Task cannot be remove', 'danger', 'growl-top-right');
                return;
            }
            Bert.alert('Task remove successfully', 'success', 'growl-top-right');
        });
    }
});
