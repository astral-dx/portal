import { AddLink } from "@mui/icons-material";

import { Button } from "../Button/Button";
import { Header } from "../Header/Header";

interface TeamHeaderProps {
  name: string;
  id: string;
  onGenerateInviteLink: () => void;
}

export const TeamHeader: React.FC<TeamHeaderProps> = ({ name, id, onGenerateInviteLink }) => {
  return (
    <Header
      title={ name }
      subtitle={ id }
      Action={ () => (
        <Button onClick={ onGenerateInviteLink } color="secondary" endIcon={ <AddLink /> }>
          Get Invite Link
        </Button>
      ) }
    />
  );
}