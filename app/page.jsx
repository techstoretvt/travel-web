'use client'
import Link from "next/link";

import styles from "./home.module.scss";


const typeDuLich = [
  {
    label: 'Điểm đến',
    link: 'diem-den'
  },
  {
    label: 'Ăn uống',
    link: 'an-uong'
  },
  {
    label: 'Cơ sở lưu trú',
    link: 'co-so-luu-tru'
  },
  {
    label: 'Mua sắm',
    link: 'mua-sam'
  },
  {
    label: 'Vận chuyển',
    link: 'van-chuyen'
  },
]

export default function Home() {
  return (
    <div className={styles.HomePage}>
      <h2 className={styles.title}>Thông tin du lịch Đồng bằng sông Cửu Long</h2>
      <div className={styles.types}>
        {
          typeDuLich.map(type => (
            <Link href={`/dich-vu/${type.link}`} key={type.label} className={styles.type}
              onClick={() => console.log()}
            >
              {type.label}
            </Link>
          ))
        }
      </div>
    </div>
  );
}
