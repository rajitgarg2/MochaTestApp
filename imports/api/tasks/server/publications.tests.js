// Tests for the tasks publications

import { chai, assert } from 'meteor/practicalmeteor:chai';
import { Tasks } from '../tasks.js';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { Random } from 'meteor/random';
import './publications.js';

describe('publications', function() {
    beforeEach(function() {
        Tasks.remove({});
        Tasks.insert({
            text: 'task3',
            createdAt: new Date(), // current time
            owner: Random.id()
        });
    });

    describe('tasks.list', function() {
        //here i am expecting the length of my tasks collection using publication  
        it('sends all tasks', function(done) {
            const collector = new PublicationCollector();
            collector.collect('tasks.all', (collections) => {
                chai.assert.equal(collections.tasks.length, 1);
                done();
            });
        });
    });
});
