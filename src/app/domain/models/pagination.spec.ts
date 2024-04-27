import { BuildPagination } from './pagination';

describe('Pagination', () => {
  it('should create an instance', () => {
    expect(BuildPagination.build('',2,3)).toBeTruthy();
  });
});
