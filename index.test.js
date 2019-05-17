const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('sinon-chai'));
 
const https = require('https'); // the core https Node.js module
const { PassThrough } = require('stream'); // PassThrough class
const functionWithHttpsCall = require('./index'); // PassThrough class
 
describe('My App Tests - functionWithHttpsCall', () => {
  let getStub;

  beforeEach(() => {
    getStub = sinon.stub(https, 'get');
  });
 
  afterEach(() => {
    https.get.restore();
  });
 
  let mockedInput = 'authors';
  let expectedOutput = {'authorName': 'john doe'};
 
  it('should return a valid response when we hit a https call', (done) => {
    // create a fake response stream using the PassThrough utility
    const response = new PassThrough();
    response.write(JSON.stringify(expectedOutput)); // inject the fake response payload
    response.end();
 
    // create a fake request stream as well (needed below)
    const request = new PassThrough();
 
    // when the test crawl below for functionWithHttpsCall hits the stub (https.get)
    // ... respond with the mock response Stream in the index 1 param of the callback of https.get
    getStub.returns(request); // calls to https.get returns the request stream so we need this to as well
    getStub.callsArgWith(1, response);

    // unit test the makeHttpCall function
    functionWithHttpsCall(mockedInput)
      .then((actualOutout) => {
        // actual output (actualOutout) will be same as the (expectedOutput) variable above
        // because we used (expectedOutput) in the response PassThrough above
        expect(actualOutout).to.deep.equal(expectedOutput); // this test will pass
        done();
      });
  });
});