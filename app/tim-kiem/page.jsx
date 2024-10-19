"use client"
import React, { useEffect } from 'react'

import styles from './timKiem.module.scss'
import { Button, Pagination } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react';


const ketQuaTest = [
    {
        name: 'Bảo tàng di sản văn hóa Bạc Liêu',
        diaChi: 'Hàng Buồm, Hoàn Kiếm Phường Hàng Buồm, Quận Hoàn Kiếm'
    },
    {
        name: 'Đền Bạch Mã',
        diaChi: 'Hoàn Kiếm'
    },
    {
        name: 'Đền Quan Đế',
        diaChi: 'Hàng Bạc, Hoàn Kiếm'
    },
    {
        name: 'Dền Thọ Nam',
        diaChi: 'Hoàn Kiếm'
    },
    {
        name: 'Đền Phù Ủng',
        diaChi: 'Hàng Thông, Hoàn Kiếm'
    }
]

function TimKiem() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [countPage, setCountPage] = useState(1)
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [listDiaDiem, setListDiaDiem] = useState([])

    useEffect(() => {
        initFunc();
    }, [])

    useEffect(() => {
        if (!loading)
            getDiaDiem();
    }, [currentPage, searchParams])

    const initFunc = async () => {
        await getDiaDiem();
        setLoading(false)
    }

    const getDiaDiem = async () => {
        try {
            const tu_khoa = searchParams.get('tu_khoa').replace('_', " ")

            let res = await fetch(process.env.BACKEND + '/api/get-tim-kiem?tu_khoa=' + tu_khoa
                + '&page=' + currentPage)

            let data = await res.json()
            console.log(data);
            setListDiaDiem(data.data)

            let count = +data.count
            setCount(count)
            count = count === 0 ? 1 : Math.floor((count + 1) / 10 + 1)
            console.log('count page: ', count);
            setCountPage(count)



        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    }


    return (
        <div className={styles.TimKiem}>
            <div className={styles.title}>
                TimKiem: {searchParams.get('tu_khoa')?.replace('_', ' ')}
            </div>
            <div className={styles.KetQua}>
                <div className={styles.title}>
                    Tìm thấy {count} kết quả phù hợp
                </div>
                <div className={styles.listKetQua}>
                    {
                        listDiaDiem.map((dia_diem, index) => (
                            <div key={index} className={styles.dia_diem}>
                                <div className={styles.name}>{dia_diem.ten_goi}</div>
                                <div className={styles.diaChi}>Địa chỉ: {dia_diem.dia_chi}</div>
                                <Button type="primary"
                                    onClick={() => { router.push(`/chi-tiet?uri=${dia_diem.uri.split('#')[1]}`) }}
                                >Xem chi tiết</Button>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.phanTrang}>
                    {
                        countPage !== 1 &&
                        <Pagination current={currentPage} total={countPage * 10} onChange={(page) => setCurrentPage(page)} />
                    }
                </div>
            </div>
        </div>
    )
}

export default TimKiem