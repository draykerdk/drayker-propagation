(function () {
  'use strict';

  var Drayker = window.Drayker;
  var svg = document.querySelector('[data-propagation-network]');
  var field = document.querySelector('[data-signal-field]');
  if (!Drayker || !svg || !field) return;

  var BLUE = '#3FA9FF';
  var ICE = '#DCEBFF';
  var R = Drayker.R;

  function rounded(value) {
    return Math.round(value * 10) / 10;
  }

  function rotate(vertex, yaw, pitch) {
    var y = Drayker.vec.rotY(vertex, yaw);
    var c = Math.cos(pitch);
    var s = Math.sin(pitch);
    return [y[0], y[1] * c - y[2] * s, y[1] * s + y[2] * c];
  }

  function uniqueEdges(faces) {
    var seen = Object.create(null);
    var edges = [];
    faces.forEach(function (face) {
      [[face[0], face[1]], [face[1], face[2]], [face[2], face[0]]].forEach(function (edge) {
        var a = Math.min(edge[0], edge[1]);
        var b = Math.max(edge[0], edge[1]);
        var key = a + ':' + b;
        if (!seen[key]) {
          seen[key] = true;
          edges.push([a, b]);
        }
      });
    });
    return edges;
  }

  function pointOnArc(a, b, progress) {
    return Drayker.vec.norm([
      a[0] + (b[0] - a[0]) * progress,
      a[1] + (b[1] - a[1]) * progress,
      a[2] + (b[2] - a[2]) * progress
    ]);
  }

  Drayker.bodies.signalMesh = {
    sphere: 'ice',
    build: function (ctx) {
      var mesh = Drayker.geom.icosa(2);
      var edges = uniqueEdges(mesh.faces);
      var layer = ctx.layers.body;
      var glow = layer.appendChild(ctx.mk('circle', {
        r: 47,
        fill: BLUE,
        'fill-opacity': .13,
        filter: ctx.blurSoft
      }));
      var back = layer.appendChild(ctx.mk('path', {
        fill: 'none',
        stroke: BLUE,
        'stroke-width': .55,
        'stroke-opacity': .14,
        'stroke-linecap': 'round'
      }));
      var front = layer.appendChild(ctx.mk('path', {
        fill: 'none',
        stroke: BLUE,
        'stroke-width': .72,
        'stroke-opacity': .5,
        'stroke-linecap': 'round'
      }));
      var nodeLayer = layer.appendChild(ctx.mk('g', { fill: ICE }));
      var pulseLayer = layer.appendChild(ctx.mk('g', { fill: '#FFFFFF' }));
      var nodes = mesh.verts.map(function () {
        return nodeLayer.appendChild(ctx.mk('circle', { r: 1.45 }));
      });
      var pulses = [];
      for (var i = 0; i < 14; i++) {
        pulses.push({
          phase: i / 14,
          speed: .07 + (i % 5) * .012,
          edgeSeed: (i * 37) % edges.length,
          element: pulseLayer.appendChild(ctx.mk('circle', { r: i % 4 === 0 ? 2.5 : 1.9 }))
        });
      }
      return { mesh: mesh, edges: edges, back: back, front: front, nodes: nodes, pulses: pulses, glow: glow };
    },
    paint: function (ctx, payload) {
      var body = ctx.body;
      var yaw = payload.t * .11 + payload.gaze.x * .9;
      var pitch = -.24 + payload.gaze.y * .55;
      var scale = R * .965;
      var vertices = body.mesh.verts.map(function (vertex) { return rotate(vertex, yaw, pitch); });
      var frontPath = '';
      var backPath = '';

      body.edges.forEach(function (edge) {
        var a = vertices[edge[0]];
        var b = vertices[edge[1]];
        var previousSide = null;
        for (var step = 0; step <= 6; step++) {
          var point = pointOnArc(a, b, step / 6);
          var side = point[2] >= 0 ? 'front' : 'back';
          var command = side === previousSide ? ' L ' : ' M ';
          var segment = command + rounded(point[0] * scale) + ' ' + rounded(point[1] * scale);
          if (side === 'front') frontPath += segment;
          else backPath += segment;
          previousSide = side;
        }
      });

      body.front.setAttribute('d', frontPath);
      body.back.setAttribute('d', backPath);
      body.glow.setAttribute('r', rounded(45 + Math.sin(payload.t * .8) * 3));

      vertices.forEach(function (vertex, index) {
        var node = body.nodes[index];
        node.setAttribute('cx', rounded(vertex[0] * scale));
        node.setAttribute('cy', rounded(vertex[1] * scale));
        node.setAttribute('opacity', vertex[2] > 0 ? rounded(.3 + vertex[2] * .7) : .06);
      });

      body.pulses.forEach(function (pulse) {
        var distance = pulse.phase + payload.t * pulse.speed;
        var cycle = Math.floor(distance);
        var progress = distance - cycle;
        var edge = body.edges[(pulse.edgeSeed + cycle * 29) % body.edges.length];
        var point = pointOnArc(vertices[edge[0]], vertices[edge[1]], progress);
        pulse.element.setAttribute('cx', rounded(point[0] * scale));
        pulse.element.setAttribute('cy', rounded(point[1] * scale));
        pulse.element.setAttribute('opacity', point[2] > 0 ? .96 : 0);
      });
    }
  };

  var instance = Drayker.create(svg, {
    body: 'signalMesh',
    rings: 'hairline',
    wedge: 'none',
    accent: BLUE,
    sphere: 'ice',
    ringRadius: 126,
    shadow: .9,
    night: .2,
    animate: false,
    fit: 1.48
  });

  svg.setAttribute('aria-label', 'Interactive Drayker propagation network with signals travelling between connected nodes.');

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var inView = false;

  function syncAnimation() {
    if (!reducedMotion.matches && inView && document.visibilityState === 'visible') instance.start();
    else instance.stop();
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      syncAnimation();
    }, { rootMargin: '160px 0px' });
    observer.observe(field);
  } else {
    inView = true;
  }

  document.addEventListener('visibilitychange', syncAnimation);
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', syncAnimation);
  else reducedMotion.addListener(syncAnimation);
  syncAnimation();
})();
