import React from 'react'
import {Link} from 'react-router-dom'

const SearchData = ({ictihatDocs, loading}) => {
    if(loading){
        return <h2>Loading...</h2>
    }
    return (
        <ul className='list-group mb-4'>
            {ictihatDocs.docs.map(doc => (
                <Link to={`/docs/${doc.karar_id}`} key={doc.karar_id} className='list-group-item'>
                    {doc.baslik}
                </Link>
            ))}
        </ul>
    )
}

export default SearchData;