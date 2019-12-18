import React from 'react'

const SearchData = ({loading, foundDocs, type, isChanged, history}) => {
    console.log(loading);
    if(loading){
        return <h2>Loading...</h2>
    }

    const handleClick = (doc, docId) => {
        history.push(`/docs/${docId}`, {
            doc,
            type
        });
    }
    console.log(foundDocs);
    if(foundDocs.numFound !== 0 && !isChanged){
        return (
            <ul className='list-group mb-3'>
                {foundDocs.docs.map(doc => (
                    type === 'ictihat' ?
                    <li key={doc.karar_id} className='list-group-item font-weight-bold mb-2'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='float-right'>
                                    <button onClick={handleClick.bind(this, doc, doc.karar_id)} className='btn btn-info float-right'>
                                        View Details
                                    </button>
                                </div>
                                <p>{doc.baslik}</p>
                            </div>
                        </div>
                    </li> : 
                    <li key={doc.kanun_id} className='list-group-item font-weight-bold mb-2'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='float-right'>
                                    <button onClick={handleClick.bind(this, doc, doc.kanun_id)} className='btn btn-info float-right'>
                                        View Details
                                    </button>
                                </div>
                                <p>{doc.mevzuat_name}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }else if(isChanged){
        return (
            <div style={{color: 'red'}}>Please Press Enter To Start The Search</div>
        )
    }
    return (
        <div>No Docs Found</div>
    )
}

export default SearchData;