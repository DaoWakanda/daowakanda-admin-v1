'use client';

import React, { ReactNode } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { RiHome6Line } from 'react-icons/ri';
import { GiJeweledChalice } from 'react-icons/gi';
import { IoIosLogOut } from 'react-icons/io';
import { useAuthActions } from '@/actions/auth';
import { NavItemIcon } from '@/assets/nav-item.icon';

interface Props {
  children?: ReactNode;
  pageTitle?: string;
}

export function DashboardWrapper({ children = <></>, pageTitle = '' }: Props) {
  const { logout } = useAuthActions();

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <Link href={'/dashboard'} className={styles['link']}>
          <img
            src="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861971/Group_5_wz7m5r.png"
            className={styles['link-img']}
            alt="logo"
          />
        </Link>
        <div className={styles['pageTitle']}>{pageTitle}</div>
        <div className={styles['logout']} onClick={() => logout()}>
          <IoIosLogOut className={styles['icon']} />
          Log out
        </div>
      </div>
      <div className={styles['sidebar']}>
        <SideBar />
      </div>
      <div className={styles['main']}>{children}</div>
    </div>
  );
}

function SideBar() {
  const { push } = useRouter();
  const currentUrl = usePathname();

  const MenuNames = [
    {
      name: 'Overview',
      link: '/dashboard',
      icon: <NavItemIcon.Overview />,
    },
    {
      name: 'Challenges',
      link: '/dashboard/challenges',
      icon: <NavItemIcon.Challenges />,
    },
    {
      name: 'Proposals',
      link: '/dashboard/proposals',
      icon: <NavItemIcon.Proposals />,
    },
    {
      name: 'Developers',
      link: '/dashboard/developers',
      icon: <NavItemIcon.Developers />,
    },
  ];

  return (
    <div className={styles['sidebar-container']}>
      <div className={styles['sidebar-title']}>
        Hi, <span>Tom</span>
      </div>

      <div className={styles['sidebars']}>
        {MenuNames.map((item, index) => (
          <div
            className={styles[currentUrl === item.link ? 'navItem-active' : 'navItem']}
            onClick={() => {
              push(item.link);
            }}
            key={index}
          >
            <div>{item.icon}</div>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
