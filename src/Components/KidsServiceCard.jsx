import React from 'react'
import theme from "../assets/services/theme.png"
import { Link } from 'react-router-dom'

const KidsServiceCard = ({ subId,subCatTitle, item }) => {
    return (
        <Link to={`/service/${subId}/${subCatTitle}/776`}  >
            <div>
                <img src={item.cardImg} alt="theme" />
                <p className='font-bold bricolage-grotesque text-center lg:text-3xl text-lg md:text-2xl py-4'>{item.serviceName}</p>
            </div>
        </Link>
    )
}

export default KidsServiceCard