import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoginComponent } from './components/ui/login/login.component';
import { ContactInfoComponent } from './components/shared/navbar/contact-info/contact-info.component';
import { RegisterComponent } from './components/ui/register/register.component';
import { NavbarLinkComponent } from './components/shared/navbar/navbar-link/navbar-link.component';
import { CartIconComponent } from './components/shared/navbar/cart-icon/cart-icon.component';
import { CategoriesComponent } from './components/ui/categories/categories.component';
import { HttpClientModule } from '@angular/common/http';
import { EditCategoriesComponent } from './components/ui/categories/edit-categories/edit-categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormWithNameComponent } from './components/ui/form-with-name/form-with-name.component';
import { CreateCategoriesComponent } from './components/ui/categories/create-categories/create-categories.component';
import { PaginationComponent } from './components/ui/pagination/pagination.component';
import { StockcommercialproductsComponent } from './components/ui/stockcommercialproducts/stockcommercialproducts.component';
import { EditstockcommercialproductsComponent } from './components/ui/stockcommercialproducts/editstockcommercialproducts/editstockcommercialproducts.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { CreatetockcommercialproductsComponent } from './components/ui/stockcommercialproducts/createtockcommercialproducts/createtockcommercialproducts.component';
import { StockRawMaterialsComponent } from './components/ui/stock-raw-materials/stock-raw-materials.component';
import { EditStockRawMaterialsComponent } from './components/ui/stock-raw-materials/edit-stock-raw-materials/edit-stock-raw-materials.component';
import { CreateStockRawMaterialsComponent } from './components/ui/stock-raw-materials/create-stock-raw-materials/create-stock-raw-materials.component';
import { RecipesComponent } from './components/ui/recipes/recipes.component';
import { RecipesDetailsComponent } from './components/ui/recipes/recipes-details/recipes-details.component';
import { CategoryGateway } from './domain/models/category/gateway/category.gateway';
import { CategoryService } from './infraestructure/category/category.service';
import { CategoryUseCase } from './domain/usecases/category/category.usecase';
import { TypeExpenseGateway } from './domain/models/type-expense/gateway/type-expense.gateway';
import { TypeExpenseUseCase } from './domain/usecases/type-expense/type-expense.usecase';
import { TypeExpenseService } from './infraestructure/type-expense/type-expense.service';
import { ExpenseGateway } from './domain/models/expense/gateway/expense.gateway';
import { ExpenseUseCase } from './domain/usecases/expense/expense.usecase';
import { ExpenseService } from './infraestructure/expense/expense.service';
import { ModalFormWithNameComponent } from './components/ui/modal-form-with-name/modal-form-with-name.component';
import { AddresCardComponent } from './components/shared/footer/addres-card/addres-card.component';
import { CategoriesComponent } from './components/ui/categories/categories.component';
import { TypeExpenseComponent } from './components/ui/type-expense/type-expense.component';
import { DomainModule } from './domain/domain.module';
import { ExpenseComponent } from './components/ui/expense/expense.component';
import { ExpenseModalComponent } from './components/shared/modals/expense-modal/expense-modal.component';

const categoryCreaterUseCaseFactory = (categoryGateway : CategoryGateway) => new CategoryUseCase(categoryGateway);
export const categoryCreaterUseCaseProvider = {
  provide: CategoryGateway,
  useFactory: categoryCreaterUseCaseFactory,
  deps: [CategoryGateway]
}
const typeExpenseCreaterUseCaseFactory = (typeExpenseGateway : TypeExpenseGateway) => new TypeExpenseUseCase(typeExpenseGateway);
export const typeExpenseCreaterUseCaseProvider = {
  provide: TypeExpenseGateway,
  useFactory: typeExpenseCreaterUseCaseFactory,
  deps: [TypeExpenseGateway]
}

const expenseCreaterUseCaseFactory = (expenseGateway : ExpenseGateway) => new ExpenseUseCase(expenseGateway);
export const expenseCreaterUseCaseProvider = {
  provide: ExpenseGateway,
  useFactory: expenseCreaterUseCaseFactory,
  deps: [ExpenseGateway]
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ContactInfoComponent,
    RegisterComponent,
    NavbarLinkComponent,
    CartIconComponent,
    CategoriesComponent,
    EditCategoriesComponent,
    FormWithNameComponent,
    CreateCategoriesComponent,
    PaginationComponent,
    StockcommercialproductsComponent,
    EditstockcommercialproductsComponent,
    LoadingComponent,
    CreatetockcommercialproductsComponent,
    StockRawMaterialsComponent,
    EditStockRawMaterialsComponent,
    CreateStockRawMaterialsComponent,
    RecipesComponent,
    RecipesDetailsComponent
    TypeExpenseComponent,
    AddresCardComponent,
    ExpenseComponent,
    ExpenseModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [categoryCreaterUseCaseProvider,{provide:CategoryGateway, useClass: CategoryService},
    typeExpenseCreaterUseCaseProvider, {provide:TypeExpenseGateway, useClass:TypeExpenseService},
    expenseCreaterUseCaseProvider, {provide: ExpenseGateway, useClass:ExpenseService},
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
