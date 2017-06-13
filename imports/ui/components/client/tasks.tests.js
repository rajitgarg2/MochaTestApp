import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { chai } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { Tasks } from '/imports/api/tasks/tasks.js';
import { withRenderedTemplate } from '../../test-helpers.js';
import '../task.js';
import '../body.js';

describe('Tasks', function() {
    const userId = Random.id();
    beforeEach(() => {
        //we already have one task exists, due to insert from server side testcase, so after below insertion we have total 3 tasks.

        Tasks.insert({
            text: 'This is my First Task',
            createdAt: new Date(), // current time
            owner: userId
        });

        Tasks.insert({
            text: 'This is my Second Task',
            createdAt: new Date(), // current time
            owner: userId
        });
    });

    it('Tasks listing test', function() {
        const data = {};
        // here i am testing for total no. of li created and their content
        withRenderedTemplate('body', data, (el) => {
            const renderedList = $(el).find('#tasksId ul li');
            chai.assert.deepEqual(renderedList.length, 3);

            const firstLi = renderedList[0];
            let firstLiText = $(firstLi).find('.text').text()

            const secondLi = renderedList[1];
            let secondLiText = $(secondLi).find('.text').text()

            const thirdLi = renderedList[2];
            let thirdLiText = $(thirdLi).find('.text').text()


            chai.assert.deepEqual(firstLiText, 'This is my Second Task');
            chai.assert.deepEqual(secondLiText, 'This is my First Task');
            chai.assert.deepEqual(thirdLiText, 'task3');
        });
    });

    it('Remove task', function() {
        const data = {};
        // here we will get 5 tasks , because in this case also beforeEach runs and it will add 2 more tasks
        // here i am testing for total no. of li created and trying to remove one li
        withRenderedTemplate('body', data, (el) => {
            let renderedList = $(el).find('#tasksId ul li');
            chai.assert.deepEqual(renderedList.length, 5);
            const firstLi = renderedList[0];
            chai.assert.deepEqual($(firstLi).find('.delete').length, 0);
            // here we will not found button for remove which contain delete class because we are showing this button only to loggedin users, here we donot have any user, so we are getting 0 above
        });
    });
});
