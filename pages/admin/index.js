import { useState } from "react";
import { signIn } from "next-auth/react";
import { Container } from "components/Container";
import { Form } from "components/Form";
import { Button } from "components/Button";
import { TextLayout } from "components/TextLayout";
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
    <Container className="absolute top-0 left-0 h-full w-full flex justify-center ">
      <Container className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <Container className="mx-auto w-full max-w-sm lg:w-96">
          <Container.Flex className="gap-x-7 items-center justify-center">
            <Container.Link
              href={"/"}
              Component={Container.Logo}
              componentProps={{
                src: rawDevLogo,
                alt: "my-logo",
              }}
              className={{
                component: "h-[3rem] w-auto rounded-full",
              }}
            />
            <TextLayout.Title
              as="h4"
              className="tracking-tight text-zinc-800 dark:text-zinc-100"
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
                  items="items-center"
                  justify="justify-between"
                  className="gap-x-5"
                >
                  <Form.Checkbox
                    field="rememberMe"
                    text="Remember me for 30 days"
                    onClick={() => setRememberMe(!rememberMe)}
                  />
                  <Container className="text-sm leading-6">
                    <Container.Link
                      href="mailto:admin@rawdev.io"
                      className={{
                        text: "dark:font-semibold cursor-pointer text-zinc-500 hover:text-zinc-400 dark:text-orange-tertiary dark:hover:text-orange-quaternary",
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
