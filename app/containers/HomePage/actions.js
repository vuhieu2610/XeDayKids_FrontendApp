import request from '../../utils/request';

export async function makeRequestGetHomeData() {
  return (await request({
    url: '/HomeApi/Get',
    method: 'POST',
  })).data;
}

export async function makeRequestGetProductByCategory(categoriesId) {
  return (await request({
    url: '/HomeApi/GetProducts',
    method: 'POST',
    data: {
      Item: categoriesId,
      PageSize: 20,
      PageIndex: 1,
    },
  })).data;
}
