import { MoreHoriz } from "@mui/icons-material";
import { styled, Menu, MenuItem, IconButton } from "@mui/material";
import { useState } from "react";

const ActionMenuItem = styled(MenuItem)(({ theme }) => `
  font-size: 0.8rem;
`);

export const MemberActionsMenu: React.FC<{
  onRemoveTeamMember: () => void,
}> = ({ onRemoveTeamMember }) => {
  const [ anchorEl, setAnchorEl ] = useState<Element | null>(null);

  const onClose = () => setAnchorEl(null);
  
  const removeTeamMember = () => {
    onRemoveTeamMember();
    onClose();
  };

  return (
    <div>
      <IconButton
        size="small"
        onClick={ (e) => setAnchorEl(e.currentTarget) }
      >
        <MoreHoriz fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={ anchorEl }
        open={ Boolean(anchorEl) }
        onClose={ onClose }
      >
        <ActionMenuItem onClick={ removeTeamMember }>Remove Team Member</ActionMenuItem>
      </Menu>
    </div>
  )
}