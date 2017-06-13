import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { Tasks } from './tasks.js';

if (Meteor.isServer) {
    describe('tasks insert', function() {
        // here i am inserting the task and expecting the collection name and total records length
        it('insert task', function() {
            const taskId = Tasks.insert({
                text: 'task1',
                createdAt: new Date(), // current time
                owner: Random.id()
            });
            const added = Tasks.find({ _id: taskId });
            const collectionName = added._getCollectionName();
            const count = added.count();

            assert.equal(collectionName, 'tasks');
            assert.equal(count, 1);
        });
    });
}
