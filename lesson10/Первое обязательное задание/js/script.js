'use strict';

const DomElement = function (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
};

DomElement.prototype.createDomElem = function () {
    console.log(this);

    if(this.selector.slice(0,1) === '.') {
        let newElem1 = document.createElement('div');
        newElem1.classList.add(this.selector.slice(1));
        newElem1.style.cssText = 'height: '+ this.height +'px; ' +
            'width: '+ this.width +'px; ' +
            'background: '+ this.bg +'; ' +
            'font-size: '+ this.fontSize +';';
        newElem1.innerText = 'Пум-пурум-пум';
        document.body.appendChild(newElem1);
    }

    if(this.selector.slice(0,1) === '#') {
        let newElem2 = document.createElement('p');
        newElem2.setAttribute('id', this.selector.slice(1));
        newElem2.style.cssText = 'height: '+ this.height +'px; ' +
            'width: '+ this.width +'px; ' +
            'background: '+ this.bg +'; ' +
            'font-size: '+ this.fontSize +';';
        newElem2.innerText = 'Пам-парам-пам';
        document.body.appendChild(newElem2);
    }
};

let newDomElem1 = new DomElement('.block', '50', '200', 'red', '16px');
let newDomElem2 = new DomElement('#best', '150', '120', '#458787', '5em');


newDomElem1.createDomElem();
newDomElem2.createDomElem();