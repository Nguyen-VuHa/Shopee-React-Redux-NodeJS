import React from 'react';
import { Container } from 'reactstrap';
import './productads.scss';

const ProductAds = () => {

    return (
        <>
            <div className="product-ads">
                <div className="pd-ads-item">
                    <div className="product-content">
                        <h4>SERUM LUMOS ACNE</h4>
                        <span>Nhận thấy nhu cầu về làm đẹp của khách hàng ngày càng gia tăng nhất là với việc chăm sóc da mặt. Lumos Acne là dòng mỹ phẩm được nhập khẩu từ Mỹ và được bộ Y tế cấp phép lưu hành sử dụng ở Việt Nam. Sản phẩm có thiết kế một lọ nhỏ tiện dụng, dễ mang theo và bảo quản. Ưu điểm lớn nhất của Lumos Acne chính là khả năng tương thích với nhiều loại da và chỉ số an toàn cao. Không kích ứng, không bong tróc, không phụ thuộc vào sản phẩm, tuyệt đối an toàn và lành tính là ưu điểm thứ hai.
                        </span>
                        <div className="btn btn-product">
                            Thêm vào giỏ
                        </div>
                    </div>
                </div>
                <div className="pd-ads-item">
                    <div className="product-image">
                        <img src="http://res.cloudinary.com/bibi-korea/image/upload/v1629473912/product_image/bvfg8nnulnf1qk2g0slu.jpg" alt="NotImage"/>
                    </div>
                </div>
                <div className="pd-ads-item">
                    <div className="product-image">
                        <img src="http://res.cloudinary.com/bibi-korea/image/upload/v1629473982/product_image/eizaatvdbbzid7xo6jls.jpg" alt="NotImage"/>
                    </div>
                </div>
                <div className="pd-ads-item">
                    <div className="product-content">
                        <h4>RONAS STEM CELL SOLUTION</h4>
                        <span>Tế bào gốc là loại tế bào mà chúng có khả năng tự sản sinh, biến hóa thành nhiều loại mô, tế bào hay các cơ quan khác nhau của cơ thể. Các tế bào này sẽ thay thế cho các tế bào tự nhiên bị già và mất đi hoặc do bệnh lý. Các nhà nghiên cứu đã ứng dụng chức năng của tế bào gốc tươi vào công nghệ làm đẹp, sử dụng các loại tế bào gốc thực vật, cùng với một số thành phần khác tạo thành một loại serum được sử dụng phổ biến trong chăm sóc da. Tế bào gốc Ronas được sản xuất bởi thương hiệu mỹ phẩm nổi tiếng Ronas Cosmetic, sản phẩm được kiểm duyệt chặt chẽ và đã được cấp giấy chứng nhận của châu Âu (CE), KFDA và ISO (tiêu chuẩn của Hàn Quốc).</span>
                        <div className="btn btn-product">
                            Thêm vào giỏ
                        </div>
                    </div>
                </div> 
            </div>
            <div className="trademark">
                <Container className="trademark-content">
                    <div className="trademark-item">
                        <div className="bg-item">
                            <img src="https://sieuthilamdep.com/images/companies/1/dep-da/te-bao-goc-ronas-stem-cell-solution-2.jpg?1577932365321" alt="NotImage"/>
                        </div>
                        <div className="shadow"></div>
                        <div className="content">
                            <span className="title">Ronas Stem Cell Solution</span>
                            <span className="title">BIBI COMESTIC</span>
                        </div>
                    </div>
                    <div className="trademark-item">
                        <div className="bg-item">
                            <img src="https://bibi-cosmetic-store.herokuapp.com/api/product/image/939c1194-3a2c-40ef-b05f-17be3548672b" alt="NotImage"/>
                        </div>
                        <div className="shadow"></div>
                        <div className="content">
                            <span className="title">Lumos ACNE</span>
                            <span className="title">BIBI COMESTIC</span>
                        </div>
                    </div>
                    <div className="trademark-item">
                        <div className="bg-item">
                            <img src="https://vanshop.com.vn/wp-content/uploads/2020/05/innis-cherry.jpg" alt="NotImage"/>
                        </div>
                        <div className="shadow"></div>
                        <div className="content">
                            <span className="title">Innisfree Jeju Cherry Blossom</span>
                            <span className="title">BIBI COMESTIC</span>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};


ProductAds.propTypes = {
   
};


export default ProductAds;
