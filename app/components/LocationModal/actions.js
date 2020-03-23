import request from '../../utils/request';

export async function makeRequestDistrict(provinceCode) {
  return (await request({
    url: `/District/GetByProvinceCode?ProvinceCode=${provinceCode}`,
    method: 'POST',
  })).data;
}
