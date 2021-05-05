import {getResource} from '../services/services';


function cards() {
   class MenuCard {
      constructor(src, alt, id, title, body, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.id = id;
         this.title = title;
         this.body = body;
         this.classes = classes;
         this.parent = document.querySelector(parentSelector);
      }
      render() {
         const element = document.createElement('div');

         if (this.classes.length === 0) {
               this.classes = "cards__item";
               element.classList.add(this.classes);
         } else {
               this.classes.forEach(className => element.classList.add(className));
         }
         element.innerHTML = `
            <img src="img/card/img_post_12.jpg" alt="image">
            <div class="cards__wrapper">
               <h3 class="cards__item-title">${this.id}</h3>
               <div class="cards__item-subtitle">${this.title}</div>
               <div class="cards__item-descr">${this.body}</div>
               <div class="cards__item-posts">Posted by <span>Alex</span>, on 24 July 2020</div>
               <button class="cards__item-btn">Continue reading</button>
            </div>  
         `;
         this.parent.append(element);
      }
   }
   
   getResource('https://jsonplaceholder.typicode.com/posts/?_limit=6')
      .then(data => {
         data.forEach(({img, altimg, id, title, body}) => {
            new MenuCard(img, altimg, id, title, body, ".cards .container").render();
         });
      });

   const btn = document.querySelector('.cards__btn');
      btn.addEventListener('click', () => cards());
   
}


export default cards;