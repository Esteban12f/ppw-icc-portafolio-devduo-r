import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-group',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputGroupComponent),
      multi: true
    }
  ],
  templateUrl: './input-group-component.html',
})
export class InputGroupComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() errorMessage: string = 'Campo obligatorio.';
  @Input() invalid: boolean | null | undefined = false;
  @Input() touched: boolean | null | undefined = false;

  value: any;
  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any): void { this.value = value; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
}
