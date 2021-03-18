import { TestBed } from '@angular/core/testing';

import { ProductCategoryMenuService } from './product-category-menu.service';

describe('ProductCatrgoryMenuService', () => {
  let service: ProductCategoryMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCategoryMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
