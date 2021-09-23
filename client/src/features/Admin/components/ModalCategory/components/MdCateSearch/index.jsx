import React, { useRef, useState } from 'react';

const MdCateSearch = (props) => {
    const { handleRemoveText, hanldeSearchProduct } = props;
    const typingTimeoutRef = useRef(null);
    const [searchCategory, setsearchCategory] = useState('');

    const handleChangeSearch = (e) => {
        const value = e.target.value;
        setsearchCategory(value);

        if(typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            hanldeSearchProduct(value);
        }, 600);
    }

    const onRemoveText = () => {
        setsearchCategory('');
        handleRemoveText();
    }

    return (
        <div className="search-category">
            <i className="fal fa-search"></i>
            <form className="search-wrapper">
                <input 
                    autoComplete="off"
                    type="text" 
                    name="searchCategory" 
                    placeholder="Tìm kiếm sản phẩm theo tên..." 
                    value={searchCategory} 
                    onChange={(e) => handleChangeSearch(e)}
                />
            </form>
            {searchCategory ? 
                <div className="btn-remove" onClick={() => onRemoveText()}>
                    <i className="fal fa-times-circle"></i>
                </div> : ''
            }
        </div>
    );
};


MdCateSearch.propTypes = {

};


export default MdCateSearch;
