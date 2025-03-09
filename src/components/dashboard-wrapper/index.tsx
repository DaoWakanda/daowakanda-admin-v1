'use client';

import React, { ReactNode, useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { IoIosLogOut } from 'react-icons/io';
import { useAuthActions } from '@/actions/auth';
import { NavItemIcon } from '@/assets/nav-item.icon';
import { useWallet } from '@txnlab/use-wallet';
import classNames from 'classnames';
import { PiWalletBold } from 'react-icons/pi';
import { WalletConnectModal } from '../wallet-connect-modal';

interface Props {
  children?: ReactNode;
  pageTitle?: string;
}

export function DashboardWrapper({ children = <></>, pageTitle = '' }: Props) {
  const { logout } = useAuthActions();
  const { activeAddress, providers: wallets } = useWallet();
  const [connectWallet, setConnectWallet] = useState(false);

  const currentLink = usePathname();

  const onWalletClick = () => {
    if (!activeAddress) {
      setConnectWallet(true);
    } else {
      // disconnect wallet
      wallets?.forEach((wallet) => {
        wallet.disconnect();
      });
    }
  };

  const getPageTitle = () => {
    switch (currentLink) {
      case `/dashboard/challenges`:
        return `Challenges`;
      case `/dashboard/proposals`:
        return `Proposals`;
      case `/dashboard`:
        return `Overview`;
      case `/dashboard/developers`:
        return `Developers`;
      default:
        return `Submissions`;
    }
  };

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
        <div className={styles['pageTitle']}>{getPageTitle()}</div>
        <div className={styles['logout']} onClick={() => onWalletClick()}>
          {activeAddress ? (
            <>
              <PiWalletBold className={styles['icon']} />
              {activeAddress.slice(0, 6)}...{activeAddress.slice(-4)}
            </>
          ) : (
            <>
              <PiWalletBold className={styles['icon']} />
              Connect Wallet
            </>
          )}
        </div>
      </div>
      <div className={styles['sidebar']}>
        <SideBar />
      </div>
      <div className={styles['main']}>{children}</div>
      {connectWallet && <WalletConnectModal onClose={() => setConnectWallet(false)} />}
    </div>
  );
}

function SideBar() {
  const { push } = useRouter();
  const currentUrl = usePathname();
  const { logout } = useAuthActions();

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
        Hi, <span>Admin</span>
      </div>

      <div className={classNames(styles['sidebars'], 'h-full')}>
        {MenuNames.map((item, index) => (
          <div
            className={styles[currentUrl.includes(item.link) ? 'navItem-active' : 'navItem']}
            onClick={() => {
              push(item.link);
            }}
            key={index}
          >
            <div>{item.icon}</div>
            {item.name}
          </div>
        ))}
        <div
          className={classNames(styles['navItem'], 'mt-auto mb-4')}
          onClick={() => {
            logout();
          }}
          key={0}
        >
          <div>{<IoIosLogOut className={styles['icon']} />}</div>
          Log Out
        </div>
      </div>
    </div>
  );
}
