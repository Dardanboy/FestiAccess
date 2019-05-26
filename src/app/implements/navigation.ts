export class Navigation {
    protected hasIonTab: boolean;
    protected tabStructure: Array<{tab_button: string, tab_icon: string, tab_label: string, tab_badge: string}>;

    constructor() {
        this.hasIonTab = true;
        this.tabStructure = [
            {tab_button: 'schedule', tab_icon: 'calendar', tab_badge: '6', tab_label: 'Schedule test'}
        ];
    }
}
