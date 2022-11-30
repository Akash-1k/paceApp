export const OrderHistoryDetails = [
  {
    id: 3,
    url: require('../../assets/images/product3.png'),
    title: 'T900C Treadmill',
    status: 'Canceled',
    orderId: '0170903',
    options: 'Black  |  x1',
    price: '146',
  },
  {
    id: 1,
    url: require('../../assets/images/product.png'),
    title: 'Bershka Mom Jeans',
    status: 'Deliverd',
    orderId: '0706502',
    options: 'S - 26 | Blue | x1',
    price: '18',
  },
  {
    id: 2,
    url: require('../../assets/images/product1.png'),
    title: 'Pea Protein Isolate',
    status: 'Pending',
    orderId: '0170502',
    options: '2kg  |  x1',
    price: '46',
  },

  {
    id: 4,
    url: require('../../assets/images/product2.png'),
    title: 'Protein Starter Pack',
    status: 'Canceled',
    orderId: '0061905',
    options: '5kg  |  x3',
    price: '89',
  },
];

export const SingleOrderHistoryDetails = [
  {
    id: 3,
    url: require('../../assets/images/product3.png'),
    title: 'T900C Treadmill',
    status: 'Canceled',
    orderId: '0170903',
    price: 146,
    options: {
      quantity: 'x1',
      color: 'Black',
      size: 'S - 26',
    },
    orderInfo: {
      orderAddress:
        '3910 Crim Lane, Greendale County, Colorado. Zip Code 410348',
      receiverName: 'Alex Johnson',
      paymentMethod: 'Visacard ends with 1690',
      taxes: 8,
      shipping: 2,
    },
  },
  {
    id: 1,
    url: require('../../assets/images/product.png'),
    title: 'Bershka Mom Jeans',
    status: 'Deliverd',
    orderId: '0706502',
    options: {
      quantity: 'x1',
      color: 'Blue',
      size: 'S - 26',
      weight: '2kg',
    },
    orderInfo: {
      orderAddress:
        '7373 Crim Lane, Greendale County, Colorado. Zip Code 410348',
      receiverName: 'Johnson Lee',
      paymentMethod: 'UPI Payment Method',
      taxes: 15,
      shipping: 5,
    },
    price: 18,
  },
  {
    id: 2,
    url: require('../../assets/images/product1.png'),
    title: 'Pea Protein Isolate',
    status: 'Pending',
    orderId: '0170502',
    price: 46,
    options: {
      quantity: 'x1',
      // color: 'Blue',
      // size: 'S - 26',
      weight: '2kg',
    },
    orderInfo: {
      orderAddress:
        '3910 Crim Lane, Greendale County, Colorado. Zip Code 410348',
      receiverName: 'Alex Johnson',
      paymentMethod: 'Visacard ends with 1690',
      taxes: 15,
      shipping: 5,
    },
  },

  {
    id: 4,
    url: require('../../assets/images/product2.png'),
    title: 'Protein Starter Pack',
    status: 'Canceled',
    orderId: '0061905',
    options: {
      quantity: 'x3',
      // color: 'Blue',
      // size: 'S - 26',
      weight: '5kg',
    },
    orderInfo: {
      orderAddress:
        '3910 Crim Lane, Greendale County, Colorado. Zip Code 410348',
      receiverName: 'Alex Johnson',
      paymentMethod: 'Visacard ends with 1690',
      taxes: 15,
      shipping: 5,
    },
    price: 89,
  },
];
