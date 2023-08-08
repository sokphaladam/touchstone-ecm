import {
  Banner,
  Button,
  Form,
  FormLayout,
  Icon,
  Image,
  Layout,
  LegacyCard,
  Page,
} from "@shopify/polaris";
import React, { useState, useCallback, useContext } from "react";
import { PasskeyMinor, CustomersMinor } from "@shopify/polaris-icons";
import { gql, useMutation } from "@apollo/client";
import { config_app } from "@/lib/config";
import TextField from "@/components/polaris/TextField";
import { TokenContext } from "@/context/TokenContext";

const LOGIN_MERCHANT = gql`
  mutation loginSupplier($username: String!, $password: String!) {
    loginSupplier(username: $username, password: $password) {
      success
      token
      message
      status
      useDeliveryService
    }
  }
`;

export function LoginScreen() {
  const { setToken } = useContext(TokenContext);
  const [userInput, setUserInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginSupplier, { loading, error }] = useMutation(LOGIN_MERCHANT);

  const handleChangeUserInput = useCallback((value: any) => {
    setUserInput(value);
  }, []);

  const handleChangePasswordInput = useCallback((value: any) => {
    setPasswordInput(value);
  }, []);

  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      loginSupplier({
        variables: {
          username: String(userInput),
          password: String(passwordInput),
        },
      }).then((result) => {
        if (result.data.loginSupplier.success) {
          localStorage.setItem("token", "mx" + result.data.loginSupplier.token);
          setToken("mx" + result.data.loginSupplier.token);
        }
      });
    },
    [loginSupplier, passwordInput, setToken, userInput]
  );

  return (
    <Page>
      <div className="h-full w-full overflow-hidden">
        <div className="w-96 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
          <Form onSubmit={handleSubmit} preventDefault={true}>
            <FormLayout>
              <LegacyCard>
                <LegacyCard.Section>
                  <div className="flex items-center justify-center">
                    <Image
                      source={config_app.public.assets.logo}
                      alt=""
                      className="object-contain w-[132px] h-auto"
                    />
                  </div>
                </LegacyCard.Section>
                {error && (
                  <LegacyCard.Section>
                    <Banner status="critical">{error.message}</Banner>
                  </LegacyCard.Section>
                )}
                <LegacyCard.Section>
                  <TextField
                    required
                    autoComplete="off"
                    label="Username"
                    placeholder="Enter username..."
                    value={userInput}
                    onChange={handleChangeUserInput}
                    requiredIndicator
                    prefix={<Icon source={CustomersMinor as any} />}
                  />
                  <br />
                  <TextField
                    required
                    autoComplete="off"
                    label="Password"
                    placeholder="Enter password..."
                    type="password"
                    value={passwordInput}
                    requiredIndicator
                    onChange={handleChangePasswordInput}
                    prefix={<Icon source={PasskeyMinor as any} />}
                  />
                </LegacyCard.Section>
                <LegacyCard.Section>
                  <Button
                    primarySuccess
                    submit
                    loading={loading}
                    disabled={loading}
                  >
                    Login
                  </Button>
                </LegacyCard.Section>
              </LegacyCard>
            </FormLayout>
          </Form>
        </div>
      </div>
    </Page>
  );
}
