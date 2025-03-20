import { Circle } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const PeersTable = ({ peers = [], onClickPeer, selected }) => {
  return (
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
          {peers.map(
            (
              {
                name,
                id,
                LLBStatus,
                currentKeyId,
                SessionKeysCount,
                SeedHistory,
              },
              idx
            ) => (
              <TableRow
                onClick={() => onClickPeer(id)}
                selected={selected === id}
                key={`peers-table-row-${idx}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{name}</TableCell>
                <TableCell align="center">{currentKeyId}</TableCell>
                <TableCell align="center">{SessionKeysCount}</TableCell>
                <TableCell align="center">{`${SeedHistory[0].days} días - ${SeedHistory[0].msgs} msgs`}</TableCell>
                <TableCell align="center">
                  <Circle
                    color={LLBStatus === "Active" ? "success" : "disabled"}
                  />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PeersTable;
