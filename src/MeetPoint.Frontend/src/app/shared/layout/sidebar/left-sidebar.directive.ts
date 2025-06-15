import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[appLeftSidebar]' })
export class LeftSidebarDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
