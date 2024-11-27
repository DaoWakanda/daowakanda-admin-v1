'use client';

import React, { useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ILogin } from '@/interface/auth.interface';
import { IoIosEyeOff, IoMdEye } from 'react-icons/io';
import classNames from 'classnames';
import { useAuthActions } from '@/actions/auth';
import { Button } from '@/components/button';

export function Home() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthActions();
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const [data, setData] = useState<ILogin>({
    email: '',
    password: '',
  });

  const onChange = (key: keyof ILogin, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const canSubmit = Object.keys(data).every((key) => !!(data as any)[key]);

  const onSubmit = async () => {
    if (loading) return;

    setLoading(true);
    const response = await login({
      ...data,
    });
    setLoading(false);

    if (response.data) {
      toast.success('Login successful');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <div className={styles['container']}>
      <Link href={'/'} className={styles['link']}>
        <img
          src="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861971/Group_5_wz7m5r.png"
          className={styles['link-img']}
          alt="logo"
        />
      </Link>
      <div className={styles['main-section']}>
        <div className={classNames(styles['title'], 'font-avenir')}>Admin Login</div>

        <div className={styles['form']}>
          <div className={styles['input']}>
            <label>Email</label>
            <input
              onChange={(evt) => {
                onChange('email', evt.target.value);
              }}
              value={data.email}
              type="text"
              placeholder="Email"
              required
            />
          </div>
          <div className={styles['input']}>
            <label>Password</label>
            <input
              onChange={(evt) => {
                onChange('password', evt.target.value);
              }}
              value={data.password}
              type={hidePassword ? 'text' : 'password'}
              placeholder="Password"
              required
            />
            {!hidePassword ? (
              <IoIosEyeOff className={styles['input-icon']} onClick={() => setHidePassword(true)} />
            ) : (
              <IoMdEye className={styles['input-icon']} onClick={() => setHidePassword(false)} />
            )}
          </div>
        </div>

        <Button disabled={!canSubmit} loading={loading} onClick={onSubmit}>
          Proceed
        </Button>
      </div>
      <img
        src="https://res.cloudinary.com/dlinprg6k/image/upload/v1730466442/Frame_3_iujvnt.png"
        alt="logo"
        className={styles['img']}
      />
    </div>
  );
}
