import gsap from 'gsap';

/**
 * Animates a 3D object along a predefined path using GSAP.
 * @param {THREE.Object3D} object - The object to animate (e.g., a spaceship group or mesh).
 * @param {Object} [options] - Optional overrides for path and timing.
 * @param {number} [options.zTarget=4] - Target Z position.
 * @param {number} [options.xTarget=2] - Target X position.
 * @param {number} [options.zDuration=2] - Duration of Z movement.
 * @param {number} [options.rotationDuration=1] - Duration of rotation.
 * @param {number} [options.xDuration=2] - Duration of X movement.
 */
export function animateFlyPath(object, position, options = {}) {
  if (!object) return;
   
  const {
    zTarget = position[2],
    xTarget = position[0],
    zDuration = 2,
    rotationDuration = 1,
    xDuration = 2,
  } = options;

  let rotationTarget;
    if (xTarget < 0) {
    rotationTarget = -Math.PI / 2;   // rotate right
  } else if (xTarget > 0) {
    rotationTarget = Math.PI / 2;    // rotate left
  } else {
    rotationTarget = 0;              // face forward
  }


  const timeline = gsap.timeline();

  timeline.to(object.position, {
    z: zTarget,
    duration: zDuration,
    ease: 'power2.inOut',
    onUpdate: () => {
    console.log("Animating Z:", object.position.z);
  },
  onComplete: () => {
    console.log("Z animation complete");
  }

  });

  timeline.to(object.rotation, {
    y: rotationTarget,
    duration: rotationDuration,
    ease: 'power2.inOut',
  });

  timeline.to(object.position, {
    x: xTarget,
    duration: xDuration,
    ease: 'power2.inOut',
  });

  return timeline;
}