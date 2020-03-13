import request from '../../utils/request';

export async function makeRequestSearch({
  pageSize,
  pageIndex,
  content,
  sortBy,
}) {
  const body = {
    PageIndex: pageIndex,
    PageSize: pageSize,
    SortBy: sortBy,
    Filters: [
      {
        field: 'Name',
        op: `&like('%str'`,
        value: content,
      },
      {
        field: 'ShortName',
        op: `||like'%str%')`,
        value: content,
      },
    ],
  };
  return (await request({
    method: 'post',
    url: `ProductApi/GetProductList`,
    data: body,
  })).data;
}
