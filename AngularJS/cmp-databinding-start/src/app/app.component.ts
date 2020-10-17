import { Component } from '@angular/core';
import { Element } from './shared/element.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  serverElements: Element[] = [
    { type: 'server', name: 'hello', content: 'hello' },
    { type: 'server', name: 'hello1', content: 'hello' },
  ];

  onAddServer(serverData: { serverName: string; serverContent: string }): void {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent,
    });
  }

  onAddBlueprint(serverBlueprintData: {
    serverName: string;
    serverContent: string;
  }): void {
    this.serverElements.push({
      type: 'blueprint',
      name: serverBlueprintData.serverName,
      content: serverBlueprintData.serverContent,
    });
  }
}
