(function() {
  var pretag = document.getElementById('d');
  var canvastag = document.getElementById('canvasdonut');

  var A = 1, B = 1;
  var tmr1 = undefined, tmr2 = undefined;

  // ASCII Frame Animation
  var asciiframe = function() {
      var b = [];
      var z = [];
      A += 0.07;
      B += 0.03;
      var cA = Math.cos(A), sA = Math.sin(A),
          cB = Math.cos(B), sB = Math.sin(B);

      for (var k = 0; k < 1760; k++) {
          b[k] = k % 80 === 79 ? "\n" : " ";
          z[k] = 0;
      }

      for (var j = 0; j < 6.28; j += 0.07) {
          var ct = Math.cos(j), st = Math.sin(j);
          for (var i = 0; i < 6.28; i += 0.02) {
              var sp = Math.sin(i), cp = Math.cos(i),
                  h = ct + 2,
                  D = 1 / (sp * h * sA + st * cA + 5),
                  t = sp * h * cA - st * sA;

              var x = 0 | (40 + 30 * D * (cp * h * cB - t * sB)),
                  y = 0 | (12 + 15 * D * (cp * h * sB + t * cB)),
                  o = x + 80 * y,
                  N = 0 | (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
              if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
                  z[o] = D;
                  b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
              }
          }
      }
      pretag.innerHTML = b.join("");
  };

  // Canvas Frame Animation
  var canvasframe = function() {
      var ctx = canvastag.getContext('2d');
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      if (tmr1 === undefined) {
          A += 0.07;
          B += 0.03;
      }
      var cA = Math.cos(A), sA = Math.sin(A),
          cB = Math.cos(B), sB = Math.sin(B);

      for (var j = 0; j < 6.28; j += 0.3) {
          var ct = Math.cos(j), st = Math.sin(j);
          for (var i = 0; i < 6.28; i += 0.1) {
              var sp = Math.sin(i), cp = Math.cos(i);
              var ox = 2 + ct,
                  oy = 1 * st;

              var x = ox * (cB * cp + sA * sB * sp) - oy * cA * sB;
              var y = ox * (sB * cp - sA * cB * sp) + oy * cA * cB;
              var ooz = 1 / (5 + cA * ox * sp + sA * oy);
              var xp = (150 + 150 * ooz * x);
              var yp = (120 - 150 * ooz * y);

              var L = 0.7 * (cp * ct * sB - cA * ct * sp - sA * st + cB * (cA * st - ct * sA * sp));
              if (L > 0) {
                  ctx.fillStyle = 'rgba(255,255,255,' + L + ')';
                  ctx.fillRect(xp, yp, 1.5, 1.5);
              }
          }
      }
  };

  // Start/Stop ASCII Animation
  window.anim1 = function() {
      if (tmr1 === undefined) {
          tmr1 = setInterval(asciiframe, 50);
      } else {
          clearInterval(tmr1);
          tmr1 = undefined;
      }
  };

  // Start/Stop Canvas Animation
  window.anim2 = function() {
      if (tmr2 === undefined) {
          tmr2 = setInterval(canvasframe, 50);
      } else {
          clearInterval(tmr2);
          tmr2 = undefined;
      }
  };

  // Initial Render
  asciiframe();
  canvasframe();

  // Attach load event to start animations
  window.addEventListener("load", function() {
      anim1(); // Start ASCII animation
      anim2(); // Start Canvas animation
  });
})();
