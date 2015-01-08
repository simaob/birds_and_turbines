window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();


function drawTurbine(canvas, context) {
  context.save();
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var radius = 20;

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'green';
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = '#003300';
  context.stroke();
  context.fillStyle= "grey";
  context.fill();
  context.restore();
}

function drawBird(myBird, context) {
  context.save();
  context.beginPath();
  context.rect(myBird.x, myBird.y, myBird.width, myBird.height);
  context.fillStyle = '#8ED6FF';
  context.fill();
  context.lineWidth = myBird.borderWidth;
  context.strokeStyle = 'black';
  context.stroke();
  context.restore();
}

function animate(birds, movement, canvas, context) {

  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawTurbine(canvas, context);
  lucky_dip = Math.floor(Math.random()*9)+1;
  number_stopped = 0;
  for(i= 0; i<birds.length; i++) {
    distance = colidingWithTurbineIn(birds[i], canvas);
    switch(true) {
      case distance > 70:
        if(birds[i].x+birds[i].width + birds[i].borderWidth/2 < canvas.width ) {
          birds[i].x = birds[i].x + movement*birds[i].individual_speed;
          if(birds[i].avoided == true) {
            if(birds[i].y > canvas.height/2){
              birds[i].y = birds[i].y-1;
            } else {
              birds[i].y = birds[i].y+1;
            }
            birds[i].avoidance_counter -= 1;
            if(birds[i].avoidance_counter === 0) {
              birds[i].avoided = false;
            }
          } else if(i%lucky_dip === 0){
            birds[i].y = birds[i].y + ((0.6*movement) * -vertical_dir * birds[i].smoother);
          } else {
            birds[i].y = birds[i].y + ((0.6*movement) * vertical_dir * birds[i].smoother);
          }
        } else {
          number_stopped += 1;
        }
        break;
      case distance > 20 && distance <= 70:
        birds[i].x = birds[i].x + (0.8*movement)*birds[i].individual_speed;
        var step = ((2*movement) * birds[i].smoother);
        if((birds[i].y > canvas.height/2 && step < 0) || (birds[i].y < canvas.height/2 && step > 0)){
          step = -1*step;
        }
        birds[i].y = birds[i].y + step;
        birds[i].avoided = true;
        birds[i].avoidance_counter += 1;
        break;
      default:
        birds[i].y = birds[i].y + ((3*movement) * birds[i].smoother);
        break;
    }

    drawBird(birds[i], context);
  }
  if(number_runs > 20) {
    number_runs = 0;
    vertical_dir = -vertical_dir;
  } else {
    number_runs += 1;
  }

  // request new frame
  if(run === true && number_stopped < birds.length) {
    requestAnimFrame(function() {
      animate(birds, movement, canvas, context);
    });
  }
}

function generateBirds(number, context) {
  var birds = [];
  for(i= 0; i < number; i++) {
    birds[i] = {
      x: 0,
      y: Math.floor((Math.random() * 490) + 0),//random height
      smoother: ((Math.random()*(1-0.5))+0.5)*[-1, 1][Math.floor(Math.random()*2)],//random vertical smoother
      individual_speed: (Math.random()*(1-0.5))+0.5, //individual speed. between 0.5-1
      avoided: false,
      avoidance_counter: 0,
      width: 15,
      height: 10,
      borderWidth: 1
    };
    drawBird(birds[i], context);
  }
  return birds;
}
