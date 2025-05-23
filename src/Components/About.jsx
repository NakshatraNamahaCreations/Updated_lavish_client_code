import React from 'react'
import banner from "../assets/banner/aboutbanner.png"

const About = () => {

    return (
        <div className='lg:pt-24 pt-28 mx-auto'>
            <div className='relative mx-auto w-full lg:h-[500px] '>
                <img src={banner} className='w-full h-full object-cover' />
                <div className='w-56 md:w-auto absolute top-1/2 transform -translate-y-1/2 lg:right-48 right-0 text-center playfair-display  text-white md:space-y-6'>
                    <p className='md:text-7xl [text-shadow:_-4px_2px_2px_#AA6300] '> Lavish Eventzz </p>
                    <p className='md:text-4xl italic'>Spread the Smile </p>
                    <p className='md:text-xl'> Life’s Best Moments, Beautifully Planned</p>
                    
                </div>
            </div>
            <div className='md:w-3/4 mx-auto md:py-20 py-10 px-6 md:px-0 '>
                <h1 className='text-center playfair-display md:text-5xl text-3xl font-semibold md:py-6 pb-4'>About us</h1>
                <p className='md:text-2xl text-justify poly'>Welcome to Lavish Eventzz, where we bring your dreams to life with stunning event decorations. Our passion for creating unforgettable experiences drives us to design and deliver exceptional decor for every occasion. Whether it's a grand wedding, a corporate gathering, a birthday party, or a private celebration, we specialize in crafting unique and personalized setups that reflect your vision. From elegant floral arrangements to thematic stage designs, we pay attention to every detail to ensure your event is nothing short of spectacular. At Lavish Eventzz, we blend creativity and precision to transform ordinary spaces into extraordinary venues. Our dedicated team works closely with you to understand your preferences, ensuring every element aligns with your expectations. With a commitment to excellence and innovation, we strive to create memories that last a lifetime. Trust Lavish Eventzz to elevate your special moments with sophistication, style, and charm. Let us help you turn your celebrations into timeless treasures!</p>
            </div>
        </div>
    )
}

export default About