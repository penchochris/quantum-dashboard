import React from "react";

import { Box, Paper, Typography } from "@mui/material";

import { ArrowBack, ArrowForward } from "@mui/icons-material";
import CoffeeBean from "../../assets/coffee-bean.svg";
import LogoWhite from "../../assets/logo-white.svg";
import Handshake from "../../assets/handshake.svg";
import { useGetGroupPeersQuery } from "../../domain/features/groupApiSlice";

const PeerEvents = ({ groupId, peerId }) => {
  const { data: events = [], isLoading: isLoadingEvents } =
    useGetGroupPeersQuery(
      { id: groupId, peer: peerId },
      {
        skip: !groupId || !peerId,
      }
    );
  return (
    <Box p={2} component={Paper} elevation={2}>
      <Box
        maxHeight="50vh"
        overflow="auto"
        display="flex"
        flexDirection="column"
        gap={2}
      >
        {isLoadingEvents && <div>Loading...</div>}
        {!isLoadingEvents &&
          peerId &&
          events.map(
            (
              {
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
              },
              idx
            ) => (
              <Box key={`seed-${idx}`}>
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
                      <Typography variant="caption" color="textDisabled">
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
                        <Typography sx={{ color: "white" }} variant="h6">
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
              </Box>
            )
          )}
      </Box>
    </Box>
  );
};

export default PeerEvents;
