import {CategoryModel} from '../../categories/shared/category.model';
import {BaseResourceModel} from '../../../shared/models/base-resource.model';

export class EntryModel extends BaseResourceModel {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public type?: string,
        public amount?: string,
        public date?: string,
        public paid?: boolean,
        public categoryId?: number,
        public category?: CategoryModel,
    ) {
        super();
    }

    static types = {
        expense: 'Despesa',
        renevue: 'Receita'
    };

    get paidText(): String {
        return this.paid ? 'Pago' : 'Pendente';
    }
}