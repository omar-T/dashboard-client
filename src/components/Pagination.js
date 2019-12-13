import React from 'react'
// import $ from 'jquery'

const Pagination = ({numFound, page, handleClickedPage}) => {
    const pageNumbers = [];
    
    for(let i = 1; i <= Math.ceil(numFound / 10); i++){
        pageNumbers.push(i);
    }
    
    const renderPageNumbers = pageNumbers.map(number => {
        const style = {
            color: 'white',
            backgroundColor: '#007bff'
        };
        let classes = page === number ? style : {};
        if (number === 1 || number === numFound || (number >= page - 10 && number <= page + 10)) {
            return (
                <li key={number} onClick={() => handleClickedPage(number)}>
                    <button className='page-link' style={classes}>{number}</button>
                </li>
            );
        }
        return 1;
    });

    return (
        <ul className='pagination justify-content-center'>
            <li onClick={() => handleClickedPage(page > 1 ? page - 1 : 1)}>
                <button className='page-link'>&laquo;</button>
            </li>
            {renderPageNumbers}
            <li onClick={() => handleClickedPage(page < pageNumbers.length ? page + 1 : pageNumbers.length)}>
                <button className='page-link'>&raquo;</button>
            </li>
        </ul>
    )
}

export default Pagination;