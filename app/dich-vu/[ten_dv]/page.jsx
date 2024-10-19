import React from 'react'
import Link from 'next/link';

import styles from './dichVu.module.scss'

const Cities = [
    { label: "An Giang", link: 'an_giang' },
    { label: "Bạc Liêu", link: 'bạc_liêu' },
    { label: "Bến Tre", link: 'bến_tre' },
    { label: "Cà Mau", link: 'cà_mau' },
    { label: "Cần Thơ", link: 'cần_thơ' },
    { label: "Đồng Tháp", link: 'đồng_tháp' },
    { label: "Hậu Giang", link: 'hậu_giang' },
    { label: "Kiên Giang", link: 'kiên_giang' },
    { label: "Long An", link: 'long_an' },
    { label: "Sóc Trăng", link: 'sóc_trăng' },
    { label: "Tiền Giang", link: 'tiền_giang' },
    { label: "Trà Vinh", link: 'trà_vinh' },
    { label: "Vĩnh Long", link: 'vĩnh_long' }
]

function City({ params: { ten_dv } }) {
    console.log(ten_dv);
    return (
        <div className={styles.dichVu}>
            <h3>
                {ten_dv}
            </h3>
            <div className={styles.cities}>
                {
                    Cities.map(city => (
                        <Link href={`/tim-kiem/${ten_dv}?city=${city.link}`} key={city.label} className={styles.city}>
                            {city.label}
                        </Link>
                    ))
                }

            </div>
        </div>
    )
}

export default City