import React from 'react'
import WishlistCard from './WishlistCard'
import SpecialOfferCard from './SpecialOfferCard'
import ServiceCardstatic from './ServiceCardstatic'

const Wishlist = () => {

    return (
        <div className='lg:p-2 lg:pt-24 pt-32 p-4 mx-auto'>
            <h1 className='text-3xl text-center font-bold  py-6'>Your wishlist</h1>
            <div className='flex md:space-x-16 lg:gap-8 flex-wrap md:justify-center justify-between  '>
                <WishlistCard />
                <WishlistCard />
                <WishlistCard />
                <WishlistCard />
            </div>
            <h1 className=' text-3xl  font-bold py-10 md:px-12 px-4 lg:px-10 '>Most Popular</h1>
            <div className='flex md:space-x-16 lg:gap-8 flex-wrap md:justify-center justify-between  '>
                <ServiceCardstatic />
                <ServiceCardstatic />
                <ServiceCardstatic />
                <ServiceCardstatic />
            </div>
            <h1 className='text-3xl font-bold py-10 md:px-12 px-4 lg:px-10'>Special Offer</h1>
            <div className='flex md:space-x-16 lg:gap-8 flex-wrap md:justify-center justify-between  '>

                <SpecialOfferCard />
                <SpecialOfferCard />
                <SpecialOfferCard />
                <SpecialOfferCard />

            </div>

        </div>
    )
}

export default Wishlist