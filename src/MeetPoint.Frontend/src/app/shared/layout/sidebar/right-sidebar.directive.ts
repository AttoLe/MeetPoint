import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[appRightSidebar]' })
export class RightSidebarDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
