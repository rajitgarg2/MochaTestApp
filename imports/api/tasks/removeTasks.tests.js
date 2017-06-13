// Tests for posts methods
import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { Tasks } from './tasks.js';
import './methods.js';

if (Meteor.isServer) {
    describe('methods test', () => {
        // describe('tasksRemove', function() {
            const userId = Random.id();
            let taskId;

            beforeEach(() => {
                Tasks.remove({});
                taskId = Tasks.insert({
                    text: 'task2',
                    createdAt: new Date(), // current time
                    owner: userId
                });
            });

            afterEach(function() {
                Tasks.remove({});
            });

            // here i am removing the task using tasks.remove method and then ensures this by expecting the length of tasks collection.
            it('user can remove his own task', (done) => {
                // Find the internal implementation of the task method so we can
                // test it in isolation
                const deleteTask = Meteor.server.method_handlers['tasks.remove'];
                // Set up a fake method invocation that looks like what the method expects
                const invocation = { userId };
                // Run the method with `this` set to the fake invocation
                deleteTask.apply(invocation, [taskId]);
                // Verify that the method does what we expected
                assert.equal(Tasks.find().count(), 0);
                done();
            });
        // })
    });
}
