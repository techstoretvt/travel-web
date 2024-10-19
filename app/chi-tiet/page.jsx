'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import styles from './chiTiet.module.scss'
import anhKhachSan from '../../public/images/khachsan.jpg'

const ListGoiYTest = [
    {
        title: 'Gợi ý các điểm du lịch quanh khu vực này',
        data: [
            'Nhà hát lớn',
            'Ngôi nhà di sản 87 Mà Mây',
            'Đền Bạch Mã',
            'Bảo tàng Biên Phòng',
            'Nhà hát Nghệ thuật đương đại Việt Nam (Trung tâm Múa rối nước Bông Sen)',
            'Bảo tàng phụ nữ Việt Nam',
            'Bảo tang cách mạng Việt Nam',
            'Ca trù Hà Nội - Đình Kim Ngân',
            'Đền Quan Đế'
        ]
    },
    {
        title: 'Gợi ý các cơ sở lưu trú quanh khu vực này',
        data: [
            'Hanoi Paradise Canter Hotel - Spa',
            'Hanoi 19905 Homestay',
            'Hanoi A1 Hotel',
            'Little Hanoi Hostel',
            'Lan Homestay',
            'Zesty Hotel',
            'Babylon Premium Hotel And Spa'

        ]
    },
    {
        title: 'Gợi ý các cơ sở ăn uống quanh khu vực này',
        data: [
            'Doha Coffee - Quán cà phê ngon nhất khu vực Định Công',
            'Quán Bún Thang Bà Đức',
            'Pho Bo Ly Beo',
            'Highway4 Bar Restaurant',
            'Lòng nướng Phố Gầm Cầu',
            'Mv Pub',
            'Aroma ca phê',
            'Cà Phê 61',
            'Cafe Phố Cổ',
            'Bún ốc sườn non'

        ]
    },
    {
        title: 'Gợi ý các cơ sở mua sắm quanh khu vực này',
        data: [
            'Tràng Tiền Plaza',
            'TTTM Thiên Sơn Plaza Hoàn Kiếm',
            'Cửa hàng hanoia House',
            'Chợ Hàng Bè',
            'Trung tâm thương mại Hàng Da',
            'Chợ Đông Xuân',
            'Chợ đếm phố cổ',
            'Cửa hàng OZ Siik',
            'Công ty TNHH Thiết kế thời trang Tân Mỹ'

        ]
    }
]

function ChiTiet() {

    const searchParams = useSearchParams()
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [info, setInfo] = useState(null)
    const [listDiemDen, setListDiemDen] = useState([])
    const [listLuuTru, setListLuuTru] = useState([])
    const [listAnUong, setListAnUong] = useState([])
    const [listMuaSam, setListMuaSam] = useState([])


    useEffect(() => {
        initFunc()
    }, [searchParams])

    useEffect(() => {
        if (!loading) {
            getGoiYDiemDen();
            getGoiYLuuTru();
            getGoiYAnUong();
            getGoiYMuaSam();
        }
    }, [loading])

    const initFunc = async () => {
        await getChiTiet();
        await getGoiYDiemDen();
        await getGoiYLuuTru()
        await getGoiYAnUong();
        await getGoiYMuaSam();
        setLoading(false)
    }

    const getChiTiet = async () => {
        try {

            const uri = searchParams.get('uri')
            const type = searchParams.get('type') ?? 'all'
            let res = await fetch(process.env.BACKEND + '/api/get-chi_tiet?uri=' + uri + '&type=' + type)

            let data = await res.json()
            console.log(data);
            setInfo(data)

        } catch (error) {
            setInfo({
                ten_goi: 'Không tìm thấy đối tượng này'
            })
        }
    }

    const getGoiYDiemDen = async () => {
        try {

            console.log(info?.tinh, info?.quan_huyen, info?.phuong_xa);

            let res = await fetch(process.env.BACKEND + '/api/get-goi-y-diem-den?tinh=' + info?.tinh + '&quan_huyen=' + info?.quan_huyen + '&phuong_xa=' + info?.phuong_xa)

            let data = await res.json()
            console.log(data);
            setListDiemDen(data)

        } catch (error) {
            setListDiemDen([{ name: "Không tìm thấy đối tượng nào" }])
        }
    }

    const getGoiYLuuTru = async () => {
        try {

            console.log(info?.tinh, info?.quan_huyen, info?.phuong_xa);

            let res = await fetch(process.env.BACKEND + '/api/get-goi-y-luu-tru?tinh=' + info?.tinh + '&quan_huyen=' + info?.quan_huyen + '&phuong_xa=' + info?.phuong_xa)

            let data = await res.json()
            console.log(data);
            setListLuuTru(data)

        } catch (error) {
            setListLuuTru([{ name: "Không tìm thấy đối tượng nào" }])
        }
    }

    const getGoiYAnUong = async () => {
        try {

            console.log(info?.tinh, info?.quan_huyen, info?.phuong_xa);

            let res = await fetch(process.env.BACKEND + '/api/get-goi-y-an-uong?tinh=' + info?.tinh + '&quan_huyen=' + info?.quan_huyen + '&phuong_xa=' + info?.phuong_xa)

            let data = await res.json()
            console.log(data);
            setListAnUong(data)

        } catch (error) {
            setListAnUong([{ name: "Không tìm thấy đối tượng nào" }])
        }
    }

    const getGoiYMuaSam = async () => {
        try {

            console.log(info?.tinh, info?.quan_huyen, info?.phuong_xa);

            let res = await fetch(process.env.BACKEND + '/api/get-goi-y-mua-sam?tinh=' + info?.tinh + '&quan_huyen=' + info?.quan_huyen + '&phuong_xa=' + info?.phuong_xa)

            let data = await res.json()
            console.log(data);
            setListMuaSam(data)

        } catch (error) {
            setListMuaSam([{ name: "Không tìm thấy đối tượng nào" }])
        }
    }

    return (
        <div className={styles.ChiTiet}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.title}>{info?.ten_goi}</div>
                    <ul>
                        <li>
                            {
                                info?.dia_chi && info?.dia_chi !== 'None' && info?.dia_chi !== "không có" &&
                                <>
                                    Địa chỉ: {info?.dia_chi}
                                </>
                            }
                        </li>
                        <li>
                            {
                                info?.sdt && info?.sdt !== 'None' && info?.sdt !== "không có" &&
                                <>
                                    Điện thoại: {info?.sdt}
                                </>
                            }
                        </li>
                        <li>
                            {
                                info !== null && info.web && info.web !== 'None' && info.web !== "không có" &&
                                (
                                    <>
                                        Website: <Link href={info.web}>{info?.web}</Link>
                                    </>
                                )
                            }
                        </li>
                        <li>
                            {
                                info?.hang_sao && info?.hang_sao !== 'None' && info?.hang_sao !== "không có" &&
                                <>
                                    Hạng sao: {info?.hang_sao} sao
                                </>
                            }
                        </li>
                        <li>
                            {
                                info?.lo_trinh && info?.lo_trinh !== 'None' && info?.lo_trinh !== "không có" &&
                                <>
                                    Lộ trình đi: {info?.lo_trinh}
                                </>
                            }
                        </li>
                        <li>
                            {
                                info?.hoat_dong && info?.hoat_dong !== 'None' && info?.hoat_dong !== "không có" &&
                                <>
                                    Thời gian hoạt động: {info?.hoat_dong}
                                </>
                            }
                        </li>
                        <li>
                            {
                                info?.tan_suat && info?.tan_suat !== 'None' && info?.tan_suat !== "không có" &&
                                <>
                                    Tần suất: {info?.tan_suat}
                                </>
                            }
                        </li>
                        <li>
                            {
                                info?.mo_ta && info?.mo_ta !== 'None' && info?.mo_ta !== "không có" &&
                                <>
                                    Mô tả: {info?.mo_ta}
                                </>
                            }
                        </li>
                    </ul>
                </div>
                <div className={styles.right} style={{ backgroundImage: `url(${info?.anh})` }}>

                </div>
            </div>
            <br />
            <hr />
            <div className={styles.ListGoiY}>
                <div className={styles.goiY}>
                    <div className={styles.title}>Gợi ý các điểm du lịch quanh khu vực này</div>
                    <ul>
                        {
                            listDiemDen.length !== 0 &&
                            listDiemDen.map((diem_den, index) => {
                                if (diem_den.name === info.ten_goi) return ""
                                return (
                                    <li key={index} onClick={() => router.push(`/chi-tiet?uri=${diem_den.uri.split('#')[1]}`)}>{diem_den.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>

                <div className={styles.goiY}>
                    <div className={styles.title}>Gợi ý các cơ sở lưu trú quanh khu vực này</div>
                    <ul>
                        {
                            listLuuTru.length !== 0 &&
                            listLuuTru.map((luu_tru, index) => {
                                if (luu_tru.name === info.ten_goi) return ""
                                return (
                                    <li key={index} onClick={() => router.push(`/chi-tiet?uri=${luu_tru.uri.split('#')[1]}`)}>{luu_tru.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>

                <div className={styles.goiY}>
                    <div className={styles.title}>Gợi ý các cơ sở ăn uống quanh khu vực này</div>
                    <ul>
                        {
                            listAnUong.length !== 0 &&
                            listAnUong.map((an_uong, index) => {
                                if (an_uong.name === info.ten_goi) return ""
                                return (
                                    <li key={index} onClick={() => router.push(`/chi-tiet?uri=${an_uong.uri.split('#')[1]}`)}>{an_uong.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>

                <div className={styles.goiY}>
                    <div className={styles.title}>Gợi ý các cơ sở mua sắm quanh khu vực này</div>
                    <ul>
                        {
                            listMuaSam.length !== 0 &&
                            listMuaSam.map((mua_sam, index) => {
                                if (mua_sam.name === info.ten_goi) return ""
                                return (
                                    <li key={index} onClick={() => router.push(`/chi-tiet?uri=${mua_sam.uri.split('#')[1]}`)}>{mua_sam.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>

                {/* {
                    ListGoiYTest.map(goiy => (
                        <div key={goiy.title} className={styles.goiY}>
                            <div className={styles.title}>{goiy.title}</div>
                            <ul>
                                {
                                    goiy.data.map(data => (
                                        <li key={data}>{data}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                } */}
            </div>
        </div>
    )
}

export default ChiTiet