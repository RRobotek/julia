var begin_minv = -2.5;
var begin_maxv = 2.5;

var move_speed = 0.01;
var zoom_factor = 0.01;

var min_x = begin_minv;
var max_x = begin_maxv;

var min_y = begin_minv;
var max_y = begin_maxv;

function setup()  {
  createCanvas(400, 400);
  pixelDensity(1);
  frameRate(25);
}


function draw()  {
  x_delta = (max_x - min_x);
  y_delta = (max_y - min_y);
  if (keyIsDown(RIGHT_ARROW)) {
    max_x += move_speed * x_delta;
    min_x += move_speed * x_delta;
  } 
  if (keyIsDown(LEFT_ARROW)) {
      max_x -= move_speed * x_delta;
      min_x -= move_speed * x_delta;
    }
  if (keyIsDown(UP_ARROW)) {
      max_y -= move_speed * y_delta;
      min_y -= move_speed * y_delta;
    }
  if (keyIsDown(DOWN_ARROW)) {
      max_y += move_speed * y_delta;
      min_y += move_speed * y_delta;
    }
  if (keyIsDown(ENTER)) {
      min_x = min_x + ( x_delta * zoom_factor);
      max_x = max_x - ( x_delta * zoom_factor);
      min_y = min_y + ( y_delta * zoom_factor);
      max_y = max_y - ( y_delta * zoom_factor);
    }

  print("x:", min_x, max_x);
  print("y: ", min_y, max_y);

  var max_iter = 100;
  loadPixels();

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++)  {
      
      // z = (a + bi)
      var zr = map(x, 0, width, min_x, max_x);
      var zi = map(y, 0, height, min_y, max_y);

      var cr = -0.4;
      var ci = 0.6;
      
      for (var n = 0; n < max_iter; n++) {
        var z_sq_r = zr * zr - zi * zi;
        var z_sq_i = 2 * zr * zi;

        zr = z_sq_r + cr;
        zi = z_sq_i + ci;

        if (zr + zi > 100)  {
          break;
        }

        n++;
      }

      var bright = map(n, 0, max_iter, 0, 1);
      var redness = map(zr+zi, 0, 100, 0, 255);
      var blueness = map(zr - zi, 0, -10, 0, 255)
      bright = map(sqrt(bright), 0, 1, 255, 0);

      if ( n == max_iter) {
        bright = 0;
      }

      var pix = (x + y*width)*4;
      pixels[pix + 0] = redness;
      pixels[pix + 1] = blueness;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }

    updatePixels();
  }
}