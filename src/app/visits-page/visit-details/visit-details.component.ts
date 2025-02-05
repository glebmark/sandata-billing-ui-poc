import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visit-details',
  template: `
    <div>
      <h2>Visit Details</h2>
      <p>Visit ID: {{ visitId }}</p>
    </div>
  `,
  styles: []
})
export class VisitDetailsComponent implements OnInit {
  visitId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.visitId = +this.route.snapshot.paramMap.get('id')!;
  }
}
