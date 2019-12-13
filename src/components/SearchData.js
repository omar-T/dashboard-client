import React from 'react'

const SearchData = ({ictihatDocs, loading, history}) => {
    if(loading){
        return <h2>Loading...</h2>
    }

    const handleClick = (doc) => {
        history.push(`/docs/${doc.karar_id}`, {
            doc
        });
    }

    return (
        <ul className='list-group mb-3'>
            {ictihatDocs.docs.map(doc => (
                <li key={doc.karar_id} className='list-group-item font-weight-bold mb-2'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='float-right'>
                                <button onClick={handleClick.bind(this, doc)} className='btn btn-info float-right' data-toggle="collapse" data-target={`#collapseDoc_${doc.karar_id}`} aria-expanded="false" aria-controls="collapseExample">
                                    View Details
                                </button>
                            </div>
                            <p>{doc.baslik}</p>
                        </div>
                    </div>
                    {/* <div className='collapse' id={`collapseDoc_${doc.karar_id}`}>
                        <div className='card'>
                            <div className='card-body'>
                                {doc.baslik}
                            </div>
                        </div>
                    </div> */}
                </li>
            ))}
        </ul>
    )
}

export default SearchData;