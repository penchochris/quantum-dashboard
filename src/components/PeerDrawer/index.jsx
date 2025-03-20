import { Box, Drawer, Typography } from "@mui/material";
import React from "react";

import Logo from "../../assets/logo.svg";

import PeerTable from "./PeerTable";
import PeerEvents from "./PeerEvents";

const PeerDrawer = ({ open, onClose = () => {}, peer, groupId, peerId }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {peer && (
        <Box
          px={4}
          py={2}
          minWidth="30%"
          display="flex"
          flexDirection="column"
          gap={4}
        >
          <Box display="flex" justifyContent="space-between" p={2} gap={2}>
            <Typography variant="h5">{peer.name}</Typography>
            <img style={{ width: 30 }} src={Logo} alt="Logo" />
          </Box>

          <PeerTable peer={peer} />

          <PeerEvents groupId={groupId} peerId={peerId} />
        </Box>
      )}
    </Drawer>
  );
};

export default PeerDrawer;
