import tabs from './modules/tabs';
import modal from './modules/modal';
import cards from './modules/cards';
// import maskPhone from './services/maskPhone';
// import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {
   
   tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
   // maskPhone('[data-phone]');
   modal('[data-modal]', '.modal');
   cards();


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



   let phoneInputs = document.querySelectorAll('input[data-phone]');

   let getInputNumbersValue = function (input) {
       return input.value.replace(/\D/g, '');
   };

   let onPhonePaste = function (e) {
      let input = e.target,
         inputNumbersValue = getInputNumbersValue(input);
         let pasted = e.clipboardData || window.clipboardData;
      if (pasted) {
      let pastedText = pasted.getData('Text');
         if (/\D/g.test(pastedText)) {
            input.value = inputNumbersValue;
            return;
         }
      }
   };

   // let onPhoneInput = function (e) {
   //    let input = e.target,
   //       inputNumbersValue = getInputNumbersValue(input),
   //       selectionStart = input.selectionStart,
   //       formattedInputValue = "";

   //    if (!inputNumbersValue) {
   //       return input.value = "";
   //    }

   //    if (input.value.length != selectionStart) {
   //       if (e.data && /\D/g.test(e.data)) {
   //          input.value = inputNumbersValue;
   //       }
   //       return;
   //    }

   //    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
   //       if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
   //       let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
   //       formattedInputValue = input.value = firstSymbols + " ";
   //       if (inputNumbersValue.length > 1) {
   //          formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
   //       }
   //       if (inputNumbersValue.length >= 5) {
   //          formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
   //       }
   //       if (inputNumbersValue.length >= 8) {
   //          formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
   //       }
   //       if (inputNumbersValue.length >= 10) {
   //          formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
   //       }
   //    } else {
   //       formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
   //    }
   //    input.value = formattedInputValue;
   // };
   // let onPhoneKeyDown = function (e) {
   //    let inputValue = e.target.value.replace(/\D/g, '');
   //    if (e.keyCode == 8 && inputValue.length == 1) {
   //       e.target.value = "";
   //    }
   // };
   // for (let phoneInput of phoneInputs) {
   //    phoneInput.addEventListener('keydown', onPhoneKeyDown);
   //    phoneInput.addEventListener('input', onPhoneInput, false);
   //    phoneInput.addEventListener('paste', onPhonePaste, false);
   // }
});
