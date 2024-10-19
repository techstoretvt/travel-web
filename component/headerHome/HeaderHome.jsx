'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


import styles from './HeaderHome.module.scss'
import Logo from '../../public/logo-full.webp'




function HeaderHome() {
  const router = useRouter()
  const [valueSearch, setValueSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('vao');
    router.push(`/tim-kiem?tu_khoa=${valueSearch.replace(' ', "_")}`)
  }

  return (
    <div className={styles.HeaderHome}>
      <Link href={'/'} className={styles.logo}>
        <Image src={Logo}
          className={styles.img}
          alt='Logo web'
        />
      </Link>
      <div className={styles.search}>
        <form className={styles["form"]} onSubmit={(e) => handleSubmit(e)} onReset={() => setValueSearch('')}>
          <label htmlFor="search">
            <input value={valueSearch} onChange={(e) => setValueSearch(e.target.value)} className={styles["input"]} type="text" required="" placeholder="Search twitter" id="search" />
            <div className={styles["fancy-bg"]}></div>
            <div className={styles["search"]}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className={styles["r-14j79pv"] + " " + styles["r-4qtqp9"] + " " + styles["r-yyyyoo"] + " " + styles["r-1xvli5t"] + " " + styles["r-dnmrzs"] + " " + styles["r-4wgw6l"] + " " + styles["r-f727ji"] + " " + styles["r-bnwqim"] + " " + styles["r-1plcrui"] + " " + styles["r-lrvibr"]}>
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
            </div>
            <button className={styles["close-btn"]} type="reset">
              <svg xmlns="http://www.w3.org/2000/svg" className={styles["h-"] + " " + styles[" w-5"]} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </label>
        </form>
      </div>
    </div>
  )
}

export default HeaderHome