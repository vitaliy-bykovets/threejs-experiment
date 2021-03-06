const DAMPING = 0.03;
const DRAG = 1 - DAMPING;

export default class Particle {
  constructor(x, y, z, mass, clothFunction) {
    this.position = new THREE.Vector3();
    this.previous = new THREE.Vector3();
    this.original = new THREE.Vector3();

    this.a = new THREE.Vector3( 0, 0, 0 ); // acceleration
    this.mass = mass;
    this.invMass = 1 / mass;
    this.tmp = new THREE.Vector3();
    this.tmp2 = new THREE.Vector3();

    // init
    clothFunction( x, y, this.position ); // position
    clothFunction( x, y, this.previous ); // previous
    clothFunction( x, y, this.original );
  }

  addForce(force) {
    this.a.add(
      this.tmp2.copy( force ).multiplyScalar( this.invMass )
    );
  };

  integrate(timesq) {
    const newPos = this.tmp.subVectors( this.position, this.previous );
    newPos.multiplyScalar( DRAG ).add( this.position );
    newPos.add( this.a.multiplyScalar( timesq ) );

    this.tmp = this.previous;
    this.previous = this.position;
    this.position = newPos;

    this.a.set( 0, 0, 0 );
  };
}