'use client';

import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useProposalActions } from '@/actions/proposal';
import { IProposal } from '@/interface/proposal.interface';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeftLong,FaRegCircle, FaRegCircleDot } from 'react-icons/fa6';
import { BsSoundwave } from 'react-icons/bs';
import { formatTimestamp, maskString } from '@/utils';
import { IoMdFolderOpen } from 'react-icons/io';
import { CiCalendar } from 'react-icons/ci';
import { GiRadarSweep } from 'react-icons/gi';
import { FaRegCheckCircle } from 'react-icons/fa';
import { ProposalDetailLoader } from './proposal-detail-loader';

export const ProposalDetail = () => {
  const [proposal, setProposal] = useState<IProposal>();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { getProposalById } = useProposalActions();

  const fetchProposal = async () => {
    if (!params?.id) return;

    const res = await getProposalById(params?.id as string);
    setLoading(true);

    if (res) {
      setProposal(res);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposal();
  }, []);

  console.log(proposal);
  const approvedVotes = Number(proposal?.yesVotes?.length);
  const deniedVotes = Number(proposal?.noVotes?.length);
  const maybeVotes = proposal?.yesVotes?.length === proposal?.noVotes?.length ? Number(proposal?.yesVotes?.length):0;

  const totalVotes = Number(proposal?.registeredVoters?.length);

  const approvedPercent = Math.round((approvedVotes/totalVotes) * 100);
  const maybePercent = Math.round((maybeVotes/totalVotes) * 100);
  const deniedPercent = Math.round((deniedVotes/totalVotes) * 100);

  const status = proposal?.ongoing ? 'In Progress':
                approvedVotes > deniedVotes? 'Approved': 'Denied';
  return (<>
    {
      !proposal ? (
        <ProposalDetailLoader />
      ): (
        <div className={styles['container']}>
        <div className={styles['top-container']}>
          <div className={styles['header']}>
            <Link href='/dashboard/proposals/'><FaArrowLeftLong className={styles['icon']}/></Link>
            <div className={styles['title']}>{proposal?.title}</div>
          </div>
          <div className={styles['description']}>{proposal?.description}</div>
        </div>
        <div className={styles['bottom-container']}>
          <div className={styles['card-results']}>
            <div className={styles['header']}>
              <div className={styles['heading']}>Results</div>
              <div className={styles['votes']}>{proposal?.registeredVoters?.length} <span>votes</span></div>
            </div>
            <div className={styles['progress-bar']}>
              <div className={styles['progress-approve']} style={{
                width: `${approvedPercent}%`,
                borderTopRightRadius: approvedPercent === 100 ? '1000px': '0px',
                borderBottomRightRadius: approvedPercent === 100 ? '1000px': '0px',
                }}></div>
              <div className={styles['progress-maybe']}
              style={{
                width: `${maybePercent}%`,}}></div>
              <div className={styles['progress-denied']}
              style={{
                width: `${deniedPercent}%`,
                borderTopRightRadius: deniedPercent ? '1000px': '0px',
                borderBottomRightRadius: deniedPercent ? '1000px': '0px',
                }}></div>
            </div>
            <div className={styles['reports']}>
              <div className={styles['report-line']}>    
                <div className={styles['left']}>
                  <div className={styles['dot']}></div>
                  <div className={styles['text']}>Approved</div>
                </div >
                <div className={styles['right']}>{approvedVotes}{' '}{`(${approvedPercent}%)`}</div>
              </div>
              <div className={styles['report-line']}>    
                <div className={styles['left']}>
                  <div className={styles['dot-maybe']}></div>
                  <div className={styles['text']}>Maybe</div>
                </div >
                <div className={styles['right']}>{maybeVotes}{' '}{`(${maybePercent}%)`}</div>
              </div>
              <div className={styles['report-line']}>    
                <div className={styles['left']}>
                  <div className={styles['dot-denied']}></div>
                  <div className={styles['text']}>Denied</div>
                </div >
                <div className={styles['right']}>{deniedVotes}{' '}{`(${deniedPercent}%)`}</div>
              </div>
            </div>
          </div>
          <div className={styles['card-voting-info']}>
              <div className={styles['status-report']}>
                {
                  proposal?.startDate ? 
                    <FaRegCheckCircle className={styles['status-done']}/> : 
                    <FaRegCircle className={styles['status-created']}/>
                }
                <div className={styles['v-line']}></div>
                {
                  proposal?.endDate ? 
                    <FaRegCheckCircle className={styles['status-done']}/> : 
                    <FaRegCircleDot className={styles['status-progress']}/>
                }
                <div className={styles['v-line']}></div>
                {
                  !proposal?.endDate ? 
                    <FaRegCheckCircle className={styles['status-done']}/> : 
                    <FaRegCircleDot className={styles['status-progress']}/>
                }
                <div className={styles['v-line']}></div>
                <FaRegCircle className={styles['status-created']}/>
                <div className={styles['v-line']}></div>
                <FaRegCircle className={styles['status-created']}/>
              </div>
              <div className={styles['info']}>
                <div className={styles['text-block']}>
                  <div className={styles['title']}>Created</div>
                  <div className={styles['text']}>{formatTimestamp(Number(proposal?.startDate))}</div>
                </div>
                <div className={styles['text-block']}>
                  <div className={styles['title']}>In Progress</div>
                  <div className={styles['text']}>{formatTimestamp(Number(proposal?.endDate))}</div>
                </div>
                <div className={styles['text-block']}>
                  <div className={styles['title']}>Ended</div>
                  <div className={styles['text']}>{formatTimestamp(Number(proposal?.endDate))}</div>
                </div>
                <div className={styles['text-block']}>
                  <div className={styles['title']}>Queued</div>
                </div>
                <div className={styles['text-block']}>
                  <div className={styles['title']}>Executed</div>
                </div>
              </div>
          </div>
          <div className={styles['card-status']}>
            <div className={styles['text-block']}>
              <BsSoundwave className={styles['icon']}/>
              <div className={styles['text']}>Status: <span>{status}</span></div>
            </div>
            <div className={styles['text-card']}>
              <IoMdFolderOpen className={styles['icon']}/>
              <div className={styles['text']}>Created by: <span>{maskString(proposal?.creator || '')}</span></div>
            </div>
            <div className={styles['text-card']}>
              <CiCalendar className={styles['icon']}/>
              <div className={styles['text']}>Start: <span>{formatTimestamp(Number(proposal?.startDate))}</span></div>
            </div>
            <div className={styles['text-card']}>
              <GiRadarSweep className={styles['icon']}/>
              <div className={styles['text']}>End: <span>{formatTimestamp(Number(proposal?.endDate))}</span></div>
            </div>
          </div>
        </div>
      </div>
      )
}
    </>
    
   
  );
};
