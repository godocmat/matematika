import { Component, OnInit } from '@angular/core';
import * as math from 'mathjs';
import * as g from '@consunet/graph-lab';

const myGraph = new g.graph({
  scaling: 0.4,          // controls the initial magnification of the graph (same as using mouse wheel)
  yaw: -0.5,             // controls the initial yaw of the graph (same as moving mouse vertically)
  roll: -0.5,            // controls the initial rotation of the graph (same as moving mouse horizontally)
  range_y: {from: -100, to: 100},            // controls the range of the y axis
  range_x: {from: -10, to: 10, tick: 1}, // controls the range of the x axis with ticks specified
  range_z: {from: -10, to: 10, tick: 1}, // controls the range of the z axis with ticks specified
  x_name: 'x',           // controls the name of the x axis
  y_name: 'y',           // controls the name of the y axis
  z_name: 'z',           // controls the name of the z axis
});

@Component({
  selector: 'app-derivacia',
  templateUrl: './derivacia.component.html',
  styleUrls: ['./derivacia.component.css']
})
export class DerivaciaComponent implements OnInit {

  funkcia = 'x^2+y^2';
  derivaciax;
  derviaciax;
  derivaciay;
  bod1 = '1';
  bod2 = '2';
  vektor1 = '1';
  vektor2 = '3';
  gradient1;
  gradient2;
  normal1;
  normal2;
  vysledok;

  constructor() { }

  ngOnInit() {
    myGraph.insertSwitchPanel();
    myGraph.insertFunction((x,y)=> x*x+y*y, "hlavna_funkcia", "red");
    myGraph.draw();
  }

  computePartialDerivative(func: any, variable: Number, partial: String): Number {
    let equation = `f(${partial}) = ${func}`;

    var parser = math.parser();

    try {
      parser.evaluate(equation);
    } catch (error) {
      console.error(error)
      return;
    }
    const f = parser.get('f');
    parser.clear();
    return f(variable)
  }

  vypocitaj() {

    // vypocitame parcialne derivacie
    this.derivaciax = math.derivative(math.parse(this.funkcia), 'x').toString();
    this.derivaciay = math.derivative(math.parse(this.funkcia), 'y').toString();
    console.log('prva derivacia ' + this.derivaciax);
    console.log('druha derivacia ' + this.derivaciay);

    // vypocitame hodnoty gradientu, dosadime bod x,y do parcialnych derivacii
    this.gradient1 = math.simplify(this.derivaciax).evaluate({x: this.bod1, y: this.bod2}).toString();

    console.log('prvy gradient ' + this.gradient1);
    this.gradient2 = math.simplify(this.derivaciay).evaluate({x: this.bod1, y: this.bod2}).toString();
    console.log('druhy gradient ' + this.gradient2);

    // normovanie vektora
    const vysledokVektora = math.sqrt(math.pow(this.vektor1, 2) + math.pow(this.vektor2, 2)).toString();
    console.log('vysledok vektora ' + vysledokVektora);
    this.normal1 = +this.vektor1 / vysledokVektora;
    console.log('vysledok normal1 ' + this.normal1);
    this.normal2 = +this.vektor2 / vysledokVektora;
    console.log('vysledok normal2 ' + this.normal2);

    this.vysledok = this.gradient1 * this.normal1 + this.gradient2 * this.normal2;

    console.log('finalny vysledok ' + this.vysledok);

    myGraph.insertFunction((x,y)=> this.computePartialDerivative(this.derivaciax, x, "x"), "derivacia_podla_x", "green" );
    myGraph.insertFunction((x,y)=> this.computePartialDerivative(this.derivaciay, y, "y"), "derivacia_podla_y", "blue" );
    myGraph.draw();
  }

}
