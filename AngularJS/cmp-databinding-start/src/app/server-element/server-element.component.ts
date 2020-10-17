import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Element } from '../shared/element.model';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ServerElementComponent implements OnInit {
  @Input() element: Element;

  constructor() {}

  ngOnInit(): void {}
}
