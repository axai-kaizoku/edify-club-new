import { Container } from '@/components/common/container'
import React from 'react'
import OrdersMain from '../_components/orders-main'

const OrdersDetailPage = ({params}:{params:{id:string}}) => {
  const {id} = params;
  return (
    <>
        <OrdersMain id={id}/>
    </>
  )
}

export default OrdersDetailPage