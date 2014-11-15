'use strict';

describe('Filter: idExtractor', function () {

  // load the filter's module
  beforeEach(module('artApp'));

  // initialize a new instance of the filter before each test
  var idExtractor;
  beforeEach(inject(function ($filter) {
    idExtractor = $filter('idExtractor');
  }));

  it('should return the input prefixed with "idExtractor filter:"', function () {
    var text = 'angularjs';
    expect(idExtractor(text)).toBe('idExtractor filter: ' + text);
  });

});
