import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  useGetGroupPeersQuery,
  useGetGroupsQuery,
} from "../domain/features/groupApiSlice";

import Menu from "../components/Menu";
import GroupsMenu from "../components/GroupsMenu";
import PeersTable from "../components/PeersTable";
import PeerDrawer from "../components/PeerDrawer";

const Home = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedPeer, setSelectedPeer] = useState(null);

  const { data: groups = [], isLoading: isLoadingGroups } = useGetGroupsQuery();

  const { data: peers = { peers: [] }, isLoading: isLoadingPeers } =
    useGetGroupPeersQuery(
      { id: selectedGroup },
      {
        skip: !selectedGroup,
        pollingInterval: 2000,
      }
    );

  if (isLoadingGroups) {
    return <div>Loading...</div>;
  }

  const selectedPeerData = selectedPeer ? peers.peers[selectedPeer] : null;

  return (
    <>
      <Menu />
      <Box display="flex" p={2} gap={2}>
        <GroupsMenu
          groups={groups}
          selectedGroup={selectedGroup}
          onClickGroup={(id) => {
            setSelectedGroup(id);
            setSelectedPeer(null);
          }}
        />

        {isLoadingPeers && <div>Loading...</div>}
        {!isLoadingPeers && selectedGroup && (
          <PeersTable
            peers={peers.peers}
            selected={selectedPeer}
            onClickPeer={setSelectedPeer}
          />
        )}
        <PeerDrawer
          open={selectedPeer}
          onClose={() => setSelectedPeer(null)}
          peer={selectedPeerData}
          groupId={selectedGroup}
          peerId={selectedPeer}
        />
      </Box>
    </>
  );
};
export default Home;
