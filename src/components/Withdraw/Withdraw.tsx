import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { Box, Flex } from 'uikit/Box'
import { Label, Input } from '@rebass/forms'

const Withdraw = () => {
  const { connect, connectors, pendingConnector } = useConnect();
  const { isDisconnected } = useAccount();
  const [amount, setAmount] = useState('')

  return (
    <Box>
      <Label htmlFor='amount'>Enter amount</Label>
      <Input
        id='amount'
        name='amount'
        type='text'
        placeholder='0'
        onChange={(event) => setAmount(event.target.value)}
      />
    </Box>
  );
};

export default Withdraw