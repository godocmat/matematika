import { Component, OnInit } from '@angular/core';
import * as math from 'mathjs';


@Component({
  selector: 'app-derivacia',
  templateUrl: './derivacia.component.html',
  styleUrls: ['./derivacia.component.css']
})
export class DerivaciaComponent implements OnInit {

  funkcia = '2x^2+3y^3-x*y';
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
    
    // vypocitame parcialne derivacie
    this.derviaciax = math.derivative(math.parse(this.funkcia),'x').toString();
    this.derivaciay = math.derivative(math.parse(this.funkcia),'y').toString();
    console.log("prva derivacia "+this.derviaciax);
    console.log("druha derivacia " +this.derivaciay);

    // vypocitame hodnoty gradientu, dosadime bod x,y do parcialnych derivacii
    this.gradient1 = math.simplify(this.derviaciax).evaluate({x: this.bod1, y: this.bod2}).toString();
    console.log("prvy gradient " + this.gradient1);
    this.gradient2 = math.simplify(this.derivaciay).evaluate({x: this.bod1, y: this.bod2}).toString();
    console.log("druhy gradient " + this.gradient2);

    // normovanie vektora
    const vysledokVektora = math.sqrt(math.pow(this.vektor1, 2) + math.pow(this.vektor2, 2)).toString();
    console.log("vysledok vektora " + vysledokVektora)
    this.normal1 = +this.vektor1 / vysledokVektora;
    console.log("vysledok normal1 " + this.normal1);
    this.normal2 = +this.vektor2 / vysledokVektora;
    console.log("vysledok normal2 " + this.normal2)

    this.vysledok = this.gradient1*this.normal1 + this.gradient2*this.normal2;

    console.log("finalny vysledok " +this.vysledok);
  }

}
