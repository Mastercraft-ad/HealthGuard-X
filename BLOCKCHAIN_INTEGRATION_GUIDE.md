# HealthGuardX Blockchain Integration Guide

## Architecture Overview

HealthGuardX follows **Web3 best practices** for blockchain integration:

### ✅ Frontend Signs Transactions (Secure)
- Users sign all blockchain transactions using their MetaMask wallet
- Private keys never leave the user's browser/wallet
- All smart contract write operations happen on the client side
- Implemented in `client/src/lib/blockchain.ts`

### ✅ Backend Reads Blockchain (Secure)
- Server only queries blockchain for verification
- No private keys stored on server
- Listens to blockchain events for database synchronization
- Implemented in `server/blockchain.ts`

## Smart Contract Addresses (BlockDAG Network)

```typescript
HealthGuardXUsers:      0x7ddd2eb4ece89825096367fd6f72623996ad1a55
HealthGuardXMedical:    0x33b7b70a1a20233b441527a7cd5b43c791d78860
HealthGuardXTreatments: 0x865f4b7835cffad383d33211033ea3b747010cd8
HealthGuardXInsurance:  0xeaa1afa47136f28828464a69e21046da8706c635
HealthGuardXPayments:   0x479a9cd7bee5a12333ae3f44ad7b960aaf479278ffcb733cf3f4f80d00f465ae
```

## Frontend Integration (User Transactions)

### Using the Blockchain Client

The `blockchainClient` in `client/src/lib/blockchain.ts` provides methods for all smart contract interactions:

```typescript
import { blockchainClient } from '@/lib/blockchain';

// Example: Register user on blockchain
async function registerUser(uid: string, username: string) {
  try {
    const receipt = await blockchainClient.registerUser(uid, username);
    console.log('Transaction hash:', receipt.transactionHash);
    // Now save to database
  } catch (error) {
    console.error('Blockchain registration failed:', error);
  }
}

// Example: Submit KYC document
async function submitKYC(documentCID: string) {
  const receipt = await blockchainClient.submitKYC(documentCID);
  return receipt.transactionHash;
}

// Example: Add medical record
async function addMedicalRecord(recordId: string, recordCID: string, recordHash: string) {
  const receipt = await blockchainClient.addMedicalRecord(
    recordId,
    recordCID,
    recordHash,
    'lab_result'
  );
  return receipt;
}

// Example: Grant access to medical records
async function grantAccess(doctorAddress: string, expirationDays: number) {
  const expiresAt = Math.floor(Date.now() / 1000) + (expirationDays * 24 * 60 * 60);
  const receipt = await blockchainClient.grantAccess(doctorAddress, expiresAt);
  return receipt;
}

// Example: Submit insurance claim
async function submitClaim(claimId: string, policyId: string, amount: string, treatmentCID: string) {
  const receipt = await blockchainClient.submitClaim(
    claimId,
    policyId,
    amount,
    treatmentCID
  );
  return receipt;
}
```

## Backend Integration (Read-Only)

The server uses `blockchainService` from `server/blockchain.ts` to query blockchain state:

```typescript
import { blockchainService } from './blockchain';

// Example: Check access permissions
async function verifyAccess(patientAddress: string, doctorAddress: string) {
  const hasAccess = await blockchainService.checkAccess(patientAddress, doctorAddress);
  return hasAccess;
}

// Example: Get user info from blockchain
async function getUserFromBlockchain(walletAddress: string) {
  const user = await blockchainService.getUserByAddress(walletAddress);
  return user;
}

// Example: Verify transaction
async function verifyTransaction(txHash: string) {
  const receipt = await blockchainService.getTransactionReceipt(txHash);
  return receipt;
}
```

## Workflow: Adding a Medical Record

### Step 1: Frontend uploads file to IPFS
```typescript
// In your React component
const uploadRecord = async (fileData: string) => {
  // Upload to IPFS via backend API
  const response = await fetch('/api/patient/records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fileData,
      recordType: 'lab_result',
      title: 'Blood Test Results'
    })
  });
  
  const { fileCID, fileHash, id } = await response.json();
  
  // Step 2: Record on blockchain
  const receipt = await blockchainClient.addMedicalRecord(
    id,
    fileCID,
    fileHash,
    'lab_result'
  );
  
  console.log('Recorded on blockchain:', receipt.transactionHash);
};
```

### Step 2: Backend uploads to IPFS and saves to database
```typescript
// In server/routes.ts (already implemented)
app.post("/api/patient/records", async (req, res) => {
  // Upload to IPFS
  const { cid: fileCID, hash: fileHash } = await uploadToIPFS(
    req.body.fileData,
    fileName,
    metadata
  );
  
  // Save to PostgreSQL database
  const record = await storage.createMedicalRecord({
    userId: user.id,
    fileCID,
    fileHash,
    ...req.body
  });
  
  // Return record info so frontend can record on blockchain
  res.json(record);
});
```

### Step 3: Frontend records transaction on blockchain
User signs the transaction with MetaMask, and the blockchain stores the record hash and CID permanently.

## IPFS Integration with Pinata

All files are stored on IPFS using Pinata for permanent, decentralized storage:

### Environment Variables Required
```bash
PINATA_API_KEY=your_api_key
PINATA_API_SECRET=your_api_secret
PINATA_JWT=your_jwt_token
```

### File Upload Flow
1. User uploads file in browser
2. File sent to backend as base64
3. Backend uploads to Pinata IPFS
4. Pinata returns CID (Content Identifier)
5. CID stored in database and can be recorded on blockchain
6. File permanently accessible at: `https://gateway.pinata.cloud/ipfs/{CID}`

## Hybrid Architecture Benefits

✅ **Security**: Private keys never leave user's wallet  
✅ **Decentralization**: All important data on IPFS and blockchain  
✅ **Performance**: Database for fast queries, blockchain for verification  
✅ **Transparency**: All transactions visible on blockchain  
✅ **Auditability**: Immutable record of all actions  

## Database + Blockchain Synchronization

The application uses a **hybrid model**:

- **PostgreSQL**: Fast queries, user sessions, complex relationships
- **Blockchain**: Immutable verification, access control, payment records
- **IPFS**: Permanent file storage with content addressing

When a user performs an action:
1. Frontend validates and signs transaction with MetaMask
2. Transaction sent to blockchain
3. Backend API called to update database
4. Audit log created
5. Frontend confirms success

## Future Enhancements

To make blockchain integration fully production-ready:

1. **Event Listeners**: Add blockchain event listeners on backend to automatically sync when transactions happen
2. **Transaction Verification**: Verify transaction success before updating database
3. **Gas Fee Estimation**: Show users estimated gas fees before transactions
4. **Error Handling**: Better error messages for failed transactions
5. **Multi-Signature**: Add multi-sig for high-value insurance claims
6. **Layer 2**: Consider L2 solutions for lower transaction costs

## Testing Blockchain Integration

1. **Connect MetaMask** to BlockDAG network
2. **Get test BDAG** from faucet
3. **Test each flow**:
   - Register user
   - Submit KYC
   - Upload medical record
   - Grant access
   - Submit insurance claim
4. **Verify on blockchain explorer**

## Important Security Notes

⚠️ **Never store private keys on the server**  
⚠️ **Always validate on-chain data before trusting**  
⚠️ **Use HTTPS for all API calls**  
⚠️ **Verify transaction receipts**  
⚠️ **Keep ABIs up to date with deployed contracts**  

## Support

For blockchain integration issues:
- Check MetaMask connection
- Verify sufficient BDAG balance for gas
- Check BlockDAG network status
- Review browser console for detailed errors
- Check contract addresses match deployment
