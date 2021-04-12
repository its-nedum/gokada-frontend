import React from 'react'

const ParcelDetails = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <form className="card pl-4 mt-1 mb-3" >
                        <div className="row cost_dist">
                            <div className="cost">
                                <strong>&#8358;1,500</strong>
                            </div>
                            <div className="distance">
                                <strong>3.3Km | 24 mins</strong>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center mb-2 mt-2">
                                <input type="submit" className="btn btn-success" value="Enter Parcel Details" />
                            </div> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ParcelDetails
// col-12 text-center mt-2