import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  state : number = 0;

  closeDistance : number = 80;

  noScreenX : number = 0;
  noScreenY : number = 0;

  noLeft : number = 50;
  noTop : number = 0;

  failOpacity : number = 0;

  constructor( ) {}

  ngOnInit(): void { }

  ngAfterViewInit() {

    setTimeout(() => {

      // Fetch the x y center of the no button
      let noButton = document.getElementById('no');
      let noButtonRect = noButton!.getBoundingClientRect();
      this.noScreenX = noButtonRect.x + (noButtonRect.width / 2);
      this.noScreenY = noButtonRect.y + (noButtonRect.height / 2);

      // Detect Mouse movements
      let mouseXLast = 0;
      let mouseYLast = 0;
      document.addEventListener('mousemove', (event) => {

        // Get the x and y position of the mouse
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        // Save how far the mouse moved since the last event
        let newMoveX = mouseX - mouseXLast;
        let newMoveY = mouseY - mouseYLast;

        // Calculate the distance between the mouse and the no button
        let distanceX = mouseX - this.noScreenX;
        let distanceY = mouseY - this.noScreenY;

        // Calculate the distance between the mouse and the no button (xy center)
        let distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

        // if the distance is less than the closeDistance
        if (distance < this.closeDistance) {

          // Calculate the angle between the mouse and the no button
          this.noLeft += newMoveX;
          this.noScreenX += newMoveX;
          this.noTop += newMoveY;
          this.noScreenY += newMoveY;

        }

        // Save the last position of the mouse
        mouseXLast = mouseX;
        mouseYLast = mouseY;

        // Debug
        console.log(distance);
        
        // Calculate the fail opac
        if ( distance > 100 ) {
          this.failOpacity = 0;
        } else if ( distance < this.closeDistance ) {
          this.failOpacity = 1;
        } else {
          this.failOpacity = 1 - (distance - this.closeDistance) / (105 - this.closeDistance);
        }
        this.failOpacity *= 0.95;

      });

    }, 1000);

  }

  clickYes () {
    this.state = 2;
  }

}
