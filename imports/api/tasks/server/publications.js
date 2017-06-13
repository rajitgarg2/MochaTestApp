// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Tasks } from '../tasks.js';

Meteor.publish('tasks.all', () => Tasks.find());

Tasks.allow({
  insert(userId) {
    return true
  }
});