import { useState } from "react";
import { signIn } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Container } from "components/ui/Container";
import { Form } from "components/ui/Form";
import { Button } from "components/ui/Button";
import { TextLayout } from "components/ui/TextLayout";
import { LOGO_LINKEDIN_1 as rawDevLogo } from "helpers/exportImages";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const fields = [
    {
      field: "Email address",
      setField: setEmail,
    },
    {
      field: "Password",
      setField: setPassword,
    },
  ];

  return (
    <Container
      className={{
        position: "absolute top-0 left-0",
        flex: "flex justify-center",
        dimension: "h-full w-full",
      }}
    >
      <Container
        className={{
          flex: "flex flex-col justify-center lg:flex-none",
          dimension: "px-4 py-12 sm:px-6 lg:px-20 xl:px-24",
        }}
      >
        <Container
          className={{
            position: "mx-auto",
            dimension: "w-full max-w-sm lg:w-96",
          }}
        >
          <Container.Flex
            className={{ flex: "gap-x-7 items-center justify-center" }}
          >
            <Container.Link href={"/"}>
              <Container.Logo
                src={rawDevLogo}
                alt="my-logo"
                className="h-14 w-auto rounded-full"
              />
            </Container.Link>
            <TextLayout.Title
              as="h4"
              className={{
                typography: "tracking-tight text-zinc-800 dark:text-zinc-100",
              }}
              title="Sign in to your account"
            />
          </Container.Flex>
          <Container className="mt-5">
            <Container>
              <Form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  signIn("credentials", {
                    email: email,
                    password: password,
                    rememberMe: rememberMe,
                    redirect: true,
                    callbackUrl: "/admin/dashboard",
                  });
                }}
              >
                {fields.map(({ field, setField }) => (
                  <Form.Field
                    variant="secondary"
                    required
                    key={field}
                    field={field}
                    onChange={(e) => {
                      setField(e.target.value);
                    }}
                  />
                ))}

                <Container.Flex
                  className={{
                    flex: "items-center justify-between gap-x-5",
                  }}
                >
                  <Form.Checkbox
                    field="rememberMe"
                    text="Remember me for 30 days"
                    onClick={() => setRememberMe(!rememberMe)}
                  />
                  <Container className="text-sm leading-6">
                    <Container.Link
                      href="mailto:info@rawdev.io"
                      className={{
                        typography:
                          "dark:font-semibold cursor-pointer text-zinc-500 hover:text-zinc-400 dark:text-orange-tertiary dark:hover:text-orange-quaternary",
                      }}
                      text="Contact for access"
                    />
                  </Container>
                </Container.Flex>
                <Button variant="login" text="Sign in" />
              </Form>
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Admin;

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["navLinks"])),
    },
  };
};
