
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
    const [loaiDiemDen, setLoaiDiemDen] = useState('all')
    const [listKhuVuc, setListKhuVuc] = useState([])
    const [khuVuc, setKhuVuc] = useState('all')
    const [listOGan, setListOGan] = useState([])
    const [oGan, setOGan] = useState('all')
    const [hangSao, setHangSao] = useState('all')
    const [listDiaDiem, setListDiaDiem] = useState([])
    const [countPage, setCountPage] = useState(1)
    const [count, setCount] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        // handleGetKhuVuc()
        // handleGetOGan()
        initFetchApi()
        // handleGetDiemDen()
    }, [])

    useEffect(() => {
        if (!loading)
            handleGetLuuTru()
    }, [loaiDiemDen, khuVuc, oGan, currentPage, hangSao])

    const initFetchApi = async () => {
        await handleGetLuuTru()
        await handleGetKhuVuc()
        await handleGetOGan()
        setLoading(false)
    }

    const handleGetLuuTru = async () => {
        try {
            const city = searchParams.get('city')

            let res = await fetch(process.env.BACKEND + '/api/get-luu-tru?type=' + loaiDiemDen + '&khu_vuc=' + khuVuc + '&o_gan=' + oGan + '&city=' + city + '&page=' + currentPage + '&hang_sao=' + hangSao)

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
                    <div className={styles.title}>Loại lưu trú</div>
                    <Select
                        value={loaiDiemDen}
                        style={{
                            minWidth: 120,
                        }}
                        onChange={(value) => onchangeFilter(value, setLoaiDiemDen)}
                        options={[
                            {
                                label: 'Tất cả',
                                value: 'all',
                            },
                            {
                                label: 'Khách sạn',
                                value: 'khách_sạn',
                            },
                            {
                                label: 'Nhà nghỉ',
                                value: 'nhà_nghỉ',
                            },
                            {
                                label: 'Homestay',
                                value: 'homestay',
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
                <div className={styles.filter}>
                    <div className={styles.title}>Hạng sao</div>
                    <Select
                        value={hangSao}
                        style={{
                            minWidth: 120,
                        }}
                        onChange={(value) => onchangeFilter(value, setHangSao)}
                        options={[
                            {
                                label: 'Tất cả',
                                value: 'all',
                            },
                            {
                                label: '1 sao',
                                value: '1',
                            },
                            {
                                label: '2 sao',
                                value: '2',
                            },
                            {
                                label: '3 sao',
                                value: '3',
                            },
                            {
                                label: '4 sao',
                                value: '4',
                            },
                            {
                                label: '5 sao',
                                value: '5',
                            },
                        ]}
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
                                <div className={styles.diaChi}>Địa chỉ: {diaDiem.dia_chi}</div>
                                <Button type="primary"
                                    onClick={() => { router.push(`/chi-tiet?uri=${diaDiem.uri.split('#')[1]}`) }}
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