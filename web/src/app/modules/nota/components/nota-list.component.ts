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
    templateUrl: './nota-list.component.html',
    styleUrl: './nota-list.component.css',
})
export class NotaListComponent {

    date: Date = new Date();
}
