import request from '../../utils/request';

export async function makeRequestSearch({ pageSize, pageIndex, content }) {
  const body = {
    PageIndex: pageIndex,
    PageSize: pageSize,
  };
  return (await request({
    method: 'post',
    url: `ProductApi/GetProductList`,
    data: body,
  })).data;
}
