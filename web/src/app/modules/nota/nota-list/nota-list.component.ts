import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DatePickerModule } from 'primeng/datepicker';
import { NotaModel } from '../shared/nota.model';
import { NotaService } from './nota.service';

@Component({
    selector: 'app-nota-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DatePickerModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        PasswordModule,
        ToastModule,
        ConfirmDialogModule,
        TooltipModule,
        IconFieldModule,
        InputIconModule,

    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './nota-list.component.html',
    styleUrl: './nota-list.component.css',
})
export class NotaListComponent implements OnInit {

    date: Date = new Date();

    dataTest = [
        { id: 1, title: 'Nota 1', content: 'Conteúdo da nota 1', createdAt: new Date(), updatedAt: new Date() },
        { id: 2, title: 'Nota 2', content: 'Conteúdo da nota 2', createdAt: new Date(), updatedAt: new Date() },
        { id: 3, title: 'Nota 3', content: 'Conteúdo da nota 3', createdAt: new Date(), updatedAt: new Date() },
        { id: 4, title: 'Nota 4', content: 'Conteúdo da nota 4', createdAt: new Date(), updatedAt: new Date() },
        { id: 5, title: 'Nota 5', content: 'Conteúdo da nota 5', createdAt: new Date(), updatedAt: new Date() },
    ];
    loading = false;
    notas: NotaModel[] = [];

    constructor(
        private nota$ : NotaService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.loadNotas();

    }

    udpateNotaTest(data: NotaModel, event: any): void {
        console.log('Update nota:', data);
        this.confirmationService.confirm({
            message: `Are you sure you want to update the nota "${data.title}"?`,
            header: 'Confirm Update',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `Nota "${data.title}" updated` });
            },
            reject: () => {
                this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: `Update of nota "${data.title}" cancelled` });
            }
        });


    }

    deleteNotaTest(data: NotaModel, event: any): void {
        console.log('Delete nota:', data);
        this.confirmationService.confirm({
            message: `Are you sure you want to delete the nota "${data.title}"?`,
            header: 'Confirm Delete',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `Nota "${data.title}" deleted` });
            },
            reject: () => {
                this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: `Delete of nota "${data.title}" cancelled` });
            }
        });
    }

    loadNotas(): void {
        this.loading = true;
        this.nota$.getAll().subscribe({
            next: (data) => {
                this.notas = data;
                console.log(this.notas);
                this.loading = false;
                this.cdr.markForCheck();
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load notas' });
                this.loading = false;
                this.cdr.markForCheck();
            }
        });
    }
}
