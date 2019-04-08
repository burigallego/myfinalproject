import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[elPreventDefault]'
})
export class ClickPreventDefaultDirective {
    @HostListener('click', ['$event'])
    onclick(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}
