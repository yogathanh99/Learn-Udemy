import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent implements OnInit {
  @Output() handleAddServer = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();

  @Output() handleAddBlueprint = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();

  // This is ViewChild
  @ViewChild('serverContentInput') serverContentInput: ElementRef;

  serverElements = [];
  newServerName = '';
  newServerContent = '';

  constructor() {}

  ngOnInit(): void {}

  onAddServer(nameInput: HTMLInputElement): void {
    this.handleAddServer.emit({
      // serverName: this.newServerName,
      // serverContent: this.newServerContent,
      // This is local references
      serverName: nameInput.value,
      // This is using value of ViewChild
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement): void {
    this.handleAddBlueprint.emit({
      // serverName: this.newServerName,
      // serverContent: this.newServerContent,
      // This is local references
      serverName: nameInput.value,
      // This is using value of ViewChild
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }
}
