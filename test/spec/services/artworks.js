'use strict';

describe('Service: Artworks', function () {

  // load the service's module
  beforeEach(module('artApp'));

  // instantiate service
  var Artworks;
  beforeEach(inject(function (_Artworks_) {
    Artworks = _Artworks_;
  }));

  it('should do something', function () {
    expect(!!Artworks).toBe(true);
  });

});
