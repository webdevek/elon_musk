import tabs from './modules/tabs';
import modal from './modules/modal';
// import maskPhone from './services/maskPhone';
import cards from './modules/cards';
// import forms from './modules/forms';
// import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {
   // const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

   tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
   // maskPhone('[data-phone]');
   modal('[data-modal]', '.modal');
   // modal('[data-modal]', '.modal', modalTimerId);
   cards();
   // forms('form', modalTimerId);


   const menu = document.querySelector('.menu'),
   menuItem = document.querySelectorAll('.menu__item'),
   hamburger = document.querySelector('.hamburger');

   hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('hamburger__active');
      menu.classList.toggle('menu__active');
   });

   menuItem.forEach(item => {
      item.addEventListener('click', () => {
         hamburger.classList.toggle('hamburger__active');
         menu.classList.toggle('menu__active');
      });
   });


   // const modalTrigger = document.querySelectorAll('[data-modal]'),
   //    modal = document.querySelector('.modal'),
   //    modalCloseBtn = document.querySelector('[data-close]');

   // modalTrigger.forEach(btn => {
   //    btn.addEventListener('click' , () => {
   //       modal.classList.add('show');
   //       modal.classList.remove('hide');
   //       document.body.style.overflow = 'hidden';
   //    });
   // });
   // modalCloseBtn.addEventListener('click', () => {
   //    modal.classList.add('hide');
   //    modal.classList.remove('show');
   //    document.body.style.overflow = '';
   // });

});
