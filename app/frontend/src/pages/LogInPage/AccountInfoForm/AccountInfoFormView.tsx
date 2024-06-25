import { UserAccountInfo } from "@/app/shared/src/types/users.types";
import {
  Card,
  CardContent,
  Container,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import { Control, Controller, UseFormHandleSubmit } from "react-hook-form";
import CustomButton from "../../../components/CustomButton";
import Image from "next/image";
import { UserAction } from "@/app/shared/src/types/actions.type";
import { GoogleLogin } from "@react-oauth/google";

interface AccountInfoFormViewProps {
  control: Control<UserAccountInfo, any>;
  action: UserAction;
  setAction: (action: UserAction) => void;
  onLogIn: (accountInfo: UserAccountInfo) => void;
  onSignUp: (accountInfo: UserAccountInfo) => void;
  handleSubmit: UseFormHandleSubmit<UserAccountInfo>;
}

const AccountInfoFormView: React.FC<AccountInfoFormViewProps> = ({
  control,
  action,
  setAction,
  onLogIn,
  onSignUp,
  handleSubmit,
}) => {
  return (
    <form
      id={"account-info-form"}
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit(action === "log-in" ? onLogIn : onSignUp)(e);
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Card
          sx={{
            borderRadius: "25px",
            textAlign: "center",
            padding: "20px",
            width: "400px",
          }}
        >
          <CardContent>
            <Image
              src="/LudisLogoWithTitle.png"
              alt="image"
              width={300}
              height={250}
            />
            <GoogleLogin
              onSuccess={(res) => console.log(res)}
              onError={() => console.log("nice")}
            />
          </CardContent>
        </Card>
      </Container>
    </form>
  );
};

export default AccountInfoFormView;
