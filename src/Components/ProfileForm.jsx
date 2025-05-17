import React from 'react'

const ProfileForm = () => {
    return (
        <div>
            <form>
                <h1 className='font-bold poppins my-6'>Profile Details</h1>
                <div className='grid grid-cols-2'>
                    <label>
                        <p>First Name</p>
                        <input type="text" className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]' />
                    </label>
                    <label>
                        <p>Last Name</p>
                        <input type="text" className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]' />
                    </label>
                    <label>
                        <p>Mobile Number</p>
                        <input type="text" className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]' />
                    </label>
                    <label>
                        <p>Alternate Number</p>
                        <input type="text" className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]' />
                    </label>
                </div>


                <h1 className='font-bold poppins my-6'>Address Details</h1>
                <div className='grid grid-cols-2'>
                    <label>
                        <p>Address Line 1</p>
                        <input type="text" className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]' />
                    </label>
                    <label>
                        <p>Address Line 2</p>
                        <input type="text" className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]' />
                    </label>
                    <label>
                        <p>City</p>
                        <input type="text" className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]' />
                    </label>
                    <label>
                        <p>State</p>
                        <input type="text" className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]' />
                    </label>
                    <label>
                        <p>Pincode</p>
                        <input type="text" className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]' />
                    </label>
                    <label>
                        <p>Landmark (Optional)</p>
                        <input type="text" />
                    </label>
                </div>
                <input type='submit'  className='bg-[#AA6300] text-white px-4 py-2 rounded mt-5' value="Save" />
            </form>

        </div>
    )
}

export default ProfileForm