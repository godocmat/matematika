import { Component, OnInit } from '@angular/core';
import * as math from 'mathjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';



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
  iframeUrl = '';
  iframeUlrDerivacia = '';


  urlSafeDeri: SafeResourceUrl;
  urlSafe: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
   // tslint:disable-next-line: max-line-length
   this.iframeUrl = 'https://www.monroecc.edu/faculty/paulseeburger/calcnsf/CalcPlot3D/?type=z;z=' + this.funkcia + ';visible=true;umin=-2;umax=2;vmin=-2;vmax=2;grid=30;format=constant;alpha=-1;constcol=rgb(255,0,0);view=0;contourcolor=red;fixdomain=false&type=point;point=(' + this.bod1 + ',' + this.bod2 + ');visible=true;color=rgb(255,0,255);size=7&type=vector;vector=%3C' + this.vektor1 + ',' + this.vektor2 + '%3E;visible=true;color=rgb(255,0,0);size=4;initialpt=(' + this.bod1 + ',' + this.bod2 + ',0)&type=window;hsrmode=3;nomidpts=true;anaglyph=-1;center=8.019814417365795,4.325905466909679,4.119359003820102,1;focus=0,0,0,1;up=-0.5110694283918182,-0.04087686436059752,0.8585668997365933,1;transparent=true;alpha=140;twoviews=false;unlinkviews=false;axisextension=0.7;xaxislabel=x;yaxislabel=y;zaxislabel=z;edgeson=true;faceson=true;showbox=false;showaxes=true;showticks=true;perspective=true;centerxpercent=0.5;centerypercent=0.5;rotationsteps=30;autospin=true;xygrid=false;yzgrid=false;xzgrid=false;gridsonbox=true;gridplanes=false;gridcolor=rgb(128,128,128);xmin=-2;xmax=2;ymin=-2;ymax=2;zmin=-2;zmax=2;xscale=1;yscale=1;zscale=1;zcmin=-4;zcmax=4;zoom=1.382;xscalefactor=1;yscalefactor=1;zscalefactor=1#';
   this.urlSafeDeri = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrl);
   this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrl);
  }




  vypocitaj() {

    // vypocitame parcialne derivacie
    this.derivaciax = math.derivative(math.parse(this.funkcia), 'x').toString();
    this.derivaciay = math.derivative(math.parse(this.funkcia), 'y').toString();
    console.log('prva derivacia ' + this.derivaciax);
    console.log('druha derivacia ' + this.derivaciay);

    // vypocitame hodnoty gradientu, dosadime bod x,y do parcialnych derivacii
    this.gradient1 = math.simplify(this.derivaciax).evaluate({x: this.bod1, y: this.bod2}).toString();
    this.gradient1 = parseFloat(this.gradient1).toFixed(3);

    console.log('prvy gradient ' + this.gradient1);
    this.gradient2 = math.simplify(this.derivaciay).evaluate({x: this.bod1, y: this.bod2}).toString();
    this.gradient2 = parseFloat(this.gradient2).toFixed(3);
    console.log('druhy gradient ' + this.gradient2);

    // normovanie vektora
    let vysledokVektora = math.sqrt(math.pow(this.vektor1, 2) + math.pow(this.vektor2, 2)).toString();
    vysledokVektora = parseFloat(vysledokVektora).toFixed(3);
    console.log('vysledok vektora ' + vysledokVektora);
    this.normal1 = +this.vektor1 / vysledokVektora;
    this.normal1 = parseFloat(this.normal1).toFixed(3);
    console.log('vysledok normal1 ' + this.normal1);
    this.normal2 = +this.vektor2 / vysledokVektora;
    this.normal2 = parseFloat(this.normal2).toFixed(3);
    console.log('vysledok normal2 ' + this.normal2);

    this.vysledok = this.gradient1 * this.normal1 + this.gradient2 * this.normal2;
    this.vysledok = parseFloat(this.vysledok).toFixed(3);
    console.log('finalny vysledok ' + this.vysledok);




     // tslint:disable-next-line: max-line-length
    this.iframeUrl = 'https://www.monroecc.edu/faculty/paulseeburger/calcnsf/CalcPlot3D/?type=z;z=' + this.funkcia + ';visible=true;umin=-2;umax=2;vmin=-2;vmax=2;grid=30;format=normal;alpha=-1;constcol=rgb(255,0,0);view=0;contourcolor=red;fixdomain=false&type=point;point=(' + this.bod1 + ',' + this.bod2 + ');visible=true;color=rgb(255,0,255);size=7&type=vector;vector=%3C' + this.vektor1 + ',' + this.vektor2 + '%3E;visible=true;color=rgb(255,0,0);size=4;initialpt=(0,0,0)&type=window;hsrmode=3;nomidpts=true;anaglyph=-1;center=9.157462767416149,0.01269055594166902,-4.0175508227226455,1;focus=0,0,0,1;up=0.1601625868149773,-0.9182494313218712,0.3621683692176816,1;transparent=true;alpha=140;twoviews=false;unlinkviews=false;axisextension=0.7;xaxislabel=x;yaxislabel=y;zaxislabel=z;edgeson=true;faceson=true;showbox=true;showaxes=true;showticks=true;perspective=true;centerxpercent=0.5;centerypercent=0.5;rotationsteps=30;autospin=true;xygrid=false;yzgrid=false;xzgrid=false;gridsonbox=true;gridplanes=false;gridcolor=rgb(128,128,128);xmin=-2;xmax=2;ymin=-2;ymax=2;zmin=-2;zmax=2;xscale=1;yscale=1;zscale=1;zcmin=-4;zcmax=4;zoom=1.382;xscalefactor=1;yscalefactor=1;zscalefactor=1#';
    // tslint:disable-next-line: max-line-length
    // this.iframeUlrDerivacia = 'https://www.monroecc.edu/faculty/paulseeburger/calcnsf/CalcPlot3D/?type=z;z=' + this.funkcia + ';visible=true;umin=-2;umax=2;vmin=-2;vmax=2;grid=30;format=normal;alpha=-1;constcol=rgb(255,0,0);view=0;contourcolor=red;fixdomain=false&type=point;point=(' + this.bod1 + ',' + this.bod2 + ');visible=true;color=rgb(255,0,255);size=7&type=vector;vector=%3C' + this.vektor1 + ',' + this.vektor2 + '%3E;visible=true;color=rgb(255,0,0);size=4;initialpt=(0,0,0)&type=z;z='+this.derivaciax+';visible=true;umin=-2;umax=2;vmin=-2;vmax=2;grid=30;format=normal;alpha=-1;constcol=rgb(255,0,0);view=0;contourcolor=red;fixdomain=false&type=z;z='+this.derivaciay+ ';visible=true;umin=-2;umax=2;vmin=-2;vmax=2;grid=30;format=normal;alpha=-1;constcol=rgb(255,0,0);view=0;contourcolor=red;fixdomain=false&type=window;hsrmode=3;nomidpts=true;anaglyph=-1;center=-4.941152335835414,4.857037847177652,7.210700170242375,1;focus=0,0,0,1;up=0.7843892762544031,0.1058465839977629,0.611170977675722,1;transparent=true;alpha=140;twoviews=false;unlinkviews=false;axisextension=0.7;xaxislabel=x;yaxislabel=y;zaxislabel=z;edgeson=true;faceson=true;showbox=true;showaxes=true;showticks=true;perspective=true;centerxpercent=0.5;centerypercent=0.5;rotationsteps=30;autospin=true;xygrid=false;yzgrid=false;xzgrid=false;gridsonbox=true;gridplanes=false;gridcolor=rgb(128,128,128);xmin=-2;xmax=2;ymin=-2;ymax=2;zmin=-2;zmax=2;xscale=1;yscale=1;zscale=1;zcmin=-4;zcmax=4;zoom=1.382;xscalefactor=1;yscalefactor=1;zscalefactor=1#';
    // tslint:disable-next-line: max-line-length
    this.iframeUlrDerivacia = 'https://www.monroecc.edu/faculty/paulseeburger/calcnsf/CalcPlot3D/?type=z;z=' + this.funkcia + ';visible=true;umin=-2;umax=2;vmin=-2;vmax=2;grid=30;format=constant;alpha=-1;constcol=rgb(255,0,0);view=0;contourcolor=red;fixdomain=false&type=point;point=(' + this.bod1 + ',' + this.bod2 + ');visible=true;color=rgb(255,0,255);size=7&type=vector;vector=%3C' + this.vektor1 + ',' + this.vektor2 + '%3E;visible=true;color=rgb(255,0,0);size=4;initialpt=(' + this.bod1 + ',' + this.bod2 + ',0)&type=z;z=' + this.derivaciax + ';visible=true;umin=-2;umax=2;vmin=-2;vmax=2;grid=30;format=constant;alpha=-1;constcol=rgb(0,0,255);view=0;contourcolor=red;fixdomain=false&type=z;z=' + this.derivaciay + ';visible=true;umin=-2;umax=2;vmin=-2;vmax=2;grid=30;format=constant;alpha=-1;constcol=rgb(0,255,0);view=0;contourcolor=red;fixdomain=false&type=window;hsrmode=3;nomidpts=true;anaglyph=-1;center=8.019814417365795,4.325905466909679,4.119359003820102,1;focus=0,0,0,1;up=-0.5110694283918182,-0.04087686436059752,0.8585668997365933,1;transparent=true;alpha=140;twoviews=false;unlinkviews=false;axisextension=0.7;xaxislabel=x;yaxislabel=y;zaxislabel=z;edgeson=true;faceson=true;showbox=false;showaxes=true;showticks=true;perspective=true;centerxpercent=0.5;centerypercent=0.5;rotationsteps=30;autospin=true;xygrid=false;yzgrid=false;xzgrid=false;gridsonbox=true;gridplanes=false;gridcolor=rgb(128,128,128);xmin=-2;xmax=2;ymin=-2;ymax=2;zmin=-2;zmax=2;xscale=1;yscale=1;zscale=1;zcmin=-4;zcmax=4;zoom=1.382;xscalefactor=1;yscalefactor=1;zscalefactor=1#';
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrl);
    this.urlSafeDeri = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUlrDerivacia);

  }


}
