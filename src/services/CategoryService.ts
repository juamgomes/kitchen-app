import HttpService from './HttpService'

export interface Category {
  id?: number
  name: string
}

const URL = '/categories'

export const CategoryService = {
  getAll: async (): Promise<Category[]> => (await HttpService.get(URL)).data,
  create: async (category: Category): Promise<Category> =>
    (await HttpService.post(URL, category)).data
}
