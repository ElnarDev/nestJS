import { Component, OnInit } from '@angular/core';
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
import { UsuarioService } from '../../services/usuario.service';
import { CreateUsuarioDto, UpdateUsuarioDto, Usuario } from '../../models/usuario.model';

interface UsuarioForm {
    id?: number;
    name: string;
    email: string;
    password: string;
}

@Component({
    selector: 'app-usuario-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        PasswordModule,
        ToastModule,
        ConfirmDialogModule,
        TooltipModule,
        IconFieldModule,
        InputIconModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './usuario-list.component.html'
})
export class UsuarioListComponent implements OnInit {
    usuarios: Usuario[] = [];
    loading = false;
    saving = false;

    dialogVisible = false;
    editMode = false;
    submitted = false;

    form: UsuarioForm = { name: '', email: '', password: '' };

    constructor(
        private usuarioService: UsuarioService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.loadUsuarios();
    }

    loadUsuarios(): void {
        this.loading = true;
        this.usuarioService.getAll().subscribe({
            next: (data) => {
                this.usuarios = data;
                this.loading = false;
            },
            error: (err) => {
                const msg = err?.error?.message;
                const detail = Array.isArray(msg) ? msg.join(', ') : (msg ?? 'No se pudo cargar la lista de usuarios.');
                this.messageService.add({ severity: 'error', summary: 'Error', detail });
                this.loading = false;
            }
        });
    }

    openNew(): void {
        this.editMode = false;
        this.resetForm();
        this.dialogVisible = true;
    }

    editUsuario(usuario: Usuario): void {
        this.editMode = true;
        this.form = { id: usuario.id, name: usuario.name, email: usuario.email, password: '' };
        this.submitted = false;
        this.dialogVisible = true;
    }

    hideDialog(): void {
        this.dialogVisible = false;
        this.resetForm();
    }

    resetForm(): void {
        this.form = { name: '', email: '', password: '' };
        this.submitted = false;
    }

    emailValido(): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);
    }

    saveUsuario(): void {
        this.submitted = true;

        const nameValid = this.form.name?.trim().length >= 4;
        const emailValid = !!this.form.email?.trim() && this.emailValido();
        const passwordValid = this.editMode ? true : this.form.password?.length >= 6;

        if (!nameValid || !emailValid || !passwordValid) return;

        this.saving = true;

        if (this.editMode) {
            const dto: UpdateUsuarioDto = { id: this.form.id!, name: this.form.name, email: this.form.email };
            if (this.form.password) dto.password = this.form.password;

            this.usuarioService.update(dto).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado correctamente.' });
                    this.loadUsuarios();
                    this.hideDialog();
                    this.saving = false;
                },
                error: (err) => {
                    const msg = err?.error?.message;
                    const detail = Array.isArray(msg) ? msg.join(', ') : (msg ?? 'No se pudo actualizar el usuario.');
                    this.messageService.add({ severity: 'error', summary: 'Error', detail });
                    this.saving = false;
                }
            });
        } else {
            const dto: CreateUsuarioDto = { name: this.form.name, email: this.form.email, password: this.form.password };

            this.usuarioService.create(dto).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado correctamente.' });
                    this.loadUsuarios();
                    this.hideDialog();
                    this.saving = false;
                },
                error: (err) => {
                    const msg = err?.error?.message;
                    const detail = Array.isArray(msg) ? msg.join(', ') : (msg ?? 'No se pudo crear el usuario.');
                    this.messageService.add({ severity: 'error', summary: 'Error', detail });
                    this.saving = false;
                }
            });
        }
    }

    confirmDelete(usuario: Usuario): void {
        this.confirmationService.confirm({
            message: `¿Estás seguro de eliminar al usuario <b>${usuario.name}</b>?`,
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, eliminar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => this.deleteUsuario(usuario.id)
        });
    }

    private deleteUsuario(id: number): void {
        this.usuarioService.delete(id).subscribe({
            next: () => {
                this.usuarios = this.usuarios.filter((u) => u.id !== id);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario eliminado correctamente.' });
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el usuario.' });
            }
        });
    }
}
