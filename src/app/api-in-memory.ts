import {InMemoryDbService} from 'angular-in-memory-web-api';
import {CategoryModel} from './pages/categories/shared/category.model';
import {EntryModel} from './pages/entries/shared/entry.model';

export class ApiInMemory implements InMemoryDbService {
    createDb() {
        const categories: CategoryModel[] = [
            {id: 1, name: 'Lazer', description: 'Cinema, parque, shopping'},
            {id: 2, name: 'Saúde', description: 'Remédios'},
            {id: 3, name: 'Salário', description: 'Mensal CLT'},
        ];

        const entries: EntryModel[] = [
            {
                id: 1,
                name: 'Gas',
                categoryId: categories[0].id,
                category: categories[0],
                paid: true,
                date: '14/10/2018',
                amount: '870,80',
                type: 'expense'
            } as EntryModel,  {
                id: 2,
                name: 'Salário',
                categoryId: categories[0].id,
                category: categories[0],
                paid: false,
                date: '18/10/2018',
                amount: '8900,90',
                type: 'revenue'
            } as EntryModel,
        ];

        return {categories, entries};
    }
}