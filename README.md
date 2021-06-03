# saveStorage

> saveStorage is a lightweight javascript plugin that automatically stores and recovers form values to prevent losing data when editing an HTML form.

## Supported elements:

- input (text,number,email,password...)
- radio, checkbox (input) -> Material Checkbox/Radio
- select
- textarea

## Usage:

Include saveStorage JS file

```
<script src="savestorage.min.js"></script>
```

HTML

```
<form id="myform"> // id required
  <div>
    <label>Name</label>
    <input type="text" name="name">
  </div>
  <div>
    <label>Surname</label>
    <input type="text" name="surname">
  </div>
</form>
```

initialize saveStorage

```
// Should be used with timeout in order to allow the form to charge
setTimeout(function() {
        saveStorage("#addPrescription", { patientId: entityId.id })
}, 2500);
```

how to delete on submit:
```
// Add id="send_form" in the send button ex.
<button mat-raised-button id="send_form" (click)="save()" [disabled]="medicine_selected == 9 || addPrescription.invalid || !valid_firm" color="primary">Generar Receta</button>
```

## Options (One is Required):

```
saveStorage('#myform', {
    exclude: ['passowrd','hidden'] // does not save input types
    patientId: Entity.id -> Required in order to save the form for each patient+form
});
```
