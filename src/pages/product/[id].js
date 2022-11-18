import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import styles from 'styles/productDetails.module.css';
import axios from 'axios';

import { LoadingButton } from '@mui/lab';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Example() {
  const router = useRouter();
  const product = router.query;

  const [pph, setPPH] = useState(undefined);

  useEffect(() => {
    if (!product.id) {
      return;
    }
    const url = `/api/productpricehistory/product/${product.id}`;
    axios.get(url).then((res) => {
      const temp = res.data.body;
      console.log('PPH: ', temp);

      const state = {
        series: [
          {
            name: 'Price',
            data: temp.map((item) => +item.price.slice(1)),
          },
        ],
        options: {
          chart: {
            height: 500,
            type: 'area',
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
          },
          xaxis: {
            type: 'datetime',
            categories: temp.map((item) => item.recorded_at),
          },
          theme: {
            mode: 'light',
            palette: 'palette1',
            monochrome: {
              enabled: true,
              color: '#9155fd',
              shadeTo: 'light',
              shadeIntensity: 0.65,
            },
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm',
            },
          },
        },
      };
      setPPH(state);
    });
  }, [product.id]);

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <Button onClick={goBack} className={styles['back-button']}>
        <span>👈🏼All Products</span>
      </Button>
      <div className={styles['card-wrapper']}>
        <div className={styles['card']}>
          {/* card left */}
          <div className={styles['product-imgs']}>
            <img
              className={styles['content-img']}
              src={product.image}
              alt="shoe image"
            />
          </div>
          {/* card right */}
          <div className={styles['product-content']}>
            <h1 className={styles['product-title']}>{product.name}</h1>
            <div className={styles['product-price']}>
              <h2 className={styles['new-price']}>
                Base Price: <span>&#8377;{product.base_price}</span>
              </h2>
            </div>
            <div className={styles['product-detail']}>
              <h2>description</h2>
              <p>{product.description}</p>
            </div>
            <div className={styles['purchase-info']}>
              <Button>Check Deals</Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['chart-container']}>
        <h1>Product Price History</h1>
        {pph && (
          <div id="chart">
            <ApexCharts
              options={pph.options}
              series={pph.series}
              type="area"
              height={500}
            />
          </div>
        )}
        {!pph && (
          <LoadingButton
            sx={{
              width: '100%',
              scale: '2',
              div: {
                color: '#232227',
              },
              marginBottom: '20px',
            }}
            loading
          />
        )}
      </div>
    </>
  );
}
