import ExportOption from '@/components/menu/ExportOption.vue';
import { store } from '@/utils/store';
import otoritas from '@/router/otoritas';
import CetakDokumen from '@/components/print/CetakDokumen.vue';
import SuratJalan from '@/views/pengiriman/SuratJalan.vue';
import CetakDo from '@/views/pengiriman/CetakDo.vue';

export default await (async () => {
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');

const __VLS_componentsOption = {};

let __VLS_name!: 'BasePage';
function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {};
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {} &
__VLS_WithComponent<'PillsButton', typeof __VLS_localComponents, "PillsButton", "pillsButton", "pills-button"> &
__VLS_WithComponent<'BaseInput', typeof __VLS_localComponents, "BaseInput", "baseInput", "base-input"> &
__VLS_WithComponent<'ExportOption', typeof __VLS_localComponents, "ExportOption", "ExportOption", "ExportOption"> &
__VLS_WithComponent<'BaseFilter', typeof __VLS_localComponents, "BaseFilter", "baseFilter", "base-filter"> &
__VLS_WithComponent<'BaseTable', typeof __VLS_localComponents, "BaseTable", "baseTable", "base-table"> &
__VLS_WithComponent<'CetakDokumen', typeof __VLS_localComponents, "CetakDokumen", "CetakDokumen", "CetakDokumen"> &
__VLS_WithComponent<'SuratJalan', typeof __VLS_localComponents, "SuratJalan", "SuratJalan", "SuratJalan"> &
__VLS_WithComponent<'CetakDo', typeof __VLS_localComponents, "CetakDo", "CetakDo", "CetakDo"> &
__VLS_WithComponent<'BaseDetail', typeof __VLS_localComponents, "BaseDetail", "baseDetail", "base-detail">;
__VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div; __VLS_intrinsicElements.div;
__VLS_components.PillsButton; __VLS_components.PillsButton; __VLS_components.pillsButton; __VLS_components.pillsButton; __VLS_components["pills-button"]; __VLS_components["pills-button"];
// @ts-ignore
[PillsButton, PillsButton,];
__VLS_components.BaseInput; __VLS_components.BaseInput; __VLS_components.baseInput; __VLS_components.baseInput; __VLS_components["base-input"]; __VLS_components["base-input"];
// @ts-ignore
[BaseInput, BaseInput,];
__VLS_intrinsicElements.button; __VLS_intrinsicElements.button; __VLS_intrinsicElements.button; __VLS_intrinsicElements.button;
__VLS_intrinsicElements.i; __VLS_intrinsicElements.i; __VLS_intrinsicElements.i; __VLS_intrinsicElements.i;
__VLS_components.ExportOption;
// @ts-ignore
[ExportOption,];
__VLS_components.BaseFilter; __VLS_components.BaseFilter; __VLS_components.baseFilter; __VLS_components.baseFilter; __VLS_components["base-filter"]; __VLS_components["base-filter"];
// @ts-ignore
[BaseFilter, BaseFilter,];
__VLS_components.BaseTable; __VLS_components.BaseTable; __VLS_components.baseTable; __VLS_components.baseTable; __VLS_components["base-table"]; __VLS_components["base-table"];
// @ts-ignore
[BaseTable, BaseTable,];
__VLS_components.CetakDokumen; __VLS_components.CetakDokumen;
// @ts-ignore
[CetakDokumen, CetakDokumen,];
__VLS_intrinsicElements.template; __VLS_intrinsicElements.template; __VLS_intrinsicElements.template; __VLS_intrinsicElements.template; __VLS_intrinsicElements.template; __VLS_intrinsicElements.template; __VLS_intrinsicElements.template; __VLS_intrinsicElements.template; __VLS_intrinsicElements.template; __VLS_intrinsicElements.template;
__VLS_components.SuratJalan;
// @ts-ignore
[SuratJalan,];
__VLS_components.CetakDo;
// @ts-ignore
[CetakDo,];
__VLS_components.BaseDetail; __VLS_components.BaseDetail; __VLS_components.baseDetail; __VLS_components.baseDetail; __VLS_components["base-detail"]; __VLS_components["base-detail"];
// @ts-ignore
[BaseDetail, BaseDetail,];
{
const __VLS_0 = __VLS_intrinsicElements["div"];
const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
const __VLS_2 = __VLS_1({ ...{}, class: ("h-screen w-full ps-0 md:ps-24 pt-16 pb-3 text-sm"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{}, class: ("h-screen w-full ps-0 md:ps-24 pt-16 pb-3 text-sm"), });
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
(__VLS_ctx.store().menu.option.key == undefined ? 'overflow-auto md:overflow-hidden' : 'overflow-hidden');
{
const __VLS_5 = __VLS_intrinsicElements["div"];
const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
const __VLS_7 = __VLS_6({ ...{}, class: ("pt-5 mx-3 md:mx-5 h-[90%] md:h-full overflow-visible md:overflow-hidden rounded-xl animate__animated animate__fadeIn animate__slow"), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{}, class: ("pt-5 mx-3 md:mx-5 h-[90%] md:h-full overflow-visible md:overflow-hidden rounded-xl animate__animated animate__fadeIn animate__slow"), });
const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
(__VLS_ctx.store().theme == 'dark' ? 'dark' : 'bg-white');
{
const __VLS_10 = __VLS_intrinsicElements["div"];
const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
const __VLS_12 = __VLS_11({ ...{}, class: ("flex flex-wrap justify-between items-end space-y-2 px-3 ms:px-4"), }, ...__VLS_functionalComponentArgsRest(__VLS_11));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{}, class: ("flex flex-wrap justify-between items-end space-y-2 px-3 ms:px-4"), });
const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
{
const __VLS_15 = __VLS_intrinsicElements["div"];
const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
const __VLS_17 = __VLS_16({ ...{}, class: ("flex flex-col space-y-3 w-max"), }, ...__VLS_functionalComponentArgsRest(__VLS_16));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{}, class: ("flex flex-col space-y-3 w-max"), });
const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
if (__VLS_ctx.config.permission.find(item => item.key == 'tambah') && __VLS_ctx.otoritas.check('tambah')) {
{
const __VLS_20 = ({} as 'PillsButton' extends keyof typeof __VLS_ctx ? { 'PillsButton': typeof __VLS_ctx.PillsButton; } : 'pillsButton' extends keyof typeof __VLS_ctx ? { 'PillsButton': typeof __VLS_ctx.pillsButton; } : 'pills-button' extends keyof typeof __VLS_ctx ? { 'PillsButton': (typeof __VLS_ctx)["pills-button"]; } : typeof __VLS_resolvedLocalAndGlobalComponents).PillsButton;
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ ...{ onClick: {} as any, }, class: ("bg-primary z-[1] w-max"), label: ("Tambah Data"), }));
({} as { PillsButton: typeof __VLS_20; }).PillsButton;
({} as { PillsButton: typeof __VLS_20; }).PillsButton;
const __VLS_22 = __VLS_21({ ...{ onClick: {} as any, }, class: ("bg-primary z-[1] w-max"), label: ("Tambah Data"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_20, typeof __VLS_22> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, class: ("bg-primary z-[1] w-max"), label: ("Tambah Data"), });
const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
let __VLS_24!: __VLS_NormalizeEmits<typeof __VLS_23.emit>;
let __VLS_25 = { 'click': __VLS_pickEvent(__VLS_24['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_21, typeof __VLS_22>).onClick) };
__VLS_25 = {
click: $event => {
if (!((__VLS_ctx.config.permission.find(item => item.key == 'tambah') && __VLS_ctx.otoritas.check('tambah')))) return;
__VLS_ctx.option({ title: 'tambah ' + __VLS_ctx.$router.currentRoute.value.name, key: 'tambah' });
// @ts-ignore
[store, store, config, otoritas, option, $router,];
}
};
}
}
(__VLS_18.slots!).default;
}
{
const __VLS_26 = __VLS_intrinsicElements["div"];
const __VLS_27 = __VLS_elementAsFunctionalComponent(__VLS_26);
const __VLS_28 = __VLS_27({ ...{}, class: ("flex items-center justify-center md:justify-end space-x-2 w-max"), }, ...__VLS_functionalComponentArgsRest(__VLS_27));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_26, typeof __VLS_28> & Record<string, unknown>) => void)({ ...{}, class: ("flex items-center justify-center md:justify-end space-x-2 w-max"), });
const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_26, __VLS_28)!;
let __VLS_30!: __VLS_NormalizeEmits<typeof __VLS_29.emit>;
{
const __VLS_31 = ({} as 'BaseInput' extends keyof typeof __VLS_ctx ? { 'BaseInput': typeof __VLS_ctx.BaseInput; } : 'baseInput' extends keyof typeof __VLS_ctx ? { 'BaseInput': typeof __VLS_ctx.baseInput; } : 'base-input' extends keyof typeof __VLS_ctx ? { 'BaseInput': (typeof __VLS_ctx)["base-input"]; } : typeof __VLS_resolvedLocalAndGlobalComponents).BaseInput;
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({ ...{ onSearch: {} as any, }, type: ("search"), variant: ("tonal"), }));
({} as { BaseInput: typeof __VLS_31; }).BaseInput;
({} as { BaseInput: typeof __VLS_31; }).BaseInput;
const __VLS_33 = __VLS_32({ ...{ onSearch: {} as any, }, type: ("search"), variant: ("tonal"), }, ...__VLS_functionalComponentArgsRest(__VLS_32));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_31, typeof __VLS_33> & Record<string, unknown>) => void)({ ...{ onSearch: {} as any, }, type: ("search"), variant: ("tonal"), });
const __VLS_34 = __VLS_pickFunctionalComponentCtx(__VLS_31, __VLS_33)!;
let __VLS_35!: __VLS_NormalizeEmits<typeof __VLS_34.emit>;
let __VLS_36 = { 'search': __VLS_pickEvent(__VLS_35['search'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_32, typeof __VLS_33>).onSearch) };
__VLS_36 = { search: (__VLS_ctx.input) };
}
{
const __VLS_37 = __VLS_intrinsicElements["div"];
const __VLS_38 = __VLS_elementAsFunctionalComponent(__VLS_37);
const __VLS_39 = __VLS_38({ ...{}, class: ("flex gap-x-0 md:gap-x-2 items-center"), }, ...__VLS_functionalComponentArgsRest(__VLS_38));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_37, typeof __VLS_39> & Record<string, unknown>) => void)({ ...{}, class: ("flex gap-x-0 md:gap-x-2 items-center"), });
const __VLS_40 = __VLS_pickFunctionalComponentCtx(__VLS_37, __VLS_39)!;
let __VLS_41!: __VLS_NormalizeEmits<typeof __VLS_40.emit>;
{
const __VLS_42 = __VLS_intrinsicElements["button"];
const __VLS_43 = __VLS_elementAsFunctionalComponent(__VLS_42);
const __VLS_44 = __VLS_43({ ...{ onClick: {} as any, }, class: ("h-[40px] w-[40px] rounded-full hover:bg-primary-hover"), }, ...__VLS_functionalComponentArgsRest(__VLS_43));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_42, typeof __VLS_44> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, class: ("h-[40px] w-[40px] rounded-full hover:bg-primary-hover"), });
const __VLS_45 = __VLS_pickFunctionalComponentCtx(__VLS_42, __VLS_44)!;
let __VLS_46!: __VLS_NormalizeEmits<typeof __VLS_45.emit>;
let __VLS_47 = { 'click': __VLS_pickEvent(__VLS_46['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_43, typeof __VLS_44>).onClick) };
__VLS_47 = {
click: $event => {
__VLS_ctx.active('col');
// @ts-ignore
[input, active,];
}
};
{
const __VLS_48 = __VLS_intrinsicElements["i"];
const __VLS_49 = __VLS_elementAsFunctionalComponent(__VLS_48);
const __VLS_50 = __VLS_49({ ...{}, class: ("ri-layout-5-line text-primary text-base"), }, ...__VLS_functionalComponentArgsRest(__VLS_49));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_48, typeof __VLS_50> & Record<string, unknown>) => void)({ ...{}, class: ("ri-layout-5-line text-primary text-base"), });
const __VLS_51 = __VLS_pickFunctionalComponentCtx(__VLS_48, __VLS_50)!;
let __VLS_52!: __VLS_NormalizeEmits<typeof __VLS_51.emit>;
}
(__VLS_45.slots!).default;
}
if (__VLS_ctx.otoritas.check('pdf') || __VLS_ctx.otoritas.check('xlsx')) {
{
const __VLS_53 = ({} as 'ExportOption' extends keyof typeof __VLS_ctx ? { 'ExportOption': typeof __VLS_ctx.ExportOption; } : typeof __VLS_resolvedLocalAndGlobalComponents).ExportOption;
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({ ...{}, }));
({} as { ExportOption: typeof __VLS_53; }).ExportOption;
const __VLS_55 = __VLS_54({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_54));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_53, typeof __VLS_55> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_56 = __VLS_pickFunctionalComponentCtx(__VLS_53, __VLS_55)!;
let __VLS_57!: __VLS_NormalizeEmits<typeof __VLS_56.emit>;
}
// @ts-ignore
[otoritas, otoritas,];
}
if (__VLS_ctx.config.filter != false) {
{
const __VLS_58 = __VLS_intrinsicElements["button"];
const __VLS_59 = __VLS_elementAsFunctionalComponent(__VLS_58);
const __VLS_60 = __VLS_59({ ...{ onClick: {} as any, }, class: ("h-[40px] w-[40px] rounded-full hover:bg-primary-hover"), }, ...__VLS_functionalComponentArgsRest(__VLS_59));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_58, typeof __VLS_60> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, class: ("h-[40px] w-[40px] rounded-full hover:bg-primary-hover"), });
const __VLS_61 = __VLS_pickFunctionalComponentCtx(__VLS_58, __VLS_60)!;
let __VLS_62!: __VLS_NormalizeEmits<typeof __VLS_61.emit>;
let __VLS_63 = { 'click': __VLS_pickEvent(__VLS_62['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_59, typeof __VLS_60>).onClick) };
__VLS_63 = {
click: $event => {
if (!((__VLS_ctx.config.filter != false))) return;
__VLS_ctx.active('filter');
// @ts-ignore
[config, active,];
}
};
{
const __VLS_64 = __VLS_intrinsicElements["i"];
const __VLS_65 = __VLS_elementAsFunctionalComponent(__VLS_64);
const __VLS_66 = __VLS_65({ ...{}, class: ("ri-filter-line text-primary text-base"), }, ...__VLS_functionalComponentArgsRest(__VLS_65));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_64, typeof __VLS_66> & Record<string, unknown>) => void)({ ...{}, class: ("ri-filter-line text-primary text-base"), });
const __VLS_67 = __VLS_pickFunctionalComponentCtx(__VLS_64, __VLS_66)!;
let __VLS_68!: __VLS_NormalizeEmits<typeof __VLS_67.emit>;
}
(__VLS_61.slots!).default;
}
}
(__VLS_40.slots!).default;
}
(__VLS_29.slots!).default;
}
(__VLS_13.slots!).default;
}
{
const __VLS_69 = ({} as 'BaseFilter' extends keyof typeof __VLS_ctx ? { 'BaseFilter': typeof __VLS_ctx.BaseFilter; } : 'baseFilter' extends keyof typeof __VLS_ctx ? { 'BaseFilter': typeof __VLS_ctx.baseFilter; } : 'base-filter' extends keyof typeof __VLS_ctx ? { 'BaseFilter': (typeof __VLS_ctx)["base-filter"]; } : typeof __VLS_resolvedLocalAndGlobalComponents).BaseFilter;
const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({ ...{}, fields: ((__VLS_ctx.drawer)), column: ((__VLS_ctx.column)), items: ((__VLS_ctx.store().items)), }));
({} as { BaseFilter: typeof __VLS_69; }).BaseFilter;
({} as { BaseFilter: typeof __VLS_69; }).BaseFilter;
const __VLS_71 = __VLS_70({ ...{}, fields: ((__VLS_ctx.drawer)), column: ((__VLS_ctx.column)), items: ((__VLS_ctx.store().items)), }, ...__VLS_functionalComponentArgsRest(__VLS_70));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_69, typeof __VLS_71> & Record<string, unknown>) => void)({ ...{}, fields: ((__VLS_ctx.drawer)), column: ((__VLS_ctx.column)), items: ((__VLS_ctx.store().items)), });
const __VLS_72 = __VLS_pickFunctionalComponentCtx(__VLS_69, __VLS_71)!;
let __VLS_73!: __VLS_NormalizeEmits<typeof __VLS_72.emit>;
}
{
const __VLS_74 = __VLS_intrinsicElements["div"];
const __VLS_75 = __VLS_elementAsFunctionalComponent(__VLS_74);
const __VLS_76 = __VLS_75({ ...{}, class: ("w-full h-[94%] duration-500"), }, ...__VLS_functionalComponentArgsRest(__VLS_75));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_74, typeof __VLS_76> & Record<string, unknown>) => void)({ ...{}, class: ("w-full h-[94%] duration-500"), });
const __VLS_77 = __VLS_pickFunctionalComponentCtx(__VLS_74, __VLS_76)!;
let __VLS_78!: __VLS_NormalizeEmits<typeof __VLS_77.emit>;
(__VLS_ctx.store().filter || __VLS_ctx.store().column ? '-translate-y-10 md:translate-y-0' : '-translate-y-[473px] md:-translate-y-[250px]');
{
const __VLS_79 = ({} as 'Slot' extends keyof typeof __VLS_ctx ? { 'slot': typeof __VLS_ctx.Slot; } : 'slot' extends keyof typeof __VLS_ctx ? { 'slot': typeof __VLS_ctx.slot; } : typeof __VLS_resolvedLocalAndGlobalComponents).slot;
const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({ ...{}, }));
const __VLS_81 = __VLS_80({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_80));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_79, typeof __VLS_81> & Record<string, unknown>) => void)({ ...{}, });
var __VLS_82 = {};
{
const __VLS_83 = ({} as 'BaseTable' extends keyof typeof __VLS_ctx ? { 'BaseTable': typeof __VLS_ctx.BaseTable; } : 'baseTable' extends keyof typeof __VLS_ctx ? { 'BaseTable': typeof __VLS_ctx.baseTable; } : 'base-table' extends keyof typeof __VLS_ctx ? { 'BaseTable': (typeof __VLS_ctx)["base-table"]; } : typeof __VLS_resolvedLocalAndGlobalComponents).BaseTable;
const __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({ ...{}, fields: ((__VLS_ctx.config.fields)), items: ((__VLS_ctx.datatable)), master: ((true)), permission: ((__VLS_ctx.config)), s_table: ((__VLS_ctx.config.permission != '' ? false : true)), }));
({} as { BaseTable: typeof __VLS_83; }).BaseTable;
({} as { BaseTable: typeof __VLS_83; }).BaseTable;
const __VLS_85 = __VLS_84({ ...{}, fields: ((__VLS_ctx.config.fields)), items: ((__VLS_ctx.datatable)), master: ((true)), permission: ((__VLS_ctx.config)), s_table: ((__VLS_ctx.config.permission != '' ? false : true)), }, ...__VLS_functionalComponentArgsRest(__VLS_84));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_83, typeof __VLS_85> & Record<string, unknown>) => void)({ ...{}, fields: ((__VLS_ctx.config.fields)), items: ((__VLS_ctx.datatable)), master: ((true)), permission: ((__VLS_ctx.config)), s_table: ((__VLS_ctx.config.permission != '' ? false : true)), });
const __VLS_86 = __VLS_pickFunctionalComponentCtx(__VLS_83, __VLS_85)!;
let __VLS_87!: __VLS_NormalizeEmits<typeof __VLS_86.emit>;
}
(__VLS_77.slots!).default;
}
(__VLS_77.slots!).default;
}
(__VLS_8.slots!).default;
}
if (__VLS_ctx.store().print) {
{
const __VLS_88 = ({} as 'CetakDokumen' extends keyof typeof __VLS_ctx ? { 'CetakDokumen': typeof __VLS_ctx.CetakDokumen; } : typeof __VLS_resolvedLocalAndGlobalComponents).CetakDokumen;
const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({ ...{}, }));
({} as { CetakDokumen: typeof __VLS_88; }).CetakDokumen;
({} as { CetakDokumen: typeof __VLS_88; }).CetakDokumen;
const __VLS_90 = __VLS_89({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_89));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_88, typeof __VLS_90> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_91 = __VLS_pickFunctionalComponentCtx(__VLS_88, __VLS_90)!;
let __VLS_92!: __VLS_NormalizeEmits<typeof __VLS_91.emit>;
{
const __VLS_93 = __VLS_intrinsicElements["template"];
const __VLS_94 = __VLS_elementAsFunctionalComponent(__VLS_93);
const __VLS_95 = __VLS_94({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_94));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_93, typeof __VLS_95> & Record<string, unknown>) => void)({ ...{}, });
{
(__VLS_91.slots!).dokumen;
if (__VLS_ctx.store().suratjalan) {
{
const __VLS_96 = ({} as 'SuratJalan' extends keyof typeof __VLS_ctx ? { 'SuratJalan': typeof __VLS_ctx.SuratJalan; } : typeof __VLS_resolvedLocalAndGlobalComponents).SuratJalan;
const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({ ...{}, }));
({} as { SuratJalan: typeof __VLS_96; }).SuratJalan;
const __VLS_98 = __VLS_97({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_97));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_96, typeof __VLS_98> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_99 = __VLS_pickFunctionalComponentCtx(__VLS_96, __VLS_98)!;
let __VLS_100!: __VLS_NormalizeEmits<typeof __VLS_99.emit>;
}
// @ts-ignore
[drawer, column, store, drawer, column, store, drawer, column, store, store, store, config, datatable, config, config, config, datatable, config, config, config, datatable, config, config, store, store,];
}
if (__VLS_ctx.store().do) {
{
const __VLS_101 = ({} as 'CetakDo' extends keyof typeof __VLS_ctx ? { 'CetakDo': typeof __VLS_ctx.CetakDo; } : typeof __VLS_resolvedLocalAndGlobalComponents).CetakDo;
const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({ ...{}, }));
({} as { CetakDo: typeof __VLS_101; }).CetakDo;
const __VLS_103 = __VLS_102({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_102));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_101, typeof __VLS_103> & Record<string, unknown>) => void)({ ...{}, });
const __VLS_104 = __VLS_pickFunctionalComponentCtx(__VLS_101, __VLS_103)!;
let __VLS_105!: __VLS_NormalizeEmits<typeof __VLS_104.emit>;
}
// @ts-ignore
[store,];
}
}
}
}
}
{
const __VLS_106 = ({} as 'Slot' extends keyof typeof __VLS_ctx ? { 'slot': typeof __VLS_ctx.Slot; } : 'slot' extends keyof typeof __VLS_ctx ? { 'slot': typeof __VLS_ctx.slot; } : typeof __VLS_resolvedLocalAndGlobalComponents).slot;
const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({ ...{}, }));
const __VLS_108 = __VLS_107({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_107));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_106, typeof __VLS_108> & Record<string, unknown>) => void)({ ...{}, });
var __VLS_109 = {};
{
const __VLS_110 = ({} as 'BaseDetail' extends keyof typeof __VLS_ctx ? { 'BaseDetail': typeof __VLS_ctx.BaseDetail; } : 'baseDetail' extends keyof typeof __VLS_ctx ? { 'BaseDetail': typeof __VLS_ctx.baseDetail; } : 'base-detail' extends keyof typeof __VLS_ctx ? { 'BaseDetail': (typeof __VLS_ctx)["base-detail"]; } : typeof __VLS_resolvedLocalAndGlobalComponents).BaseDetail;
const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({ ...{}, field: ((__VLS_ctx.config.field_detail)), child: ((__VLS_ctx.config.child)), param: ((__VLS_ctx.config.param)), }));
({} as { BaseDetail: typeof __VLS_110; }).BaseDetail;
({} as { BaseDetail: typeof __VLS_110; }).BaseDetail;
const __VLS_112 = __VLS_111({ ...{}, field: ((__VLS_ctx.config.field_detail)), child: ((__VLS_ctx.config.child)), param: ((__VLS_ctx.config.param)), }, ...__VLS_functionalComponentArgsRest(__VLS_111));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_110, typeof __VLS_112> & Record<string, unknown>) => void)({ ...{}, field: ((__VLS_ctx.config.field_detail)), child: ((__VLS_ctx.config.child)), param: ((__VLS_ctx.config.param)), });
const __VLS_113 = __VLS_pickFunctionalComponentCtx(__VLS_110, __VLS_112)!;
let __VLS_114!: __VLS_NormalizeEmits<typeof __VLS_113.emit>;
{
const __VLS_115 = __VLS_intrinsicElements["template"];
const __VLS_116 = __VLS_elementAsFunctionalComponent(__VLS_115);
const __VLS_117 = __VLS_116({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_116));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_115, typeof __VLS_117> & Record<string, unknown>) => void)({ ...{}, });
{
(__VLS_113.slots!)["full-content"];
{
const __VLS_118 = ({} as 'Slot' extends keyof typeof __VLS_ctx ? { 'slot': typeof __VLS_ctx.Slot; } : 'slot' extends keyof typeof __VLS_ctx ? { 'slot': typeof __VLS_ctx.slot; } : typeof __VLS_resolvedLocalAndGlobalComponents).slot;
const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({ ...{}, }));
const __VLS_120 = __VLS_119({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_119));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_118, typeof __VLS_120> & Record<string, unknown>) => void)({ ...{}, });
var __VLS_121 = {};
}
// @ts-ignore
[config, config, config, config, config, config, config, config, config,];
}
}
{
const __VLS_122 = __VLS_intrinsicElements["template"];
const __VLS_123 = __VLS_elementAsFunctionalComponent(__VLS_122);
const __VLS_124 = __VLS_123({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_123));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_122, typeof __VLS_124> & Record<string, unknown>) => void)({ ...{}, });
{
(__VLS_113.slots!).detail;
{
const __VLS_125 = ({} as 'Slot' extends keyof typeof __VLS_ctx ? { 'slot': typeof __VLS_ctx.Slot; } : 'slot' extends keyof typeof __VLS_ctx ? { 'slot': typeof __VLS_ctx.slot; } : typeof __VLS_resolvedLocalAndGlobalComponents).slot;
const __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({ ...{}, }));
const __VLS_127 = __VLS_126({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_126));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_125, typeof __VLS_127> & Record<string, unknown>) => void)({ ...{}, });
var __VLS_128 = {};
}
}
}
{
const __VLS_129 = __VLS_intrinsicElements["template"];
const __VLS_130 = __VLS_elementAsFunctionalComponent(__VLS_129);
const __VLS_131 = __VLS_130({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_130));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_129, typeof __VLS_131> & Record<string, unknown>) => void)({ ...{}, });
{
const [data_left] = __VLS_getSlotParams((__VLS_113.slots!)["d-left"]);
{
const __VLS_132 = ({} as 'Slot' extends keyof typeof __VLS_ctx ? { 'slot': typeof __VLS_ctx.Slot; } : 'slot' extends keyof typeof __VLS_ctx ? { 'slot': typeof __VLS_ctx.slot; } : typeof __VLS_resolvedLocalAndGlobalComponents).slot;
const __VLS_133 = __VLS_asFunctionalComponent(__VLS_132, new __VLS_132({ ...{}, data_left: ((data_left.data_left)), }));
const __VLS_134 = __VLS_133({ ...{}, data_left: ((data_left.data_left)), }, ...__VLS_functionalComponentArgsRest(__VLS_133));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_132, typeof __VLS_134> & Record<string, unknown>) => void)({ ...{}, data_left: ((data_left.data_left)), });
var __VLS_135 = {
data_left: (data_left.data_left),
};
}
}
}
{
const __VLS_136 = __VLS_intrinsicElements["template"];
const __VLS_137 = __VLS_elementAsFunctionalComponent(__VLS_136);
const __VLS_138 = __VLS_137({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_137));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_136, typeof __VLS_138> & Record<string, unknown>) => void)({ ...{}, });
{
(__VLS_113.slots!)["header-content"];
{
const __VLS_139 = ({} as 'Slot' extends keyof typeof __VLS_ctx ? { 'slot': typeof __VLS_ctx.Slot; } : 'slot' extends keyof typeof __VLS_ctx ? { 'slot': typeof __VLS_ctx.slot; } : typeof __VLS_resolvedLocalAndGlobalComponents).slot;
const __VLS_140 = __VLS_asFunctionalComponent(__VLS_139, new __VLS_139({ ...{}, }));
const __VLS_141 = __VLS_140({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_140));
({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_139, typeof __VLS_141> & Record<string, unknown>) => void)({ ...{}, });
var __VLS_142 = {};
}
}
}
}
(__VLS_3.slots!).default;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
}
var __VLS_slots!: {
"base-content"?(_: typeof __VLS_82): any;
"detail-page"?(_: typeof __VLS_109): any;
"dt-full-content"?(_: typeof __VLS_121): any;
"base-detail"?(_: typeof __VLS_128): any;
left?(_: typeof __VLS_135): any;
"header-content"?(_: typeof __VLS_142): any;
};
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
ExportOption: ExportOption as typeof ExportOption,
store: store as typeof store,
otoritas: otoritas as typeof otoritas,
CetakDokumen: CetakDokumen as typeof CetakDokumen,
SuratJalan: SuratJalan as typeof SuratJalan,
CetakDo: CetakDo as typeof CetakDo,
};
},

props: { config: { type: Object } },
data() {
return {
drawer: '',
column: false,
detail: false,
search: 'false'
};
},
computed: {
datatable() {
return this.search != 'false' || this.search == '' ? this.search : store().items;
}
},
methods: {
active(param) {
if (param == 'filter') {
store().$patch((state) => {
state.filter = !state.filter;
state.column = false;
});
this.drawer = store().state.filter;
this.column = false;
} else if (param == 'col') {
store().$patch((state) => {
state.column = !state.column;
state.filter = false;
});
this.drawer = this.config.fields;
this.column = true;
}
},
option(value) {
store().$patch((state) => { state.menu.option = value; });
if (value.key == 'lihat') {
store().$patch((state) => { state.detail_dialog = true; });
} else if (value.key == 'tambah') {
store().$patch((state) => {
state.detail_dialog = true;
state.master = '',
state.detail = '';
});
} else if (value.key == 'edit') {
store().$patch((state) => {
state.detail_dialog = true;
});
} else if (value.key == 'hapus') {
store().delete();
}
},
close() {
store().$patch((state) => {
state.menu.show = false;
});
},
async input(value) {
if (value) this.search = store().search(value, store().items, this.config.fields);
else this.search = 'false';
}
}
});
const __VLS_component = (await import('vue')).defineComponent({
setup() {
return {};
},

props: { config: { type: Object } },
data() {
return {
drawer: '',
column: false,
detail: false,
search: 'false'
};
},
computed: {
datatable() {
return this.search != 'false' || this.search == '' ? this.search : store().items;
}
},
methods: {
active(param) {
if (param == 'filter') {
store().$patch((state) => {
state.filter = !state.filter;
state.column = false;
});
this.drawer = store().state.filter;
this.column = false;
} else if (param == 'col') {
store().$patch((state) => {
state.column = !state.column;
state.filter = false;
});
this.drawer = this.config.fields;
this.column = true;
}
},
option(value) {
store().$patch((state) => { state.menu.option = value; });
if (value.key == 'lihat') {
store().$patch((state) => { state.detail_dialog = true; });
} else if (value.key == 'tambah') {
store().$patch((state) => {
state.detail_dialog = true;
state.master = '',
state.detail = '';
});
} else if (value.key == 'edit') {
store().$patch((state) => {
state.detail_dialog = true;
});
} else if (value.key == 'hapus') {
store().delete();
}
},
close() {
store().$patch((state) => {
state.menu.show = false;
});
},
async input(value) {
if (value) this.search = store().search(value, store().items, this.config.fields);
else this.search = 'false';
}
}
});
return {} as __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
})();
type __VLS_WithTemplateSlots<T, S> = T & {
new(): {
$slots: S;
};
};
