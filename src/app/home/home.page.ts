import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  state : number = 0;

  noScreenX : number = 0;
  noScreenY : number = 0;

  noLeft : number = 10;
  noTop : number = 0;

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
      document.addEventListener('mousemove', (event) => {

        // Get the x and y position of the mouse
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        // Calculate the distance between the mouse and the no button
        let distanceX = mouseX - this.noScreenX;
        let distanceY = mouseY - this.noScreenY;

        // If this distance is less than 100, move the noLeft to the opposite direction
        if (Math.abs(distanceX) < 50) {
          if (distanceX > 0) {
            this.noLeft--;
            this.noScreenX--;
          } else {
            this.noLeft++;
            this.noScreenX++;
          }
        }
        if (Math.abs(distanceY) < 50) {
          if (distanceY > 0) {
            this.noTop--;
            this.noScreenY--;
          } else {
            this.noTop++;
            this.noScreenY++;
          }
        }

      });

    }, 1000);

  }

  clickYes () {
    this.state = 2;
  }

}
