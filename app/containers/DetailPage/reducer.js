/*
 *
 * DetailPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  ProductId: 0,
  ProductCode: '',
  ShortName: 'Xe Đẩy Trẻ Em Gấp Gọn Baobaohao QZ1 - Xám',
  Price: '',
  BuyerCount: '',
  RatePerMinute: 0,
  Metatitle: '',
  CatergoryId: 0,
  Images: [
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/s/e/set-dem-ngu-co-trung-lolbaby-big-moon_1.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/d/e/dem-ngu-lam-mat-co-lon-dot-penguin_1.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/s/e/set-2-chan-gac-lolbaby_1.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201605051604chan-luoi-chong-ngat-xanh-thai-lan-4kisd-100x150-800847_1.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201808312137goi-chong-bet-dau-babymoov-lovenest-maughi-bm14299-01_1.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201806181953goi-cao-su-lien-a-103223-1_1.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201801101454goi-lom-cao-su-lien-a-103174_1.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201904252221goi-chong-bep-dau-cuu-hong-bibos-119884_1.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201905231936goi-chan-bong-han-quoc_1.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201901031724ghe-rung-mau-hong_1.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/n/o/noi-tu-dong-_mastela-cao-cap-01.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201512101459106436-noi-autoru-3-sao_1.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201609261924cui-go-cao-cap-113892-4_1.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/g/i/giuong-bumper-soi-tre-lolbaby-rainy-cloud-2_1_1.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/-/1/-1man-chong-muoi-lolbaby_2.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct2015033120203.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/s/e/set-ngu-trua-soi-tre-lolbaby-golden-puppy-5_1.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/t/h/tham-soi-tre-lolbaby-rabbit-grey.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/g/o/goi-3d-lam-mat-dot-penguin_1.jpg'
    },
    {
      src:
        'https://bibomart.com.vn/media/catalog/product/cache/8619f7f906915ea6d91fa39ca3b3a403/h/t/httpsmedia.bibomart.netubbmproduct201801101459goi-cao-su-chong-ngat-kuku-103331_1.jpg'
    }
  ],
  Attributes: [],
  Quantity: 0,
  Rating: 0,
  RatingCount: 0,
  Description: `<div>
  <div class="product attribute description">
  <div class="value"><div style="text-align: justify;"> <strong><a target="_blank" href="https://bibomart.com.vn/binh-sua.html">Bình sữa</a> Chuchu Baby cổ nhỏ </strong>240ml mang đến cho bé thiết kế độc đáo Crosscut - lỗ ty hình chữ thập không những giúp bé dễ dàng điều tiết lưu lượng <a target="_blank" href="https://bibomart.com.vn/sua-bot-cac-loai.html" title="sữa" class="desctiption-tag-link">sữa</a> theo lực mút để phù hợp với từng nhu cầu bú ở từng giai đoạn mà còn ngăn ngừa tình trạng sặc sữa, trào sữa hiệu quả khi bú. Đồng thời, chất liệu nhựa PPSU và silicon cao cấp, an toàn cũng sẽ khiến bố mẹ an tâm khi cho bé sử dụng mỗi ngày. <a target="_blank" href="https://bibomart.com.vn/binh-sua.html" title="bình sữa" class="desctiption-tag-link">Bình sữa</a> sẽ là một lựa chọn hoàn hảo của mẹ để mang đến những bữa ăn ngon miệng và thoải mái nhất cho bé, giúp bé phát triển toàn diện.</div><div> <div style="text-align: center;"> <img lazy="" src="https://bibomart.com.vn/media/catalog/product/images/editor/images/binh-sua-ChuChu-co-nho-PPSU-240ml-108144.jpg" data-original="https://bibomart.com.vn/media/catalog/product/images/editor/images/binh-sua-ChuChu-co-nho-PPSU-240ml-108144.jpg" alt="binh-sua-ChuChu-co-nho-PPSU-240ml-108144" style="width: 410px; height: 410px;"></div> <div style="text-align: center;"> <em><span style="text-align: justify;"><a target="_blank" href="https://bibomart.com.vn/binh-sua.html" title="bình sữa" class="desctiption-tag-link">Bình sữa</a> Chuchu Baby cổ nhỏ</span></em></div> <div style="text-align: center;"> &nbsp;</div> <div style="text-align: center;"> &nbsp;</div> <h3 style="text-align: justify;"> <strong><span style="text-align: justify;">Đặc điểm nổi bật của sản phẩm</span></strong></h3> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> <em><strong>Chất liệu an toàn</strong></em></div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> -&nbsp;<u>Bình sữa Chuchu Baby&nbsp;cổ nhỏ</u> được làm từ chất liệu nhựa PPSU cao cấp, không chứa BPA hay các chất độc hại khác nên tuyệt đối an toàn với sức khỏe của trẻ nhỏ. Chất liệu nhựa có độ chịu lực và chịu nhiệt cao mang tới độ bền đẹp theo thời gian sử dụng.</div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> - Núm ty với chất liệu silicon cao cấp, không mùi, siêu mềm với độ đàn hồi cao hoàn toàn êm dịu và nhẹ nhàng cho nướu lợi của bé.</div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> <em><strong>Thiết kế Crosscut thông minh</strong></em></div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> - Núm ty Chuchu Baby là sản phẩm đầu tiên trên thế giới có thiết kế Crosscut độc đáo (chữ thập), bé phải ngậm sâu núm ty thì lỗ sữa mới mở ra và tiết sữa theo ý muốn nên tạo cảm giác giống như bé bú mẹ.</div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> - Ở trạng thái bình thường lỗ sữa khép kín nên dù bình sữa có bị đổ, sữa cũng không chảy ra ngoài. Đồng thời khi bé bú sẽ không còn hiện tượng sữa chảy xuống mặt, mũi bé.</div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> - Lượng sữa chảy ra tùy thuộc vào lực mút của bé, do đó núm ty không những chống sặc hiệu quả mà còn mang lại sự tiết kiệm chi phí tối đa khi mà giờ đây, mẹ sẽ không cần phải thay các size S - M - L cho núm ty khi núm ty đang dùng vẫn còn mới. Mẹ yên tâm rằng nhu cầu và tốc độ bú của bé sẽ luôn được đáp ứng. Đây là điều đem đến sự mới lạ và độc đáo cho những sản phẩm bình sữa và núm ty của Chuchu Baby.</div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> - Núm ty với kiểu dáng đầu ty tròn đầy, mang đến cảm giác thoải mái, dễ chịu và an tâm khi bé bú, ngay cả đối với những bé mới chuyển sang giai đoạn bú bình.</div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> <em><strong>Van thông khí chống đầy hơi</strong></em></div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> Ngoài thiết kế lỗ ty độc đáo, núm ty Chuchu Baby còn có van thoát khí thông minh ngăn chặn tối đa lượng không khí thừa đi vào bụng bé, từ đó hạn chế hiệu quả hiện tượng đầy hơi, trướng bụng, ợ chua,...dẫn đến đau bụng, nôn trớ sau khi bú.</div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> <em><strong>Thuận tiện sử dụng</strong></em></div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> - Thân bình thon gọn, vừa tay cầm với bề mặt nhựa chống trơn trượt giúp mẹ cầm giữ bình dễ dàng và chắc chắn hơn khi cho bé ăn.</div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> - Vạch chia dung tích in rõ ràng trên thân bình dễ dàng để mẹ theo dõi lượng sữa bé bú cũng như thao tác pha&nbsp;<a target="_blank" href="https://bibomart.com.vn/sua-bot-cac-loai.html" title="sữa cho bé" class="desctiption-tag-link">sữa cho bé</a>.</div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> - Nắp đậy vệ sinh tiện lợi cất giữ, bảo quản và mang theo bình khi bé cùng cả nhà ra ngoài.</div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> - Chất liệu nhựa cao cấp dễ dàng, nhanh chóng vệ sinh, làm sạch. Bình an toàn khi tiệt trùng bằng nước sôi hay các dung dịch tẩy rửa bình sữa chuyên dùng. Sản phẩm đi kèm một dụng cụ thông lỗ giúp mẹ vệ sinh núm ty đúng cách và toàn diện hơn.</div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> - Kiểu dáng đáng yêu cùng họa tiết chú chim cánh cụt ngộ nghĩnh sẽ mang tới những giờ phút ăn uống thật ngon miệng và thích thú cho bé.</div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> Bình có dung tích 240ml phù hợp với nhu cầu bú nhiều hơn của bé.</div> <div style="text-align: justify;"> &nbsp;</div> <div style="text-align: justify;"> Kích thước sản phẩm: 5.5 x 5.5 x 19cm</div></div><p> &nbsp;</p></div>
  </div>
  <div class="description-show-more">
  <span class="see-all-text">Xem tất cả</span>
  <span class="collapse-text">Thu gọn</span>
  </div>
  </div>`
};

/* eslint-disable default-case, no-param-reassign */
const detailPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default detailPageReducer;
