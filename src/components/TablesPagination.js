import React from 'react'

const TablesPagination = props => {
    const {pages, currentPage, onClick} = props;

    let i = currentPage > 5 ? currentPage - 4 : 1;
    let paginationList = [];
    i !== 1 && paginationList.push(
        <li key={i - 1} className='page-item disabled'>
            <button className='page-link btn-sm'>
                ...
            </button>
        </li>
    );

    for(; (i <= currentPage + 4) && (i <= pages); i++){
        if(i === currentPage){
            paginationList.push(
                <li key={i} className='page-item disabled'>
                    <button className='page-link btn-sm'>{i}</button>
                </li>
            );
        }else{
            paginationList.push(
                <li key={i}>
                    <button className='page-link btn-sm' onClick={onClick.bind(this, i)}>{i}</button>
                </li>
            );
        }
        if((i === currentPage + 4) && (i < pages)){
            paginationList.push(
                <li key={i + 1} className='page-item disabled'>
                    <button className='page-link btn-sm'>...</button>
                </li>
            );
        }
    }

    return (
        <nav aria-label='Page navigation'>
            {pages && pages > 0 && 
                <ul className='pagination justify-content-center'>
                    {currentPage === 1 ? 
                        <li className='page-item disabled'>
                            <button className='page-link btn-sm'>
                                First
                            </button>
                        </li>  
                        : 
                        <li>
                            <button className='page-link btn-sm' onClick={onClick.bind(this, '')}>
                                First
                            </button>
                        </li>
                    }
                    {currentPage === 1 ? 
                        <li className='page-item disabled'>
                            <button className='page-link btn-sm'>
                                «
                            </button>
                        </li>  
                        : 
                        <li>
                            <button className='page-link btn-sm' onClick={onClick.bind(this, currentPage - 1)}>
                                «
                            </button>
                        </li>
                    }

                    {paginationList.length !== 0 &&
                        paginationList
                    }

                    {currentPage === pages ? 
                        <li className='page-item disabled'>
                            <button className='page-link btn-sm'>
                                »
                            </button>
                        </li>  
                        : 
                        <li>
                            <button className='page-link btn-sm' onClick={onClick.bind(this, currentPage + 1)}>
                                »
                            </button>
                        </li>
                    }
                    {currentPage === pages ? 
                        <li className='page-item disabled'>
                            <button className='page-link btn-sm'>
                                Last
                            </button>
                        </li>  
                        : 
                        <li>
                            <button className='page-link btn-sm' onClick={onClick.bind(this, pages)}>
                                Last
                            </button>
                        </li>
                    }
                </ul>
            }
        </nav>
    )
}

export default TablesPagination;