'use client';

import styles from './index.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useProposalActions } from '@/actions/proposal';
import { IProposal } from '@/interface/proposal.interface';
import { useRecoilValue } from 'recoil';
import { RefreshProposalAtom } from '@/state';
import { ProposalCard, ProposalCardLoader } from './proposal-card';
import Pagination from '@/components/pagination';
import { IoIosSearch } from 'react-icons/io';
import { useDebounce } from '@/hooks/use-debounce';
import { PROPOSAL_STATUS } from '@/enums';

export const ProposalCards = () => {
  const [allProposals, setAllProposals] = useState<IProposal[]>([])
  const [page, setPage] = useState(0);
  const [proposalStatus, setProposalStatus] = useState<PROPOSAL_STATUS>(PROPOSAL_STATUS.ALL);
  const [searchedTerm, setSearchedTerm] = useState('');
  const [paginationData, setPaginationData] = useState({
    page: 1,
    numOfItemsPerPage: 0,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  })

  const [loadingData, setLoadingData] = useState(false);
  const refresh = useRecoilValue(RefreshProposalAtom);
  const { getAllProposal } = useProposalActions();
  const { debounce } = useDebounce();
  
  const fetchAllProposal = async (page = 1) =>{
    setLoadingData(true);
    setAllProposals([]);

    const res = await getAllProposal({order: 'desc', page });
    if (res) {
      setAllProposals(res?.data);
      setPaginationData(res?.pagination);
      setLoadingData(false);
    };
  
  }

  const debouncedFetch = useCallback(
    debounce(async (searchTerm: string) => {
      setLoadingData(true);
      setAllProposals([]);

      const res = await getAllProposal({order: 'desc', page, searchTerm });

      if (res) {
        setAllProposals(res?.data);
        setPaginationData(res?.pagination);
        setLoadingData(false);
      }
    }, 500),
    [],
  );

  const onChangeSearchTerm = (e: any) => {
    setSearchedTerm(e.target.value);
    debouncedFetch(e.target.value);
  };

  const activeProposals:IProposal[] = allProposals?.filter((proposal)=> proposal?.ongoing);
  const approvedProposals: IProposal[] = allProposals?.filter((proposal)=> !proposal?.ongoing && proposal?.yesVotes?.length > proposal?.noVotes?.length);
  const deniedProposals: IProposal[] = allProposals?.filter((proposal)=> !proposal?.ongoing && proposal?.noVotes?.length > proposal?.yesVotes?.length);

  useEffect(() => {
    fetchAllProposal();
  }, []);

  return (
    <div className={styles['proposal-cards-container']}>
      <div className={styles['top']}>
        <div className={styles['left']}>
          <div className={styles[proposalStatus === PROPOSAL_STATUS.ALL ? 'status-active': 'status']}
            onClick={()=> setProposalStatus(PROPOSAL_STATUS.ALL)}
          >All</div>
          <div className={styles[proposalStatus === PROPOSAL_STATUS.IN_PROGRESS ? 'status-active': 'status']}
            onClick={()=> setProposalStatus(PROPOSAL_STATUS.IN_PROGRESS)}
          >In progress</div>
          <div className={styles[proposalStatus === PROPOSAL_STATUS.APPROVED ? 'status-active': 'status']}
            onClick={()=> setProposalStatus(PROPOSAL_STATUS.APPROVED)}
          >Approved</div>
          <div className={styles[proposalStatus === PROPOSAL_STATUS.DENIED ? 'status-active': 'status']}
            onClick={()=> setProposalStatus(PROPOSAL_STATUS.DENIED)}
          >Denied</div>
        </div>
        <div className={styles['right']}>
          <IoIosSearch className={styles.icon} />
          <input
            type="text"
            placeholder={'Search'}
            value={searchedTerm}
            onChange={onChangeSearchTerm}
          />
        </div>
      </div>
      <div className={styles['bottom-section']}>
        <div className={styles['cards']}>
          {
            !loadingData && proposalStatus === PROPOSAL_STATUS.IN_PROGRESS ? 
              activeProposals?.map((proposal)=> (
                <ProposalCard key={proposal?.appId} proposal={proposal} />
              )) :
            !loadingData && proposalStatus === PROPOSAL_STATUS.APPROVED ? 
              approvedProposals?.map((proposal)=> (
                <ProposalCard key={proposal?.appId} proposal={proposal} />
              )) : 
            !loadingData && proposalStatus === PROPOSAL_STATUS.DENIED ? 
              deniedProposals?.map((proposal)=> (
                <ProposalCard key={proposal?.appId} proposal={proposal} />
              )) : 
            allProposals?.map((proposal)=> (
              <ProposalCard key={proposal?.appId} proposal={proposal} />
            )) 
          }
          {loadingData &&
            Array.from({ length: 10 }).map((_, index) => <ProposalCardLoader key={index} />)}
        </div>
        <Pagination
          page={paginationData?.page}
          numOfItemsPerPage={paginationData?.numOfItemsPerPage}
          itemCount={paginationData?.itemCount}
          pageCount={paginationData?.pageCount}
          hasPreviousPage={paginationData?.hasPreviousPage}
          hasNextPage={paginationData?.hasNextPage}
          onPageChange={(page)=>fetchAllProposal(page)}
        />
      </div>
    </div>
  );
};
