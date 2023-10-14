import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-bg-template',
  templateUrl: './auth-bg-template.component.html',
  styleUrls: ['./auth-bg-template.component.scss'],
})
export class AuthBgTemplateComponent implements OnInit {
  @Input()
  title: string = '';

  @Input()
  text: string = '';

  constructor() {}

  ngOnInit() {}
}
