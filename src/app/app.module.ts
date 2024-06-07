import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoginComponent } from './components/ui/user/login/login.component';
import { ContactInfoComponent } from './components/shared/navbar/contact-info/contact-info.component';
import { NavbarLinkComponent } from './components/shared/navbar/navbar-link/navbar-link.component';
import { CartIconComponent } from './components/shared/navbar/cart-icon/cart-icon.component';
import { CategoriesComponent } from './components/ui/categories/categories.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { EditCategoriesComponent } from './components/ui/categories/edit-categories/edit-categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormWithNameComponent } from './components/ui/form-with-name/form-with-name.component';
import { CreateCategoriesComponent } from './components/ui/categories/create-categories/create-categories.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
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
import { CategoryUseCase } from './domain/usecases/category/category.usecase';
import { TypeExpenseGateway } from './domain/models/type-expense/gateway/type-expense.gateway';
import { TypeExpenseUseCase } from './domain/usecases/type-expense/type-expense.usecase';
import { ExpenseGateway } from './domain/models/expense/gateway/expense.gateway';
import { ExpenseUseCase } from './domain/usecases/expense/expense.usecase';
import { AddresCardComponent } from './components/shared/footer/addres-card/addres-card.component';
import { ExpenseModalComponent } from './components/shared/modals/expense-modal/expense-modal.component';
import { RegisterUserComponent } from './components/ui/user/register-user/register-user.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { TypeExpenseComponent } from './components/ui/type-expense/type-expense.component';
import { ExpenseComponent } from './components/ui/expense/expense.component';
import { ConfirmEmailComponent } from './components/ui/user/confirm-email/confirm-email.component';
import { CountriesComponent } from './components/ui/countries/countries.component';
import { StatesByCountryComponent } from './components/ui/countries/states-by-country/states-by-country.component';
import { CitiesByStateComponent } from './components/ui/countries/cities-by-state/cities-by-state.component';
import { AddCityComponent } from './components/ui/countries/add-city/add-city.component';
import { AddStateComponent } from './components/ui/countries/add-state/add-state.component';
import { EditCityComponent } from './components/ui/countries/edit-city/edit-city.component';
import { AuthInterceptor } from './security/helper/auth-interceptor';
import { EditUserComponent } from './components/ui/user/edit-user/edit-user.component';
import { WelcomeComponent } from './components/ui/welcome/welcome.component';
import { ResetPasswordComponent } from './components/ui/user/reset-password/reset-password.component';
import { EditProductFoodComponent } from './components/ui/recipes/edit-product-food/edit-product-food.component';
import { AddFoodsComponent } from './components/ui/recipes/add-foods/add-foods.component';
import { DrawerComponent } from './components/shared/drawer/drawer.component';
import { SearchComponent } from './components/shared/search/search.component';
import { CreateFoodsComponent } from './components/ui/recipes/create-foods/create-foods.component';
import { ChangePasswordComponent } from './components/ui/user/change-password/change-password.component';
import { FoodsDetailsComponent } from './components/ui/recipes/foods-details/foods-details.component';
import { EditRawMaterialComponent } from './components/ui/recipes/edit-raw-material/edit-raw-material.component';
import { AddRawMaterialsComponent } from './components/ui/recipes/add-raw-materials/add-raw-materials.component';
import { ProductGateway } from './domain/models/product/gateway/product.gateway';
import { ProductUseCase } from './domain/usecases/product/product.usecase';
import { ProductComponent } from './components/ui/product/product.component';
import { ProductCardComponent } from './components/ui/product/product-card/product-card.component';
import { ProductDetailComponent } from './components/ui/product/product-detail/product-detail.component';
import { CartComponent } from './components/ui/cart/cart.component';
import { CartItemComponent } from './components/ui/cart/cart-item/cart-item.component';
import { CartSummaryComponent } from './components/ui/cart/cart-summary/cart-summary.component';
import { GetOrderComponent } from './components/ui/get-order/get-order.component';
import { OrderManipulationComponent } from './components/ui/order-manipulation/order-manipulation.component';
import { OrderDetailComponent } from './components/ui/order-manipulation/order-detail/order-detail.component';
import { OrderManipulationWaiterComponent } from './components/ui/order-manipulation/order-manipulation-waiter/order-manipulation-waiter.component';
import { ProductService } from './infraestructure/product/product.service';
import { CategoryService } from './infraestructure/category/category.service';
import { ExpenseService } from './infraestructure/expense/expense.service';
import { TypeExpenseService } from './infraestructure/type-expense/type-expense.service';
import { CreateRecipeComponent } from './components/ui/recipes/create-recipe/create-recipe.component';
import { EditRecipeComponent } from './components/ui/recipes/edit-recipe/edit-recipe.component';


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

const productCreaterUseCaseFactory = (productGateway : ProductGateway) => new ProductUseCase(productGateway);
export const productCreaterUseCaseProvider = {
  provide: ProductGateway,
  useFactory: productCreaterUseCaseFactory,
  deps: [ProductGateway]
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ContactInfoComponent,
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
    RecipesDetailsComponent,
    CreateRecipeComponent,
    EditRecipeComponent,
    TypeExpenseComponent,
    AddresCardComponent,
    ExpenseComponent,
    ExpenseModalComponent,
    LoginComponent,
    ModalComponent,
    RegisterUserComponent,
    ConfirmEmailComponent,
    ResetPasswordComponent,
    CountriesComponent,
    StatesByCountryComponent,
    CitiesByStateComponent,
    AddCityComponent,
    AddStateComponent,
    EditCityComponent,
    EditUserComponent,
    EditRawMaterialComponent,
    AddFoodsComponent,
    SearchComponent,
    WelcomeComponent,
    EditProductFoodComponent,
    DrawerComponent,
    CreateFoodsComponent,
    ChangePasswordComponent,
    FoodsDetailsComponent,
    AddRawMaterialsComponent,
    ProductComponent,
    ProductCardComponent,
    ProductDetailComponent,
    CartComponent,
    CartItemComponent,
    CartSummaryComponent,
    GetOrderComponent,
    OrderManipulationComponent,
    OrderDetailComponent,
    OrderManipulationWaiterComponent
    
    
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
    productCreaterUseCaseProvider, {provide:ProductGateway, useClass: ProductService},
    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi:true},
    provideHttpClient(),
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
