import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../shared/category.service';
import {CategoryModel} from '../shared/category.model';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

    categories: CategoryModel[] = [];

    constructor(
        private categoryService: CategoryService
    ) {
    }

    ngOnInit() {
        this.categoryService.getAll().subscribe((categories) => {
            this.categories = categories;
        }, (error) => {
            alert(error);
        });
    }

    deleteCategory(category) {
        const mustDelete = confirm('Deseja deletar ?');

        if (mustDelete) {
            this.categoryService.delete(category.id).subscribe(() =>
                this.categories = this.categories.filter(element => element !== category)
            );
        }

    }

}
