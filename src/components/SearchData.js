import React from 'react'

const SearchData = ({ictihatDocs, loading}) => {
    if(loading){
        return <h2>Loading...</h2>
    }
    return (
        <ul className='list-group mb-4'>
            {ictihatDocs.docs.map(doc => (
                <li key={doc.karar_id} className='list-group-item'>
                    {doc.baslik}
                </li>
            ))}
        </ul>
    )
}

export default SearchData;