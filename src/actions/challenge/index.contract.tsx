import { useWallet } from '@txnlab/use-wallet';
import { useCallback } from 'react';
import algosdk, { makePaymentTxnWithSuggestedParamsFromObject } from 'algosdk';
import { BOUNTY_SMART_CONTRACT_ID } from '@/constants';
import * as algokit from '@algorandfoundation/algokit-utils';
import { getAlgoClientConfig, getAlgodClient } from '@/utils/get-algo-client-config';
import { ApplicationClient } from '@algorandfoundation/algokit-utils/types/app-client';
import { BountyAppSpec } from '@/artifacts/Bounty.arc32';

export const useChallengeContractActions = () => {
  const { activeAddress, signer } = useWallet();
  const algod = getAlgodClient();
  const mbrCostForBountyBox = 131_300;

  const checkIfAddressIsContractCreator = useCallback(async () => {
    const res = await algod.getApplicationByID(BOUNTY_SMART_CONTRACT_ID).do();
    const isCreator = res.params.creator === activeAddress;
    return { isCreator, creatorAddress: res.params.creator };
  }, [activeAddress]);

  const disburseBounty = useCallback(
    async (recipient: string, bounty: number) => {
      if (!activeAddress) {
        throw new Error('No active address');
      }

      const appClient = new ApplicationClient(
        {
          resolveBy: 'id',
          id: BOUNTY_SMART_CONTRACT_ID,
          app: JSON.stringify(BountyAppSpec),
        },
        algod,
      );

      let totalAmount = 0;

      try {
        const boxValue = await appClient.getBoxValue(algosdk.decodeAddress(recipient).publicKey);

        if (boxValue) {
          totalAmount = Number(algokit.algos(bounty));
        }
      } catch (err) {
        console.log(err);
        totalAmount = Number(algokit.algos(bounty)) + mbrCostForBountyBox;
      }

      const appAddress = algosdk.getApplicationAddress(BOUNTY_SMART_CONTRACT_ID);
      const suggestedParams = await algod.getTransactionParams().do();
      const paymentTxn = makePaymentTxnWithSuggestedParamsFromObject({
        from: activeAddress,
        to: appAddress,
        amount: totalAmount,
        suggestedParams,
      });

      const atomTransactionComposer = new algosdk.AtomicTransactionComposer();

      atomTransactionComposer.addMethodCall({
        method: appClient.getABIMethod('issueBounty')!,
        methodArgs: [
          {
            txn: paymentTxn,
            signer,
          },
          algokit.algos(bounty).microAlgos,
          algosdk.decodeAddress(recipient).publicKey,
        ],
        suggestedParams,
        sender: activeAddress,
        signer,
        appID: BOUNTY_SMART_CONTRACT_ID,
        boxes: [
          { appIndex: BOUNTY_SMART_CONTRACT_ID, name: algosdk.decodeAddress(recipient).publicKey },
        ],
      });

      const response = await atomTransactionComposer.execute(algod, 8);
      console.log(response);

      return response;
    },
    [activeAddress],
  );

  return {
    checkIfAddressIsContractCreator,
    disburseBounty,
  };
};
