import { Circle } from "@mui/icons-material";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

const GroupsMenu = ({
  groups = [],
  onClickGroup,
  selectedGroup,
}) => {

  return (
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
            onClick={() => onClickGroup(id)}
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
  );
};

export default GroupsMenu;
