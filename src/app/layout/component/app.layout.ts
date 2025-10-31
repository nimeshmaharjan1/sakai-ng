import { CommonModule } from '@angular/common';
import { Component, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Button } from 'primeng/button';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { filter, Subscription } from 'rxjs';
import { LayoutService } from '../service/layout.service';
import { AppSidebar } from './app.sidebar';
import { AppTopbar } from './app.topbar';
import { FINANCE_REPORT_DATA, FinanceReportRow } from './constants';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, AppSidebar, RouterModule, Button, ToggleSwitch],
    template: `<div class="layout-wrapper" [ngClass]="containerClass">
        <app-sidebar></app-sidebar>
        <div class="layout-main-container">
            <!-- <app-topbar></app-topbar> -->
            <div class="layout-main flex flex-col gap-8">
                <header class="grid grid-cols-12 gap-6 items-center">
                    <div class="col-span-8">
                        <div class="flex items-center gap-3 border border-green-500 p-2.5 px-4 rounded-md">
                            <div class="h-5 w-5 rounded-full flex items-center justify-center bg-green-700">
                                <i class="pi pi-check text-xs! text-white"></i>
                            </div>
                            <span>You've just reached 1000 listens on your latest track!</span>
                        </div>
                    </div>
                    <div class="col-span-4 flex items-center gap-4">
                        <p-button size="large" label="Create New Product" />
                        <p-button size="large" icon="pi pi-bell" severity="secondary" [raised]="true" />
                        <p-button size="large" icon="pi pi-question-circle" severity="secondary" [raised]="true" />
                    </div>
                </header>
                <section class="grid grid-cols-2 gap-4 summary-section">
                    <p class="text-xl font-semibold col-span-2 mb-0!">Summary</p>
                    <div class="p-6 rounded-xl bg-white flex flex-col gap-4">
                        <header class="flex items-center  border-b gap-2 pb-4 border-gray-200">
                            <p-button [rounded]="true" icon="pi pi-folder" variant="text" [raised]="true" severity="secondary" />
                            <p class="font-medium">Store Status</p>
                        </header>
                        <div class="grid grid-cols-2 gap-6">
                            <div class="flex items-center gap-3">
                                <div class="h-8 w-8 rounded-full flex items-center justify-center bg-gray-300">
                                    <span class="text-[8px]">NAC</span>
                                </div>
                                <p>No Active contract</p>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="h-8 min-w-8 rounded-full flex items-center justify-center bg-orange-400">
                                    <i class="pi pi-clock ml-0.5 text-white"></i>
                                </div>
                                <p>Active - Revenue yet to be posted</p>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="h-8 min-w-8 rounded-full flex items-center justify-center bg-orange-400">
                                    <i class="pi pi-clock ml-0.5 text-white"></i>
                                </div>
                                <p>Contract Ended / Report Closed</p>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="h-8 min-w-8 rounded-full flex items-center justify-center bg-white">
                                    <span>£</span>
                                </div>
                                <p>Active - Revenue posted</p>
                            </div>
                        </div>
                    </div>
                    <div class="p-6 rounded-xl bg-white flex flex-col gap-4">
                        <header class="flex items-center  border-b gap-2 pb-4 border-gray-200">
                            <p-button [rounded]="true" icon="pi pi-comment" variant="text" [raised]="true" severity="secondary" />
                            <p class="font-medium">FAQs</p>
                        </header>
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="font-bold text-2xl! mb-1!">Have Questions?</p>
                                <p class="">We've got answers. Explore our most frequently asked questions.</p>
                            </div>
                            <p-button label="Explore" size="large" variant="outlined" />
                        </div>
                    </div>
                    <!-- <p-panel header="Summary" [toggleable]="true">
                        <p class="m-0">Lorem ipsum dolor sit amet...</p>
                    </p-panel> -->
                </section>
                <section class="bg-white shadow rounded-xl">
                    <header class="flex items-center justify-between p-6 border-b border-gray-200">
                        <section class="left flex items-center gap-4">
                            <p class="font-bold text-xl! mb-0!">Finance Home</p>
                            <div class="border border-gray-300 p-4 font-medium py-2 rounded-md flex items-center gap-4">
                                <p class="mb-0!">Year (2025)</p>
                                <i class="pi pi-chevron-down mt-0.5"></i>
                            </div>
                        </section>
                        <section class="right flex items-center gap-4">
                            <p-toggleswitch />
                            <p class="text-gray-600 mb-0! mr-6!">Gross Revenue View</p>

                            <p-button icon="pi pi-external-link" label="Export" variant="outlined" severity="help" />
                        </section>
                    </header>
                    <main class="p-">
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="sticky top-0 z-10">
                                    <tr class="">
                                        <th class="px-6 py-6 text-left text-xs  bg-white text-sm! font-normal! text-gray-400! tracking-wider min-w-[150px] sticky left-0 ">Store Report</th>
                                        <th *ngFor="let month of monthKeys" class="px-3 py-6 text-center text-xs  text-gray-500 text-sm! font-normal! text-gray-400! tracking-wider min-w-[80px]">
                                            {{ month | titlecase }}
                                        </th>
                                        <th class="px-6 py-6 text-right text-xs  text-gray-500 text-sm! font-normal! text-gray-400! tracking-wider min-w-[100px]">Total</th>
                                    </tr>
                                </thead>

                                <tbody class="bg-white divide-y divide-gray-200 text-sm">
                                    <tr *ngFor="let row of reportData; trackBy: trackByStore" class="hover:">
                                        <td class="px-6 py-8 whitespace-nowrap font-medium text-gray-900 sticky left-0 text-base! bg-white">
                                            {{ row.store }}
                                        </td>

                                        <ng-container *ngFor="let monthKey of monthKeys">
                                            <td class="px-3 py-8 whitespace-nowrap text-center text-gray-700">
                                                <ng-container *ngIf="getMonthlyRevenue(row, monthKey) > 0">
                                                    <div class="flex items-center justify-center gap-1">
                                                        <span class="text-base!">£ {{ getMonthlyRevenue(row, monthKey) | number: '1.2-2' }}</span>
                                                        <!-- <div class="h-4 w-4 rounded-full flex items-center justify-center bg-green-500">
                                                            <i class="pi pi-check text-xs! text-white" style="font-size: 0.6rem;"></i>
                                                        </div> -->
                                                    </div>
                                                </ng-container>
                                                <ng-container *ngIf="getMonthlyRevenue(row, monthKey) === 0">
                                                    <div class="flex items-center justify-center">
                                                        <div class="h-8 w-8 rounded-full flex items-center justify-center bg-red-700">
                                                            <i class="pi pi-times text-xs! text-white" style="font-size: 0.6rem;"></i>
                                                        </div>
                                                    </div>
                                                </ng-container>
                                            </td>
                                        </ng-container>

                                        <td class="px-6 py-8 whitespace-nowrap text-right font-bold text-gray-900 sticky right-0 bg-white">£ {{ row.total | number: '1.2-2' }}</td>
                                    </tr>
                                </tbody>

                                <tfoot>
                                    <tr class="">
                                        <td class="px-6 py-8 whitespace-nowrap font-bold text-gray-900 sticky left-0 ">Total</td>
                                        <td *ngFor="let monthKey of monthKeys" class="px-3 py-8 whitespace-nowrap text-center font-bold text-gray-900">£ 262.28</td>
                                        <td class="px-6 py-8 whitespace-nowrap text-right font-bold text-purple-600 sticky right-0 bg-purple-50">£ 1252.28</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </main>
                </section>
            </div>
            <!-- <app-footer></app-footer> -->
        </div>
        <div class="layout-mask animate-fadein"></div>
    </div> `,
})
export class AppLayout implements OnDestroy {
    public reportData: FinanceReportRow[] = FINANCE_REPORT_DATA;

    // Strongly typed month keys
    public monthKeys: (keyof Omit<FinanceReportRow, 'store' | 'total'>)[] = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    overlayMenuOpenSubscription: Subscription;
    menuOutsideClickListener: any;

    @ViewChild(AppSidebar) appSidebar!: AppSidebar;
    @ViewChild(AppTopbar) appTopBar!: AppTopbar;

    constructor(
        public layoutService: LayoutService,
        public renderer: Renderer2,
        public router: Router,
    ) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
                    if (this.isOutsideClicked(event)) {
                        this.hideMenu();
                    }
                });
            }

            if (this.layoutService.layoutState().staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.hideMenu();
        });
    }

    // --- TrackBy function for ngFor ---
    trackByStore(index: number, row: FinanceReportRow) {
        return row.store;
    }

    // --- Get monthly revenue safely ---
    getMonthlyRevenue(row: FinanceReportRow, key: keyof Omit<FinanceReportRow, 'store' | 'total'>): number {
        return row[key];
    }

    isOutsideClicked(event: MouseEvent) {
        const sidebarEl = document.querySelector('.layout-sidebar');
        const topbarEl = document.querySelector('.layout-menu-button');
        const eventTarget = event.target as Node;
        return !(sidebarEl?.isSameNode(eventTarget) || sidebarEl?.contains(eventTarget) || topbarEl?.isSameNode(eventTarget) || topbarEl?.contains(eventTarget));
    }

    hideMenu() {
        this.layoutService.layoutState.update((prev) => ({
            ...prev,
            overlayMenuActive: false,
            staticMenuMobileActive: false,
            menuHoverActive: false,
        }));

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    blockBodyScroll(): void {
        document.body.classList.add('blocked-scroll');
    }

    unblockBodyScroll(): void {
        document.body.classList.remove('blocked-scroll');
    }

    get containerClass() {
        return {
            'layout-overlay': this.layoutService.layoutConfig().menuMode === 'overlay',
            'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
            'layout-static-inactive': this.layoutService.layoutState().staticMenuDesktopInactive && this.layoutService.layoutConfig().menuMode === 'static',
            'layout-overlay-active': this.layoutService.layoutState().overlayMenuActive,
            'layout-mobile-active': this.layoutService.layoutState().staticMenuMobileActive,
        };
    }

    ngOnDestroy() {
        this.overlayMenuOpenSubscription?.unsubscribe();
        this.menuOutsideClickListener?.();
    }
}
