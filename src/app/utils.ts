import { FormGroup } from '@angular/forms';

/**
 * Marks all controls in a form group as touched
 * https://stackoverflow.com/a/44150793/6397885
 * @param formGroup - The form group to touch
 */
export function markFormGroupTouched(formGroup: FormGroup): void {
  (Object).values(formGroup.controls).forEach(control => {
    control.markAsTouched();
  });
}
