(function (root) {
  'use strict';

  var presets = {
    official: {
      body: 'plain', rings: 'mono', wedge: 'none', accent: '#FF5500',
      ringRadius: 120, weight: 5, fit: 1.5, gaze: { x: 0, y: .34 }, animate: false
    },
    officialWide: {
      body: 'plain', rings: 'mono', wedge: 'none', accent: '#FF5500',
      ringRadius: 152, weight: 3.4, fit: 1.78, gaze: { x: 0, y: .34 }, animate: false
    },
    networkMesh: {
      body: 'signalMesh', rings: 'hairline', wedge: 'none', accent: '#3FA9FF',
      sphere: 'ice', ringRadius: 126, shadow: 0, night: .12, fit: 1.48
    },
    geodesic: {
      body: 'geo', rings: 'hairline', wedge: 'none', accent: '#5CE02E',
      sphere: 'moss', ringRadius: 122, shadow: .88, night: .24, fit: 1.5
    },
    shielded: {
      body: 'grid', rings: 'shieldRing', wedge: 'shield', accent: '#9C8CFF',
      sphere: 'slate', ringRadius: 123, shadow: .92, night: .26, fit: 1.58
    },
    extracting: {
      body: 'plain', rings: 'collector', wedge: 'extract', accent: '#FF8A00',
      sphere: 'brand', ringRadius: 124, shadow: .94, night: .3, fit: 1.62
    }
  };

  root.DraykerPresets = Object.freeze(presets);
})(typeof window !== 'undefined' ? window : this);
