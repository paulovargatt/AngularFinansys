import {InMemoryDbService} from 'angular-in-memory-web-api';
import {CategoryModel} from './pages/categories/shared/category.model';

export class ApiInMemory implements InMemoryDbService {
    createDb() {
        const categories: CategoryModel[] = [
            {id: 1, name: 'Lazer', description: 'Cinema, parque, shopping'},
            {id: 2, name: 'Saúde', description: 'Remédios'},
            {id: 3, name: 'Salário', description: 'Mensal CLT'},
        ];

        return {categories};
    }
}