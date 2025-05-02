import { Component } from '@angular/core';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  template: `
    <h3>Comments</h3>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci sed quos dolorem error enim asperiores aspernatur hic facere, corporis optio doloremque porro quam pariatur blanditiis, in qui fugiat doloribus cumque!
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti beatae animi tenetur debitis. Est vel reiciendis, ad error a ex quas aperiam alias, consequuntur exercitationem, itaque soluta dolore ipsum hic!
    </p>

    <img src="https://media.npr.org/assets/img/2023/01/14/this-is-fine_custom-dcb93e90c4e1548ffb16978a5a8d182270c872a9.jpg" alt="" />
    
  `,
  styles: `
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  `
})
export class CommentsComponent {

}
