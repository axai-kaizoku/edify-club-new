import React from 'react'

const OrderItem = ({item}:{item:any}) => {
  return (
    <div className='border border-[#DEDEDE] rounded-[10.5px] flex p-2 gap-3'>
        <div className='rounded-[5.833px] bg-[#F7F8FA] py-3 px-1.5'>
            <img src={item?.images[0][0]?.url} alt="product image" width={69} height={51} />
        </div>
        <div className='flex-grow flex flex-col justify-between'>
            <div className='flex justify-between items-center'>
                <span className='font-gilroySemiBold text-base text-black'>{item?.custom_model[0]}</span> 
                <div>
                    <span className='text-xs text-[#C5C5C5] font-gilroySemiBold'>1x </span>
                    <span className='text-black font-gilroySemiBold'>₹ {item?.payable}</span>
                </div>
            </div>

            <div className='text-[#AFAFAF] text-sm font-gilroyMedium'>
                <span>{item.storage[0]} . </span>
                <span>{item.ram[0]} . </span>
                <span>{item.processor[0]}</span>
            </div>

            <div className='text-[#AFAFAF] text-sm font-gilroyMedium'>
                Black
            </div>
        </div>
    </div>
  )
}

export default OrderItem