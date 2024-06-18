import { useState } from "react";
import { UserAccountInfo } from "@/app/shared/src/types/users.types";
import {
  Card,
  CardContent,
  Container,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Control, Controller, UseFormHandleSubmit } from "react-hook-form";
import CustomButton from "../../../components/CustomButton";
import Image from "next/image";
import { UserAction } from "@/app/shared/src/types/actions.type";

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
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handlePasswordChange = (value: string) => {
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      setIsPasswordValid(false);
    } else {
      setPasswordError("");
      setIsPasswordValid(true);
    }
  };

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
            <Stack spacing={3}>
              <Stack spacing={2}>
                <FormControl>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        id="outlined-username"
                        label="username"
                        onChange={(e) => {
                          onChange(e.target.value);
                        }}
                        value={value}
                      />
                    )}
                  />
                </FormControl>
                <FormControl>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        id="outlined-email"
                        label="email"
                        onChange={(e) => {
                          onChange(e.target.value);
                        }}
                        value={value}
                      />
                    )}
                  />
                </FormControl>
                <FormControl>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <TextField
                          id="outlined-password"
                          label="password"
                          type="password"
                          onChange={(e) => {
                            onChange(e.target.value);
                            handlePasswordChange(e.target.value);
                          }}
                          value={value}
                        />
                        {passwordError && (
                          <Typography color="error" variant="body2">
                            {passwordError}
                          </Typography>
                        )}
                      </>
                    )}
                  />
                </FormControl>
              </Stack>
              <Stack spacing={2}>
                <CustomButton
                  submitForm={true}
                  label="Log In"
                  onClick={() => setAction("log-in")}
                  disabled={!isPasswordValid}
                />
                <CustomButton
                  submitForm={true}
                  label="Sign Up"
                  onClick={() => setAction("sign-up")}
                  disabled={!isPasswordValid}
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </form>
  );
};

export default AccountInfoFormView;
