export declare class AjfBooleanFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfBooleanFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfBooleanFieldComponent, never>;
}

export declare class AjfDateFieldComponent extends AjfBaseFieldComponent<AjfDateFieldInstance> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfDateFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfDateFieldComponent, never>;
}

export declare class AjfDateInputFieldComponent extends AjfBaseFieldComponent<AjfDateFieldInstance> {
    input: MatInput;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, _dvs: AjfDateValueStringPipe);
    protected _onInstanceChange(): void;
    onChange(): void;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfDateInputFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfDateInputFieldComponent, never>;
}

export declare class AjfEmptyFieldComponent extends AjfBaseFieldComponent<AjfEmptyFieldInstance> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfEmptyFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfEmptyFieldComponent, never>;
}

export declare class AjfFieldService extends CoreService {
    constructor();
    static ɵfac: i0.ɵɵFactoryDef<AjfFieldService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AjfFieldService>;
}

export declare class AjfFieldWarningDialog {
    message: string;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfFieldWarningDialog, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfFieldWarningDialog, never>;
}

export declare class AjfFormField extends CoreFormField {
    readonly componentsMap: AjfFieldComponentsMap;
    constructor(cdr: ChangeDetectorRef, cfr: ComponentFactoryResolver, fieldService: AjfFieldService);
    static ngAcceptInputType_readonly: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfFormField, "ajf-field,ajf-form-field", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfFormField, never>;
}

export declare class AjfFormRenderer extends AjfCoreFormRenderer {
    topBar: boolean;
    constructor(rendererService: AjfFormRendererService, changeDetectorRef: ChangeDetectorRef);
    scrollToSlide(slide: any): void;
    static ngAcceptInputType_fixedOrientation: BooleanInput;
    static ngAcceptInputType_hasEndMessage: BooleanInput;
    static ngAcceptInputType_hasStartMessage: BooleanInput;
    static ngAcceptInputType_hideBottomToolbar: BooleanInput;
    static ngAcceptInputType_hideNavigationButtons: BooleanInput;
    static ngAcceptInputType_hideTopToolbar: BooleanInput;
    static ngAcceptInputType_readonly: BooleanInput;
    static ngAcceptInputType_saveDisabled: BooleanInput;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfFormRenderer, "ajf-form", never, { "topBar": "topBar"; }, {}, never, ["[ajfFormStartMessageTitle]", "[ajfFormStartMessage]", "[ajfFormEndMessageTitle]", "[ajfFormEndMessage]"]>;
    static ɵfac: i0.ɵɵFactoryDef<AjfFormRenderer, never>;
}

export declare class AjfFormsModule {
    static ɵinj: i0.ɵɵInjectorDef<AjfFormsModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<AjfFormsModule, [typeof i1.AjfBarcodeFieldComponent, typeof i2.AjfBooleanFieldComponent, typeof i3.AjfDateFieldComponent, typeof i4.AjfDateInputFieldComponent, typeof i5.AjfEmptyFieldComponent, typeof i6.AjfFieldWarningDialog, typeof i7.AjfFormField, typeof i8.AjfFormRenderer, typeof i9.AjfInputFieldComponent, typeof i10.AjfMultipleChoiceFieldComponent, typeof i11.AjfSingleChoiceFieldComponent, typeof i12.AjfTableFieldComponent, typeof i13.AjfTextFieldComponent, typeof i14.AjfTimeFieldComponent, typeof i15.AjfVideoUrlFieldComponent], [typeof i16.AjfBarcodeModule, typeof i17.AjfCalendarModule, typeof i18.AjfCommonModule, typeof i19.AjfFormsModule, typeof i20.AjfCheckboxGroupModule, typeof i21.AjfPageSliderModule, typeof i22.AjfTimeModule, typeof i23.CommonModule, typeof i24.MatButtonModule, typeof i25.MatCardModule, typeof i26.MatDialogModule, typeof i27.MatFormFieldModule, typeof i28.MatIconModule, typeof i29.MatInputModule, typeof i30.MatRadioModule, typeof i31.MatSelectModule, typeof i32.MatSlideToggleModule, typeof i33.MatToolbarModule, typeof i34.ReactiveFormsModule, typeof i35.TextFieldModule, typeof i36.TranslateModule], [typeof i7.AjfFormField, typeof i8.AjfFormRenderer]>;
    static forRoot(): ModuleWithProviders<AjfFormsModule>;
}

export declare class AjfInputFieldComponent extends CoreComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfInputFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfInputFieldComponent, never>;
}

export declare class AjfMultipleChoiceFieldComponent<T> extends AjfFieldWithChoicesComponent<T> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, searchThreshold: number);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfMultipleChoiceFieldComponent<any>, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfMultipleChoiceFieldComponent<any>, [null, null, null, { optional: true; }]>;
}

export declare class AjfSingleChoiceFieldComponent<T> extends AjfFieldWithChoicesComponent<T> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, searchThreshold: number);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfSingleChoiceFieldComponent<any>, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfSingleChoiceFieldComponent<any>, [null, null, null, { optional: true; }]>;
}

export declare class AjfTableFieldComponent extends AjfCoreTableFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfTableFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfTableFieldComponent, never>;
}

export declare class AjfTimeFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AjfTimeFieldComponent, "ng-component", never, {}, {}, never, never>;
    static ɵfac: i0.ɵɵFactoryDef<AjfTimeFieldComponent, never>;
}

export declare class AjfWarningAlertService implements CoreWarningAlertService {
    constructor(_dialog: MatDialog);
    showWarningAlertPrompt(warnings: string[]): Observable<AjfFieldWarningAlertResult>;
    static ɵfac: i0.ɵɵFactoryDef<AjfWarningAlertService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AjfWarningAlertService>;
}
