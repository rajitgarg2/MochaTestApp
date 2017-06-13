import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Tasks } from './tasks.js';

Meteor.methods({
	 'tasks.remove'(taskId) {
	    check(taskId, String);
	 
	    Tasks.remove(taskId);
    },
});