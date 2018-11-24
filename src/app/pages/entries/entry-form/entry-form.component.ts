import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EntryModel} from '../shared/entry.model';
import {EntryService} from '../shared/entry.service';
import {switchMap} from 'rxjs/operators';
import toastr from 'toastr';
import {CategoryModel} from '../../categories/shared/category.model';
import {CategoryService} from '../../categories/shared/category.service';

@Component({
    selector: 'app-entry-form',
    templateUrl: './entry-form.component.html',
    styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

    currentAction: string;
    entryForm: FormGroup;
    pageTitle: string;
    serverErrorMessage: string[] = null;
    submitingForm = false;
    entry: EntryModel = new EntryModel();
    categories: Array<CategoryModel>;

    imaskConfig = {
        mask: Number,
        scale: 2,
        thousandsSeparator: '',
        padFractionalZeros: true,
        normalizeZeros: true,
        radix: ','
    };
    ptBR = {
        firstDayOfWeek: 0,
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        monthNames: [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
            'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        today: 'Hoje',
        clear: 'Limpar'
    };


    constructor(
        private entryService: EntryService,
        private route: ActivatedRoute,
        private router: Router,
        private categoryService: CategoryService,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit() {
        this.setCurrentAction();
        this.buildEntryForm();
        this.loadEntry();

        this.loadCategories();
    }

    ngAfterContentChecked() {
        this.SetPageTitle();
    }

    submitForm() {
        this.submitingForm = true;
        if (this.currentAction === 'new') {
            this.createEntry();
        } else {
            this.updateEntry();
        }
    }

    get typeOptions(): Array<any> {
        return Object.entries(EntryModel.types).map(
            ([value, text]) => {
                return {
                    text: text,
                    value: value,
                };
            });
    }

    // Private
    private setCurrentAction() {
        if (this.route.snapshot.url[0].path === 'new') {
            this.currentAction = 'new';
        } else {
            this.currentAction = 'edit';
        }
    }

    private loadCategories() {
        this.categoryService.getAll().subscribe(
            categories => this.categories = categories
        );
    }

    private buildEntryForm() {
        this.entryForm = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required, Validators.minLength(2)]],
            description: [null],
            type: ['expense', [Validators.required]],
            amount: [null, [Validators.required]],
            date: [null, [Validators.required]],
            paid: [true, [Validators.required]],
            categoryId: [null, [Validators.required]],

        });
    }

    private loadEntry() {
        if (this.currentAction === 'edit') {
            this.route.paramMap.pipe(
                switchMap(params => this.entryService.getById(+params.get('id')))
            ).subscribe(
                (entry) => {
                    this.entry = entry;
                    this.entryForm.patchValue(entry); // binds loaded entry data to EntryForm
                },
                (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
            );
        }
    }

    private SetPageTitle() {
        if (this.currentAction === 'new') {
            this.pageTitle = 'Cadastro de Novo Lançamento';
        } else {
            const catName = this.entry.name || '';
            this.pageTitle = 'Editando Lançamento ' + catName;
        }
    }

    private createEntry() {
        const entry: EntryModel = Object.assign(new EntryModel(), this.entryForm.value);

        this.entryService.create(entry)
            .subscribe(
                entry => this.actionsForSuccess(entry),
                error => this.actionsForError(error)
            );
    }

    private updateEntry() {
        const entry: EntryModel = Object.assign(new EntryModel(), this.entryForm.value);
        this.entryService.update(entry)
            .subscribe(
                entry => this.actionsForSuccess(entry),
                error => this.actionsForError(error)
            );
    }

    private actionsForSuccess(entry: EntryModel) {
        toastr.success('Solicitação processada com sucesso');
        this.router.navigateByUrl('entries', {skipLocationChange: true}).then(() =>
            this.router.navigate(['entries', entry.id, 'edit'])
        );
    }

    private actionsForError(error) {
        toastr.error('ocorreu um erro :(');
        this.submitingForm = false;
        if (error.status === 422)
            this.serverErrorMessage = JSON.parse(error._body).errors;
        else this.serverErrorMessage = ['Falha na comunicação com o servidor'];
    }
}
