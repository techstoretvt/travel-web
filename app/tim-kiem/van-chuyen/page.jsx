
'use client'
import React, { useEffect, useState } from 'react'
import { Select, Button, Pagination } from 'antd';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'



import styles from './diemDen.module.scss'


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

function TimDiaDiem({ params }) {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [loaiVanChuyen, setLoaiVanChuyen] = useState('all')
    const [listKhuVuc, setListKhuVuc] = useState([])
    const [khuVuc, setKhuVuc] = useState('all')
    const [listOGan, setListOGan] = useState([])
    const [oGan, setOGan] = useState('all')
    const [listDiaDiem, setListDiaDiem] = useState([])
    const [countPage, setCountPage] = useState(1)
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        // handleGetKhuVuc()
        // handleGetOGan()
        initFetchApi()
        // handleGetDiemDen()
    }, [])

    useEffect(() => {
        if (!loading)
            handleGetVanChuyen()
    }, [loaiVanChuyen, khuVuc, oGan, currentPage])

    const initFetchApi = async () => {
        await handleGetVanChuyen()
        await handleGetKhuVuc()
        await handleGetOGan()
        setLoading(false)
    }

    const handleGetVanChuyen = async () => {
        try {
            const city = searchParams.get('city')

            let res = await fetch(process.env.BACKEND + '/api/get-van-chuyen?type=' + loaiVanChuyen + '&khu_vuc=' + khuVuc + '&o_gan=' + oGan + '&city=' + city + '&page=' + currentPage)

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

    const handleGetKhuVuc = async () => {
        try {


            const city = searchParams.get('city')
            if (!city) return
            console.log('call api: ', city);

            let res = await fetch(process.env.BACKEND + '/api/get-khu-vuc?city=' + city)

            let data = await res.json()

            // console.log(data);
            let dataKhuVuc = data.map(item => {

                return {
                    label: item,
                    value: item
                }
            })
            setListKhuVuc([{
                value: 'all',
                label: 'Tất cả',
            },
            ...dataKhuVuc
            ])

            await handleGetOGan()

        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }


    }

    const handleGetOGan = async () => {

        try {

            const city = searchParams.get('city')
            const type = 'điểm_đến'
            if (!city || !type) return
            console.log(city, type);



            let res = await fetch(process.env.BACKEND + '/api/get-o-gan?city=' + city + '&type=' + type)

            let data = await res.json()

            // console.log(data);
            let listData = data.map(item => {

                return {
                    label: item.charAt(0).toUpperCase() + item.slice(1),
                    value: item
                }
            })

            setListOGan([
                {
                    value: 'all',
                    label: 'Tất cả',
                },
                ...listData
            ])


        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    }

    const onchangeFilter = async (value, setFunc) => {
        setFunc(value)
        setCurrentPage(1)
        // await handleGetDiemDen()
    }

    const handleLoc = () => {
        // const search = searchParams.get('search')
        handleGetDiemDen()
    }

    return (
        <div className={styles.DiemDen}>
            <div className={styles.filters}>
                <div className={styles.filter}>
                    <div className={styles.title}>Loại mua sắm</div>
                    <Select
                        value={loaiVanChuyen}
                        style={{
                            minWidth: 120,
                        }}
                        onChange={(value) => onchangeFilter(value, setLoaiVanChuyen)}
                        options={[
                            {
                                label: 'Tất cả',
                                value: 'all',
                            },
                            {
                                label: 'Sân bay',
                                value: 'sân_bay',
                            },
                            {
                                label: 'Taxi',
                                value: 'taxi',
                            },
                            {
                                label: 'Xe buýt',
                                value: 'xe_buýt',
                            },
                        ]}
                    />
                </div>
                <div className={styles.filter}>
                    <div className={styles.title}>Khu vực</div>
                    <Select
                        value={khuVuc}
                        style={{
                            minWidth: 250,
                        }}
                        onChange={(value) => onchangeFilter(value, setKhuVuc)}
                        options={listKhuVuc}
                    />
                </div>
                <div className={styles.filter}>
                    <div className={styles.title}>Ở gần</div>
                    <Select
                        value={oGan}
                        style={{
                            minWidth: 200,
                        }}
                        onChange={(value) => onchangeFilter(value, setOGan)}
                        options={listOGan}
                    />
                </div>
                <Button type="primary" onClick={handleLoc}>Lọc</Button>
            </div>
            <div className={styles.KetQua}>
                <div className={styles.title}>
                    Tìm thấy {count} kết quả phù hợp
                </div>
                <div className={styles.listKetQua}>
                    {
                        listDiaDiem.map((diaDiem, index) => (
                            <div key={index} className={styles.ketQua}>
                                <div className={styles.name}>{diaDiem.name}</div>
                                <div className={styles.diaChi}>Lộ trình: {diaDiem.lo_trinh}</div>
                                <div className={styles.diaChi}>Hoạt động: {diaDiem.hoat_dong}</div>
                                <div className={styles.diaChi}>Tần suất: {diaDiem.tan_suat}</div>
                                <Button type="primary"
                                    onClick={() => { router.push(`/chi-tiet?uri=${diaDiem.uri.split('#')[1]}&type=van_chuyen`) }}
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

export default TimDiaDiem