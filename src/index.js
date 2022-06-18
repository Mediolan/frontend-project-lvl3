import _ from 'lodash';
import './style.css';
import icon from './icon.png';
import Data from './data.xml';
import Notes from './data.csv';

 function component() {
   const element = document.createElement('div');

   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
   element.classList.add('hello');

   return element;
 }

 document.body.appendChild(component());
