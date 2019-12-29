import React from 'react'
import {Link} from 'react-router-dom'

const SearchData = ({loading, foundDocs, type}) => {
    // console.log(loading);
    if(loading){
        return <h2>Loading...</h2>
    }

    // console.log('found docs ', foundDocs);
    if(foundDocs.numFound !== 0){
        return (
            <ul className='list-group mb-3'>
                {foundDocs.docs.map(doc => (
                    type === 'ictihat' ?
                    <li key={doc.karar_id} className='list-group-item font-weight-bold mb-2'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='float-right'>
                                    <Link 
                                        className='btn btn-info float-right'
                                        to={{
                                            pathname: `/docs/${doc.karar_id}`,
                                            state: {
                                                doc,
                                                type
                                            }
                                        }}
                                    >
                                        View Details
                                    </Link>
                                </div>
                                <p>{doc.baslik}</p>
                            </div>
                        </div>
                    </li> : 
                    <li key={doc.kanun_id} className='list-group-item font-weight-bold mb-2'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='float-right'>
                                    <Link 
                                        className='btn btn-info float-right'
                                        to={{
                                            pathname: `/docs/${doc.kanun_id}`,
                                            state: {
                                                doc,
                                                type
                                            }
                                        }}
                                    >
                                        View Details
                                    </Link>
                                </div>
                                <p>{doc.mevzuat_name}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }
    return (
        <div>No Docs Found</div>
    )
}

export default SearchData;