import React, { useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  ListItemButton,
  Paper,
} from "@mui/material";
import { ArrowBack, ArrowForward, Circle } from "@mui/icons-material";
import {
  useGetGroupPeersQuery,
  useGetGroupsQuery,
} from "../domain/features/groupApiSlice";

import Logo from "../assets/logo.svg";
import CoffeeBean from "../assets/coffee-bean.svg";
import LogoWhite from "../assets/logo-white.svg";
import Handshake from "../assets/handshake.svg";

const eventsMock = [
  { type: "ExchangeSeed", date: "2025-01-01T12:00:00", seedId: "1" },
  {
    type: "RenewQSCKeyRequest",
    date: "2025-01-02T12:00:00",
    seedId: "2",
    seedTime: "2025-01-02T12:00:00",
  },
  {
    type: "NewQSCKeyResponse",
    date: "2025-01-03T12:00:00",
    qscKeyId: "key1",
    seedsNumber: 10,
    timeWindow: "1h",
  },
  {
    type: "NewSessionKeyRequest",
    date: "2025-01-04T12:00:00",
    toPeer: "Peer2",
  },
  {
    type: "NewSessionKeyResponse",
    date: "2025-01-05T12:00:00",
    sessionKeyId: "session1",
    sharedKeyId: "shared1",
    expiration: "2025-01-06T12:00:00",
  },
];

const peersMock = {
  name: "Group1",
  id: 1,
  peers: [
    {
      id: 1,
      name: "Peer1",
      LLBStatus: "Active",
      currentKeyId: "key1",
      ExpirationTime: "2025-12-31T00:00:00",
      SeedHistory: [
        { days: 30, msgs: 1000 },
        { days: 60, msgs: 2000 },
      ],
      sessionKeysCount: 5,
    },
    {
      id: 2,
      name: "Peer2",
      LLBStatus: "Inactive",
      currentKeyId: "key2",
      ExpirationTime: "2025-11-30T00:00:00",
      SeedHistory: [
        { days: 90, msgs: 3000 },
        { days: 120, msgs: 4000 },
      ],
      sessionKeysCount: 3,
    },
    {
      id: 3,
      name: "Peer3",
      LLBStatus: "Active",
      currentKeyId: "key3",
      ExpirationTime: "2025-12-31T00:00:00",
      SeedHistory: [
        { days: 150, msgs: 5000 },
        { days: 180, msgs: 6000 },
      ],
      sessionKeysCount: 7,
    },
    {
      id: 4,
      name: "Peer4",
      LLBStatus: "Inactive",
      currentKeyId: "key4",
      ExpirationTime: "2025-11-30T00:00:00",
      SeedHistory: [
        { days: 210, msgs: 7000 },
        { days: 240, msgs: 8000 },
      ],
      sessionKeysCount: 2,
    },
    {
      id: 5,
      name: "Peer5",
      LLBStatus: "Active",
      currentKeyId: "key5",
      ExpirationTime: "2025-12-31T00:00:00",
      SeedHistory: [
        { days: 270, msgs: 9000 },
        { days: 300, msgs: 10000 },
      ],
      sessionKeysCount: 8,
    },
  ],
};

const groupMock = [
  { name: "BBVA España", id: 1 },
  { name: "BBVA Bogotá", id: 2 },
];

const Home = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const { data: groups = groupMock, isLoading: isLoadingGroups } =
    useGetGroupsQuery();

  const { data: peers = peersMock, isLoading: isLoadingPeers } =
    useGetGroupPeersQuery(
      { id: selectedGroup },
      {
        skip: !selectedGroup,
        pollingInterval: 2000,
      }
    );

  const { data: events = eventsMock, isLoading: isLoadingEvents } =
    useGetGroupPeersQuery(
      { id: selectedGroup, peer: selectedPeer },
      {
        skip: !selectedGroup || !selectedPeer,
      }
    );

  if (isLoadingGroups) {
    return <div>Loading...</div>;
  }

  const selectedPeerData = selectedPeer ? peers.peers[selectedPeer] : null;

  console.log(selectedPeerData);

  return (
    <>
      <AppBar position="static" color="primary">
        <Box display="flex" alignItems="center" p={2} gap={2}>
          <img src={Logo} alt="Logo" />
          <Box display="flex" flexDirection="column">
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              DAQS Key Manager
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Deferred Assembly Quantum-Safe Key Exchange
            </Typography>
          </Box>
        </Box>
      </AppBar>
      <Box display="flex" justifyContent="center" p={2} gap={2}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          p={2}
          gap={2}
          minWidth="20%"
        >
          <List>
            {groups.map(({ id, name }) => (
              <ListItemButton
                key={id}
                onClick={() => {
                  setSelectedGroup(id);
                  setSelectedPeer(null);
                }}
                selected={selectedGroup === id}
                style={{
                  cursor: "pointer",
                }}
              >
                <ListItemIcon>
                  <Circle color="success" />
                </ListItemIcon>
                <ListItemText primary={name} secondary="hola" />
              </ListItemButton>
            ))}
          </List>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ backgroundColor: "#EEEEEE" }}>
                  Peer
                </TableCell>
                <TableCell align="center" sx={{ backgroundColor: "#EEEEEE" }}>
                  Current Key ID
                </TableCell>
                <TableCell align="center" sx={{ backgroundColor: "#EEEEEE" }}>
                  # Session Keys
                </TableCell>
                <TableCell align="center" sx={{ backgroundColor: "#EEEEEE" }}>
                  Seed History
                </TableCell>
                <TableCell align="center" sx={{ backgroundColor: "#EEEEEE" }}>
                  LLB Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoadingPeers && <div>Loading...</div>}
              {!isLoadingPeers &&
                selectedGroup &&
                peers.peers.map(
                  ({
                    name,
                    id,
                    LLBStatus,
                    currentKeyId,
                    SessionKeysCount,
                    SeedHistory,
                  }) => (
                    <TableRow
                      onClick={() => setSelectedPeer(id)}
                      selected={selectedPeer === id}
                      key={`${name}-${id}`}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{name}</TableCell>
                      <TableCell align="center">{currentKeyId}</TableCell>
                      <TableCell align="center">{SessionKeysCount}</TableCell>
                      <TableCell align="center">{`${SeedHistory[0].days} días - ${SeedHistory[0].msgs} msgs`}</TableCell>
                      <TableCell align="center">
                        <Circle
                          color={
                            LLBStatus === "Active" ? "success" : "disabled"
                          }
                        />
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <Drawer
          anchor="right"
          open={selectedPeer}
          onClose={() => setSelectedPeer(null)}
        >
          {selectedPeerData && (
            <Box
              px={4}
              py={2}
              minWidth="30%"
              display="flex"
              flexDirection="column"
              gap={4}
            >
              <Box display="flex" justifyContent="space-between" p={2} gap={2}>
                <Typography variant="h5">{selectedPeerData.name}</Typography>
                <img style={{ width: 30 }} src={Logo} alt="Logo" />
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#EEEEEE" }}
                      >
                        Current Key ID
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#EEEEEE" }}
                      >
                        # Session Keys
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#EEEEEE" }}
                      >
                        Seed History
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#EEEEEE" }}
                      >
                        LLB Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      key={`drawer-${selectedPeerData.name}-${selectedPeerData.id}`}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        {selectedPeerData.currentKeyId}
                      </TableCell>
                      <TableCell align="center">
                        {selectedPeerData.sessionKeysCount}
                      </TableCell>
                      <TableCell align="center">{`${selectedPeerData.SeedHistory[0].days} días - ${selectedPeerData.SeedHistory[0].msgs} msgs`}</TableCell>
                      <TableCell align="center">
                        <Circle
                          color={
                            selectedPeerData.LLBStatus === "Active"
                              ? "success"
                              : "disabled"
                          }
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Box
                display="flex"
                flexDirection="column"
                p={2}
                gap={2}
                component={Paper}
                elevation={2}
              >
                {isLoadingEvents && <div>Loading...</div>}
                {!isLoadingEvents &&
                  selectedPeer &&
                  events.map(
                    ({
                      type,
                      date,
                      seedId,
                      qscKeyId,
                      seedsNumber,
                      timeWindow,
                      sessionKeyId,
                      toPeer,
                      sharedKeyId,
                      expiration,
                    }) => (
                      <>
                        {type === "ExchangeSeed" && (
                          <Box
                            sx={{ backgroundColor: "#E9E9E9" }}
                            component={Paper}
                            display="flex"
                            alignItems="center"
                            p={2}
                            gap={2}
                          >
                            <ArrowForward />
                            <img src={CoffeeBean} alt="Logo" />
                            <Box>
                              <Typography variant="h6">{`Exchange seed ID: ${seedId}`}</Typography>
                              <Typography
                                variant="caption"
                                color="textDisabled"
                              >
                                {date}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                        {(type === "RenewQSCKeyRequest" ||
                          type === "NewQSCKeyResponse") && (
                          <Box
                            sx={{ backgroundColor: "#008EDD" }}
                            component={Paper}
                            display="flex"
                            alignItems="center"
                            p={2}
                            gap={2}
                          >
                            {type === "RenewQSCKeyRequest" ? (
                              <ArrowForward sx={{ color: "white" }} />
                            ) : (
                              <ArrowBack sx={{ color: "white" }} />
                            )}
                            <img src={LogoWhite} alt="Logo" />
                            <Box>
                              <Typography sx={{ color: "white" }} variant="h6">
                                {type === "RenewQSCKeyRequest"
                                  ? "Renew shared quantum-safe key!"
                                  : `New key ID: ${qscKeyId}`}
                              </Typography>
                              <Typography sx={{ color: "white" }} variant="h6">
                                {type === "RenewQSCKeyRequest"
                                  ? `Use seed: ${seedId}`
                                  : `Strength: ${seedsNumber} seeds in ${timeWindow}`}
                              </Typography>
                              <Typography
                                sx={{ color: "#E6F5FD" }}
                                variant="caption"
                                color="textDisabled"
                              >
                                {date}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                        {(type === "NewSessionKeyRequest" ||
                          type === "NewSessionKeyResponse") && (
                          <Box
                            sx={{ backgroundColor: "#D97D0D" }}
                            component={Paper}
                            display="flex"
                            alignItems="center"
                            p={2}
                            gap={2}
                          >
                            {type === "NewSessionKeyRequest" ? (
                              <ArrowForward sx={{ color: "white" }} />
                            ) : (
                              <ArrowBack sx={{ color: "white" }} />
                            )}
                            <img src={Handshake} alt="Logo" />
                            <Box>
                              <Typography sx={{ color: "white" }} variant="h6">
                                {type === "NewSessionKeyRequest"
                                  ? `Generate new session key!`
                                  : `New session key ID: ${sessionKeyId}`}
                              </Typography>
                              <Typography sx={{ color: "white" }} variant="h6">
                                {type === "NewSessionKeyRequest"
                                  ? `for connection with ${toPeer}`
                                  : `Encrypt with shared key ID: ${sharedKeyId}`}
                              </Typography>
                              {type === "NewSessionKeyResponse" && (
                                <Typography
                                  sx={{ color: "white" }}
                                  variant="h6"
                                >
                                  {`Expires: ${expiration}`}
                                </Typography>
                              )}
                              <Typography
                                variant="caption"
                                sx={{ color: "#E6F5FD" }}
                                color="textDisabled"
                              >
                                {date}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </>
                    )
                  )}
              </Box>
            </Box>
          )}
        </Drawer>
      </Box>
    </>
  );
};
export default Home;
