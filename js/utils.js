/**
 * Pythagorean theorem
 * @param fromX
 * @param fromY
 * @param toX
 * @param toY
 */
function findDistance(fromX, fromY, toX, toY){
    var a = Math.abs(fromX - toX);
    var b = Math.abs(fromY - toY);

    return Math.sqrt((a * a) + (b * b));
}

//Detect how many pixels 'til bird hits turbine
function colidingWithTurbineIn(rect, canvas, direction) {
  var unrotatedCircleX = canvas.width / 2;
  var unrotatedCircleY = canvas.height / 2;

  // Closest point in the rectangle to the center of circle rotated backwards(unrotated)
  var closestX, closestY;

  var xWillBe = rect.x+30;
  var yWillBe = rect.y;

  // Find the unrotated closest x point from center of unrotated circle
  if (unrotatedCircleX  < xWillBe) {
      closestX = xWillBe;
  } else if (unrotatedCircleX  > xWillBe + rect.width) {
      closestX = xWillBe + rect.width;
  } else {
      closestX = unrotatedCircleX ;
  }

  // Find the unrotated closest y point from center of unrotated circle
  if (unrotatedCircleY < yWillBe) {
      closestY = yWillBe;
  } else if (unrotatedCircleY > yWillBe + rect.height) {
      closestY = yWillBe + rect.height;
  } else {
      closestY = unrotatedCircleY;
  }
  // Determine collision
  var collision = false;

  var distance = findDistance(unrotatedCircleX , unrotatedCircleY, closestX, closestY);

  return distance;
  //if (distance < 100){
  //    return true; // Collision
  //} else {
  //    return false;
  //}
}
