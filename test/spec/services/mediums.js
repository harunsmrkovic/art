'use strict';

describe('Service: Mediums', function () {

  // load the service's module
  beforeEach(module('artApp'));

  // instantiate service
  var Mediums;
  beforeEach(inject(function (_Mediums_) {
    Mediums = _Mediums_;
  }));

  it('should do something', function () {
    expect(!!Mediums).toBe(true);
  });

});
