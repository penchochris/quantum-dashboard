import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Circle } from "@mui/icons-material";

const PeerTable = ({ peer }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
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
          <TableRow
            key={`drawer-${peer.name}-${peer.id}`}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell align="center">{peer.currentKeyId}</TableCell>
            <TableCell align="center">{peer.sessionKeysCount}</TableCell>
            <TableCell align="center">{`${peer.SeedHistory[0].days} días - ${peer.SeedHistory[0].msgs} msgs`}</TableCell>
            <TableCell align="center">
              <Circle
                color={peer.LLBStatus === "Active" ? "success" : "disabled"}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PeerTable;
